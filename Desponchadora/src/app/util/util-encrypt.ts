import * as CryptoJS from 'crypto-js';

export const encrypt = (data: string): string => {
    const encryptedData = CryptoJS.AES.encrypt(data, 'asd123');
    return encryptedData.toString();
};

export const dencrypt = (data: string): string => {
    const decryptedData = CryptoJS.AES.decrypt(data, 'asd123').toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

