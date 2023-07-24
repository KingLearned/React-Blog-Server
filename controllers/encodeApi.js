class stringCrypt {
    
    encrypt(CodeKey) {
        let Encrypting = '';
        CodeKey = (CodeKey).split('');
        for (let i = 0; i < CodeKey.length; i++) {
            Encrypting += i % 2 == 0 ? CodeKey[i] : '';
        }
        for (let i = 0; i < CodeKey.length; i++) {
            Encrypting += i % 2 !== 0 ? CodeKey[i] : '';
        }
        return Encrypting;
    }
    

    
    decrypt(encryptedData) {
        let Decrypting = '';
        const CodeKey = (encryptedData).split('');
        const CodeLen = (encryptedData).split('');
        const arrA = CodeKey.splice(0, Math.round(CodeKey.length / 2));
        const arrB = CodeKey.splice(0, CodeKey.length);
        for (let i = 0; i < CodeLen.length; i++) {
            Decrypting += arrA[i] !== undefined ? arrA[i] : '';
            Decrypting += arrB[i] !== undefined ? arrB[i] : '';
        }
        return Decrypting;
    }
    compare(encryptedData, Datatocompare) {
        return new stringCrypt().decrypt(encryptedData) == Datatocompare;
    }
}

export default  new stringCrypt()