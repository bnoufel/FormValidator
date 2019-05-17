import {
    IFormValidatorKey,
    ILengthFormValidator,
    IRegexFormValidator,
    IResultFormValidator,
} from './interfaces/FormValidatorInterface';
import { ErrorFormValidator } from './error/ErrorFormValidator';
import { GetMessageError } from './error/GetMessageError';

/**
 * @class Utils
 * Ignore no-unused because is abstract class
 */
// tslint:disable:no-unused
export abstract class Utils {
    protected form: IFormValidatorKey;
    protected readonly lang: string;

    /**
     * Check password input
     * @constructor
     * @param {string | undefined} lang
     * @param {IFormValidator} form
     */
    protected constructor(form: IFormValidatorKey, lang: string | undefined) {
        this.form = form;
        this.lang = (lang !== undefined) ? lang : 'en';
    }

    /**
     *
     * @param {string | undefined} message
     * message is an error into json config file
     * @param {string} key
     * Key is a key to put an error config into lang file
     * @return {Promise<ErrorFormValidator>}
     */
    protected printError(message: string | undefined, key: string): Promise<ErrorFormValidator> {
        const error: string = (message !== undefined) ? message : GetMessageError(this.lang, key);
        return Promise.reject(new ErrorFormValidator(error));
    }

    /**
     * Check if regex on type Regexp match
     * @param {string} error
     * @return {Promise<ErrorFormValidator | null>}
     */
    protected checkRegexIfRegEx(error: string): Promise<ErrorFormValidator | null> {
        const res = (this.form.regex! as RegExp).exec((this.form.value as string));
        if (res === null) {
            return this.printError(undefined, error);
        }
        return Promise.resolve(null);
    }

    /**
     * Return a response with status and password
     * @param {string | null} value
     * @param {string} hash
     * @return {Promise<IResultFormValidator>}
     */
    protected static returnHashPassword(value: string | null, hash: string): Promise<IResultFormValidator> {
        return Promise.resolve({
            status: 200,
            password: {
                value,
                hash,
            },
        });
    }

    /**
     * Check if value is required
     * @param error
     * @return {Promise<ErrorFormValidator | null>}
     */
    protected checkRequired(error: string): Promise<ErrorFormValidator | null> {
        if (this.form.required) {
            if (!this.form.value) {
                return this.printError(this.form.error, error);
            }
        }
        return Promise.resolve(null);
    }

    /**
     * Check if value matches with length regex
     * @return boolean
     */
    protected checkRegexLength(): boolean {
        const regex: IRegexFormValidator = (this.form.regex as IRegexFormValidator);
        if (!this.form.value) {
            return false;
        }
        if (regex.length !== undefined) {
            return (this.form.value.length >= regex.length.min
                && this.form.value.length <= regex.length.max);
        }
        return true;
    }

    /**
     * Check if value matches with length
     * @return boolean
     */
    protected checkLength(): boolean | null {
        if (!this.form.value) {
            return false;
        }
        if (this.form.length === undefined) {
            return null;
        }
        return (this.form.value.length >= this.form.length.min
            && this.form.value.length <= this.form.length.max);
    }

    /**
     * if this.form.regex is undefined
     * Use a regex by default
     * 1 Upper / 1 Lower / 1 Number / 1 special char and between 12 and 128 char
     * else if this.form.regex is a instance of RegExp and check if match
     *  @return {Promise<ErrorFormValidator | null>}
     */

    protected checkRegex(type: string | null, error: string): Promise<ErrorFormValidator | null> {
        if (this.form.regex !== undefined) {
            if (this.form.regex instanceof RegExp) {
                return this.checkRegexIfRegEx(error);
            }
            return this.printError(
                this.form.regex.error,
                (type === 'email') ? 'email.regex.format.wrong' : 'regex.format.wrong');
        }
        if (type === 'email') {
            const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,96})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            const res = regex.exec((this.form.value as string));
            if (res === null) {
                return this.printError(undefined, error);
            }
        }
        return Promise.resolve(null);
    }

    /**
     * Check if value matches with length and return a Promise
     * null if length is undefined because they're no restriction
     * printError if not
     * @param {ILengthFormValidator | undefined} length
     * @return {Promise<ErrorFormValidator | null>}
     */
    protected getLengthError(
        length: ILengthFormValidator | undefined): Promise<ErrorFormValidator | null> {
        let message: string;
        if (length === undefined) {
            return Promise.resolve(null);
        }
        if (length.error === undefined) {
            message = (this.lang === 'fr') ?
                `Le champ doit être entre ${length.min} et ${length.max} caractères.` :
                `The field must be between ${length.min} and ${length.max} characters.`;
        } else {
            message = length.error;
        }
        return this.printError(
            message,
            'password.regex.len.wrong');
    }
}
