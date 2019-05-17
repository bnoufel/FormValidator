# FormValidator 

- [Installation](#installation)
- [Introduction](#introduction)
- [Interface](#interface)
- [Erreur](erreur)

## Installation

FormValidator est un module [Node.js](https://nodejs.org/en/) disponible sur
[npm](https://www.npmjs.com/).

```sh
npm install --save formvalidator
```

## Introduction

FormValidator est une librairie NodeJs. Elle a été écrite en TypeScript.

Voici un exemple d'utilisation en TypeScript:

FormValidator prend deux paramètres.
Le premier prend un JSON de type `IFormValidator` [Interface](#interface).

Le deuxième, une langue de votre choix (en, fr pris en charge) pour la gestion des erreurs [Erreur](Erreur).

`email, login et password` sont les noms des champs ex: `<input name="login" />`


```typescript
import FormValidator, {
	IFormValidator,
	ResFormValidator,
	ErrorFormValidator
} from 'FormValidator';

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
        console.log(`Mon mot de passe hash avec bcrypt est : ${res[0].password.hash}`);
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
    crypt?: string | HashFunction;
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
* true = obligatoire
* false = non obligatoire
* null = interdit
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

## Erreur

Les erreurs peuvent être gérées manuellement, ou automatiquement avec un fichier lang ex: `lang/fr.json`

Gestion d'erreur basique :
```json
{
  "password.required" : "Le mot de passe est requis.",
  "email.required" : "L'email est requis.",
  "hash.required" : "Le type de hash est obligatoire.",
  "hash.unknown" : "Le type de hash est inconnu.",
  "unknown.error": "Une erreur inconnue est survenue.",
  "password.regex.wrong": "Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.",
  "email.regex.wrong": "Le format de l'email n'est pas valide.",
  "regex.wrong": "Le format du champ n'est pas valide.",
  "password.notmatch": "Les mots de passe ne sont pas identiques.",
  "password.regex.len.wrong": "Le mot de passe doit être entre 2 et 128 caractères.",
  "email.regex.format.wrong": "Seulement des regex de type RegExp et object sont valides.",
  "regex.format.wrong": "Seulement des regex de type RegExp sont valides.",
  "required": "Le champ est obliatoire.",
  "regex.upper.denied": "Les majuscules sont interdites.",
  "regex.lower.denied": "Les minuscules sont interdites.",
  "regex.number.denied": "Les chiffres sont interdits.",
  "regex.special.denied": "Les caractères spéciaux sont interdits.",
  "length.error": "Le champ doit respecter le nombre de caractères."
}
```

Vous pouvez reécrire n'importe quelle erreur.


