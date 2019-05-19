# FormValidator 

- [Install](#install)
- [Introduction](#introduction)
- [Interface](#interface)
- [Error](error)
## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

```sh
npm i --save @bnoufel/formvalidator
```

## Introduction

FormValidator is a node.js library for form validator. It is written in TypeScript.

Here is an example on how to use it:

FormValidator take two parameters.
The first take a JSON of type `IFormValidator` [Interface](#interface).

The second, a language of your choice (en, fr supported) for error handling [Erreur](Erreur).

`email, login et password` are the names of the fields ex: `<input name="login" />`

```typescript
import FormValidator, {
	IFormValidator,
	ResFormValidator,
	ErrorFormValidator
} from '@bnoufel/formvalidator';

const form: IFormValidator = {
    email: {
        required: true,
        type: 'email',
        value: 'test@gmail.com'
    },
    login: {
        required: true,
        type: 'text',
        value: 'bnoufel'
    },
    password: {
        required: true,
        type: 'password',
        value: 'myPassword123@',
        confirmPassword: 'myPassword123@',
        hash: 'bcrypt',
        regex: {
        	uppercase: true,
        	lowercase: true,
        	number: true,
        	specialCharacters: true,
        	length: {
        		min: 12,
        		max: 128
        	}
        }
    }
};

const formData = new FormValidator(form, 'en');
formData.checkAll()
    .then((res: ResFormValidator) => {
        console.log(`My password hash with bcrypt is : ${res[0].password.hash}`);
    })
    .catch((err: ErrorFormValidator) => {
        console.error(err.message);
    })
```


## Interface

```typescript
type HashFunction = (s: string) => string;

export interface IFormValidator {
    [key: string]: IFormValidatorKey;
}

export interface IFormValidatorKey {
    required: boolean;
    lang?: string;
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

/**
* true = required
* false = no required
* null = denied
*/
export interface IRegexFormValidator {
    uppercase: boolean | null;
    lowercase: boolean | null;
    number: boolean | null;
    specialCharacters: boolean | null;
    length?: ILengthFormValidator;
    error?: string;
}
```

## Error


Errors can be handled manually, or automatically with a lang file ex: `lang/en.json`

Basic error handling :
```json
{
  "password.required" : "Password is required.",
  "email.required" : "Email is required.",
  "hash.required" : "The type of hash is required.",
  "hash.unknown" : "The type of hash is unknown.",
  "unknown.error": "An unknown error.",
  "password.regex.wrong": "Password must contain at least a lowercase, an uppercase, a number and a special character.",
  "email.regex.wrong": "The format of the email is not valid.",
  "regex.wrong": "The format of the input is not valid.",
  "password.notmatch": "Password confirmation doesn't match with Password.",
  "password.regex.len.wrong": "The password length must be between 12 and 128 character.",
  "email.regex.format.wrong": "Only RegExp and object are available.",
  "regex.format.wrong": "Only RegExp is available.",
  "required": "This input is required.",
  "regex.upper.denied": "Uppercase denied.",
  "regex.lower.denied": "Lowercase denied.",
  "regex.number.denied": "Number denied.",
  "regex.special.denied": "Special character denied.",
  "length.error": "The field must be respect length regex."
}
```

You can overwrite any error.
