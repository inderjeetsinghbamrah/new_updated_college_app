import { recoilPersist } from "recoil-persist";
import CryptoJS from 'crypto-js';

const key = import.meta.env.VITE_TOKEN_KEY;

//Encryption
const encrypt = (data: string): string => CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
const decrypt = (encryptedData: string): string | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Recoil Persistence

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: {
        getItem: (key: string): string | null => {
            const encryptedData = localStorage.getItem(key);
            if (!encryptedData) return null;

            const decryptedData = decrypt(encryptedData);
            if (!decryptedData) return null;

            return decryptedData;
        },
        setItem: (key: string, value: string): void => {
            const encryptedData = encrypt(value);
            localStorage.setItem(key, encryptedData);
        }
    }
})

export default persistAtom;
