import {
    IErrorFormValidator,
    IFormValidatorKey, IResFormValidator,
} from '../interfaces/FormValidatorInterface';
import { ErrorFormValidator } from '../error/ErrorFormValidator';
import { Utils } from '../Utils';

/**
 *
 * @class CheckFormPassword
 */

export class CheckFormEmail extends Utils {
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
     * @return {Promise<IErrorFormValidator | IErrorFormValidator[]>}
     */
    public checkEmail(): Promise<IErrorFormValidator | IErrorFormValidator[]> {
        return Promise.resolve(this.checkRequired('email.required'))
            .then(() => {
                return Promise.all([
                    this.getLengthError(
                        this.form.length),
                    this.checkRegex('email', 'email.regex.wrong'),
                ])
                    .then((res: Array<ErrorFormValidator | null>) => {
                        return res.filter((result: IResFormValidator | null) => result !== null);
                    })
                    .then((res: Array<ErrorFormValidator | null>) => {
                        if (Object.keys(res).length === 0) {
                            return null;
                        }
                        return res;
                    });
            });
    }
}
