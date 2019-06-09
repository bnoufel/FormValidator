import path, { dirname } from 'path';
import fs from 'fs';

/**
 * Get a lang file into lib
 * @param {string} lang
 * @param {string} message
 * @return {string}
 * @constructor
 */
const GetMessageErrorLib = (lang: string, message: string): string => {
    try {
        const data = fs.statSync(`${dirname(__dirname)}/../../lang/${lang}.json`);
        if (!data.isFile()) {
            return 'The lang file does not exist or incorrect';
        }
    } catch (e) {
        return 'The lang file does not exist or incorrect';
    }
    const data = fs.readFileSync(`${dirname(__dirname)}/../../lang/${lang}.json`);
    const error = JSON.parse(data.toString());
    if (error[message] === undefined) {
        return error['unknown.error'];
    }
    return error[message];
};

/**
 * Get a lang file into user project
 * @param {string} lang
 * @param {string} message
 * @return {string}
 * @constructor
 */
export const GetMessageError = (lang: string, message: string): string => {
    try {
        const data = fs.statSync(path.resolve(`lang/${lang}.json`));
        if (!data.isFile()) {
            return 'The lang file does not exist or incorrect';
        }
    } catch (err) {
        return GetMessageErrorLib(lang, message);
    }
    const data = fs.readFileSync(path.resolve(`lang/${lang}.json`));
    const error = JSON.parse(data.toString());
    if (error[message] === undefined) {
        return GetMessageErrorLib(lang, message);
    }
    return error[message];
};
