import { encrypt, decrypt } from "../../utils/crypto";

describe('Cryptography Utility', () => {
    const string = 'a';
    const encrypted = encrypt(string);
    describe('Encryption', () => {
        it(`given ${string}, returns an encrypted string`, () => {
            expect(encrypted).toContain('U2FsdGVkX');
            expect(encrypted).toEqual(expect.any(String));
            expect(encrypted.length).toBeGreaterThan(15);
        });

        it('given no argument, returns `false`', () => {
            expect(encrypt()).toBe(false);
        });
    })

    describe('Decryption', () => {
        it('given a hash, returns the decrypted string', () => {
            expect(decrypt(encrypted)).toBe(string)
        });
        it('given no argument, returns `false`', () => {
            expect(decrypt()).toBe(false);
        });
    })
})