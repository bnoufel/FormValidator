import {
    IErrorFormValidator,
    IFormValidatorKey, IResFormValidator,
} from '../interfaces/FormValidatorInterface';
import { ErrorFormValidator } from '../error/ErrorFormValidator';
import { Utils } from '../Utils';

/**
 * @class CheckFormDefault
 */
export class CheckFormDefault extends Utils {

    private readonly name: string;
    /**
     * @constructor
     * @param {IFormValidatorKey} form
     * @param {string} name
     * @param {string | undefined} lang
     */
    constructor(form: IFormValidatorKey, lang: string | undefined, name: string) {
        super(form, lang);
        this.name = name;
    }

    /***
	 * Check if value is required with a personnal error
	 * @param error
	 * @return Promise
	 */
    protected checkRequired(error: string): Promise<ErrorFormValidator | null> {
        if (this.form.required) {
            if (!this.form.value) {
                let message: string;
                if (this.lang === 'en') {
                    message = `The field ${this.name} is required.`;
                } else if (this.lang === 'fr') {
                    message = `Le champ ${this.name} est obligatoire.`;
                } else {
                    message = error;
                }
                if (this.form.error === undefined) {
                    return this.printError(message, '');
                }
                return this.printError(this.form.error, error);
            }
        }
        return Promise.resolve(null);
    }

    /**
     * @return {Promise<IErrorFormValidator>}
     */
    public checkForm(): Promise<IErrorFormValidator> {
        return Promise.resolve(this.checkRequired('required'))
            .then(() => {
                return Promise.all([
                    this.getLengthError(this.form.length),
                    this.checkRegex(this.form.type, 'regex.wrong'),
                ]);
            })
            .then((res: Array<ErrorFormValidator | null>) => {
                return res.filter((result: IResFormValidator | null) => result !== null);
            })
            .then((result: string[] | IErrorFormValidator[] | IErrorFormValidator | null) => {
                if (Object.keys((result as string[]).length === 0)) {
                    return null;
                }
                return (result as IErrorFormValidator);
            });
    }
}
