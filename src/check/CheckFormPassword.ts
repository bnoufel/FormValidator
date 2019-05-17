import {
    IErrorFormValidator,
    IFormValidatorKey,
    IRegexFormValidator,
    IRegexUndefinedFormValidator, IResFormValidator,
    IResultFormValidator,
} from '../interfaces/FormValidatorInterface';
import { ErrorFormValidator } from '../error/ErrorFormValidator';
import { Utils } from '../Utils';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import sha1 from 'sha1';
import sha256 from 'sha256';

/**
 * @class CheckFormPassword
 */

export class CheckFormPassword extends Utils {
    /**
     * Check password input
     * @constructor
     * @param {string | undefined} lang
     * @param {IFormValidator} form
     */
    constructor(form: IFormValidatorKey, lang: string | undefined) {
        super(form, lang);
    }

    /**
     * Check if regex object are complete
     * @return boolean
     */
    private checkRegexOption(): boolean {
        const regex: IRegexUndefinedFormValidator = (this.form.regex as IRegexUndefinedFormValidator);
        return !(regex && (regex.uppercase === undefined
            || regex.lowercase === undefined
            || regex.number === undefined
            || regex.specialCharacters === undefined
            || regex.length === undefined
            || regex.length.min === undefined
            || regex.length.max === undefined));
    }

    /**
     * Count how many regex are true
     * @return number
     */
    private howManyRegex(): number {
        if (this.form.regex !== undefined) {
            let count: number = 0;
            const regex: IRegexFormValidator = (this.form.regex as IRegexFormValidator);
            if (regex.uppercase === true) {
                count += 1;
            } if (regex.lowercase === true) {
                count += 1;
            } if (regex.number === true) {
                count += 1;
            } if (regex.specialCharacters === true) {
                count += 1;
            }
            return count;
        }
        return 0;
    }

    /**
     * Check if all Regex type is a bool
     * @return {boolean}
     */
    private checkRegexIfObjectIsbool(): boolean {
        const regex: IRegexFormValidator = (this.form.regex as IRegexFormValidator);
        return (typeof regex.uppercase === 'boolean' && typeof regex.lowercase === 'boolean' &&
            typeof regex.number === 'boolean' && typeof regex.specialCharacters === 'boolean');
    }

    /**
     * Return how many regex match
     * @return number
     */
    private checkRegexIfObject(): number {
        const regex: IRegexFormValidator = (this.form.regex as IRegexFormValidator);
        let count: number = 0;
        if (regex.uppercase) {
            const regex = /[A-Z]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                count += 1;
            }
        } if (regex.lowercase) {
            const regex = /[a-z]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                count += 1;
            }
        } if (regex.number) {
            const regex = /[0-9]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                count += 1;
            }
        } if (regex.specialCharacters) {
            const regex = /[@.\/\\|\[\]\+=\*()\-_{}$%^&#<>,.?;:'"!`~]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                count += 1;
            }
        }
        return count;
    }

    /**
     * Return an error if regex option is null and match
     * @return {Promise<IErrorFormValidator>}
     */
    private checkRegexIfObjectButNull(): Promise<IErrorFormValidator> {
        const regex: IRegexFormValidator = (this.form.regex as IRegexFormValidator);
        if (regex.uppercase === null) {
            const regex = /[A-Z]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                return this.printError(undefined, 'regex.upper.denied');
            }
        } if (regex.lowercase === null) {
            const regex = /[a-z]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                return this.printError(undefined, 'regex.lower.denied');
            }
        } if (regex.number === null) {
            const regex = /[0-9]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                return this.printError(undefined, 'regex.number.denied');
            }
        } if (regex.specialCharacters === null) {
            const regex = /[@.\/\\|\[\]\+=\*()\-_{}$%^&#<>,.?;:'"!`~]/g;
            const res = regex.exec((this.form.value as string));
            if (res !== null) {
                return this.printError(undefined, 'regex.special.denied');
            }
        }
        return Promise.resolve(null);
    }

    /**
     * if this.form.regex is undefined
     * Use a regex by default
     * 1 Upper / 1 Lower / 1 Number / 1 special char and between 12 and 128 char
     * else if this.form.regex is a instance of RegExp and check if match
     *  @return {Promise<IErrorFormValidator>}
     */
    private checkRegexPassword(): Promise<IErrorFormValidator> {
        if (this.form.regex !== undefined) {
            if (this.form.regex instanceof RegExp) {
                return this.checkRegexIfRegEx('password.regex.wrong');
            }
            if (!this.checkRegexOption()) {
                return this.printError(this.form.regex.length!.error, 'password.regex.wrong');
            }
            if (this.checkLength() === null && this.checkRegexIfObjectIsbool()) {
                const nbRegex: number = this.howManyRegex();
                const count: number = this.checkRegexIfObject();
                if (!this.checkRegexLength()) {
                    return this.getLengthError(
                        this.form.regex.length);
                }
                if (count === nbRegex) {
                    return Promise.resolve(null);
                }
                return this.printError(this.form.regex.error, 'password.regex.wrong');
            }
            return this.checkRegexIfObjectButNull();
        }
        if (this.checkLength() === false && this.form.length !== undefined) {
            return this.getLengthError(
                this.form.length);
        }
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{12,128})$/gm;
        const res = regex.exec((this.form.value as string));
        if (res === null) {
            return this.printError(undefined, 'password.regex.wrong');
        }
        return Promise.resolve(null);
    }

    /**
     * Return a hash
     * @return {Promise<IResultFormValidator>}
     */
    private checkHash(): Promise<IResFormValidator> {
        if (this.form.hash === undefined) {
            return this.printError(undefined, 'hash.required');
        }
        if (typeof this.form.hash === 'string') {
            if (this.form.hash === 'md5') {
                return CheckFormPassword.returnHashPassword(
                    this.form.value,
                    md5((this.form.value as string)));
            }
            if (this.form.hash === 'sha1') {
                return CheckFormPassword.returnHashPassword(
                    this.form.value,
                    sha1((this.form.value as string)).toString());
            }
            if (this.form.hash === 'sha256') {
                return CheckFormPassword.returnHashPassword(
                    this.form.value,
                    sha256((this.form.value as string)));
            }
            if (this.form.hash === 'bcrypt') {
                const salt: number = this.form.salt || 10;
                return bcrypt.hash(this.form.value, salt)
                    .then((hash: string) => {
                        return CheckFormPassword.returnHashPassword(this.form.value, hash);
                    });
            }
        } if (typeof this.form.hash === 'function') {
            return CheckFormPassword.returnHashPassword(
                this.form.value,
                this.form.hash((this.form.value as string)));
        }
        return this.printError(undefined, 'hash.unknown');
    }

    /**
     * Check if password and confirmPassword are identical
     * @return {Promise<IErrorFormValidator | null>}
     */
    private checkIfPasswordIsSame(): Promise<IErrorFormValidator | null> {
        if (this.form.confirmPassword !== undefined) {
            if (this.form.value === this.form.confirmPassword) {
                return Promise.resolve(null);
            }
            return this.printError(undefined, 'password.notmatch');
        }
        return Promise.resolve(null);
    }

    /**
     * @return {Promise<IResFormValidator>}
     */
    public checkPassword(): Promise<IResFormValidator> {
        return Promise.resolve(this.checkRequired('password.required'))
            .then(() => {
                return Promise.all([
                    this.checkHash(),
                    this.checkRegexPassword(),
                    this.checkIfPasswordIsSame(),
                ])
                    .then((res: Array<IResFormValidator>) => {
                        return res.filter((result: ErrorFormValidator
                            | IResultFormValidator
                            | null) => result !== null);
                    })
                    .then((res: Array<IResFormValidator>) => {
                        return res[0];
                    });
            });
    }
}
