import crypto from 'crypto-js';

const PRIVATE_KEY = `MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA1TGuUsWG9c8Q0pY2
7MMmSi/tbEImH4QYBu/6tHosNUprgSHAuFNys9ITyRROhG5PVw0vuV+zQkGXuub8
j/X51wIDAQABAkBG/a8dsta4/YWNiiWp+2XBqGn39aL6NaNGlBy4gkI8T/rIt5ob
4kogfdxvlF7BhiBkp50dobYSZHzoqyVytNjZAiEA+T3PkRcTIREb15UUSZuSkQcI
TSqVvejdVMYy0WiDGOsCIQDa+aK+PB2nh9k9lQn/g8OjQJfTtCpCcUHUCjShbNgn
xQIgYiwclBO4ry+j/dh0s0GaC5HvjSWW8cTFWVzwK1e1O50CIF3TUxEyDv7GraW+
Y49RNRWRSrzSWL0pbCxfxxdX3PKFAiB3Tb0LAaPZ1+PAy2/JUrkUHCWKgK+9/uj+
GLoeBWAMYQ==`;


const encrypt = (data) => {
    if(!data) return false
    try{
        return crypto.AES.encrypt(data, PRIVATE_KEY).toString();
    }catch(e){
        throw Error(e)
    }
}

const decrypt = (hash) => {
    if(!hash) return false

    try{
        var bytes = crypto.AES.decrypt(hash, PRIVATE_KEY);
        var originalData = bytes.toString(crypto.enc.Utf8);
        return originalData
    }catch(e){
        throw Error(e)
    }
}

export {encrypt, decrypt}