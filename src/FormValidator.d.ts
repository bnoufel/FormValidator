export default class FormValidator {
    protected lang: string | undefined;
    protected form: IFormValidator;
    constructor(form: IFormValidator[] | IFormValidator, lang?: string);
    private getConfig;
    checkAll(): Promise<ResFormValidator>;
}
export declare abstract class Utils {
    protected form: IFormValidatorKey;
    protected readonly lang: string;
    protected constructor(form: IFormValidatorKey, lang: string | undefined);
    protected printError(message: string | undefined, key: string): Promise<ErrorFormValidator>;
    protected checkRegexIfRegEx(error: string): Promise<ErrorFormValidator | null>;
    protected static returnHashPassword(value: string | null, hash: string): Promise<IResultFormValidator>;
    protected checkRequired(error: string): Promise<ErrorFormValidator | null>;
    protected checkRegexLength(): boolean;
    protected checkLength(): boolean | null;
    protected checkRegex(type: string | null, error: string): Promise<ErrorFormValidator | null>;
    protected getLengthError(length: ILengthFormValidator | undefined): Promise<ErrorFormValidator | null>;
}
export declare class CheckFormDefault extends Utils {
    private readonly name;
    constructor(form: IFormValidatorKey, lang: string | undefined, name: string);
    protected checkRequired(error: string): Promise<ErrorFormValidator | null>;
    checkForm(): Promise<IErrorFormValidator>;
}
export declare class CheckFormEmail extends Utils {
    constructor(form: IFormValidatorKey, lang: string | undefined);
    checkEmail(): Promise<IErrorFormValidator | IErrorFormValidator[]>;
}
export declare class CheckFormPassword extends Utils {
    constructor(form: IFormValidatorKey, lang: string | undefined);
    private checkRegexOption;
    private howManyRegex;
    private checkRegexIfObjectIsbool;
    private checkRegexIfObject;
    private checkRegexIfObjectButNull;
    private checkRegexPassword;
    private checkHash;
    private checkIfPasswordIsSame;
    checkPassword(): Promise<IResFormValidator>;
}
export declare class ErrorFormValidator extends Error {
}
export declare const GetMessageError: (lang: string, message: string) => string;
declare type HashFunction = (s: string) => string;
export declare type IResFormValidator = IResultFormValidator | ErrorFormValidator | null;
export declare type IErrorFormValidator = ErrorFormValidator | null;
export declare type ResFormValidator = (IResFormValidator | (ErrorFormValidator | null)[])[];
export interface IFormValidator {
    [key: string]: IFormValidatorKey;
}
export interface IFormValidatorKey {
    required: boolean;
    value: string | null;
    confirmPassword?: string;
    type: string;
    hash?: string | HashFunction;
    salt?: number;
    regex?: IRegexFormValidator | RegExp;
    length?: ILengthFormValidator;
    error?: string;
}
export interface ILengthFormValidator {
    min: number;
    max: number;
    error?: string;
}
export interface IRegexFormValidator {
    uppercase: boolean | null;
    lowercase: boolean | null;
    number: boolean | null;
    specialCharacters: boolean | null;
    length?: ILengthFormValidator;
    error?: string;
}
export interface ILengthUndefinedFormValidator {
    min?: number;
    max?: number;
    error?: string;
}
export interface IRegexUndefinedFormValidator {
    uppercase?: boolean | null;
    lowercase?: boolean | null;
    number?: boolean | null;
    specialCharacters?: boolean | null;
    length?: ILengthUndefinedFormValidator;
    error?: string;
}
export interface IResultFormValidator {
    status: number;
    password: IResPasswordFormValidator;
}
export interface IResPasswordFormValidator {
    hash: string;
    value: string | null;
}
export {};
