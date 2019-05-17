import { ErrorFormValidator } from '../error/ErrorFormValidator';

type HashFunction = (s: string) => string;
export type IResFormValidator = IResultFormValidator | ErrorFormValidator | null;
export type IErrorFormValidator = ErrorFormValidator | null;
export type ResFormValidator = (IResFormValidator | (ErrorFormValidator | null)[])[];

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
