import {
    IFormValidator,
    IResFormValidator, ResFormValidator,
} from './src/interfaces/FormValidatorInterface';
import { CheckFormDefault } from './src/check/CheckFormDefault';
import { CheckFormEmail } from './src/check/CheckFormEmail';
import { CheckFormPassword } from './src/check/CheckFormPassword';
import { ErrorFormValidator } from './src/error/ErrorFormValidator';

/**
 * @class FormValidator
 */
export default class FormValidator {
    protected lang: string | undefined;
    protected form: IFormValidator;

    /**
     * @constructor
     * @param {IFormValidator[] | IFormValidator} form
     * @param {string} lang
     */
    constructor(form: IFormValidator[] | IFormValidator, lang?: string) {
        this.form = (form as IFormValidator);
        this.lang = (lang === undefined) ? 'en' : lang;
    }

    /**
     * @return {Promise<IResFormValidator | (ErrorFormValidator | null)[]>[]}
     */
    private getConfig() {
        const data: Promise<IResFormValidator | (ErrorFormValidator | null)[]>[] = [];
        for (const name in this.form) {
            if (this.form[name].type === 'email') {
                const email: CheckFormEmail = new CheckFormEmail(
                    this.form[name],
                    this.lang);
                data.push(email.checkEmail());
            } else if (this.form[name].type === 'password') {
                const password: CheckFormPassword = new CheckFormPassword(
                    this.form[name],
                    this.lang);
                data.push(password.checkPassword());
            } else {
                const other: CheckFormDefault = new CheckFormDefault(
                    this.form[name],
                    this.lang,
                    name);
                data.push(other.checkForm());
            }
        }
        return data;
    }

    /**
     * @return {Promise<ResFormValidator>}
     */
    public checkAll(): Promise<ResFormValidator> {
        const data = this.getConfig();
        return Promise.all(data)
            .then((res: ResFormValidator) => {
                return res.filter((result: IResFormValidator |
                    (ErrorFormValidator | null)[]) => result !== null);
            });
    }
}
