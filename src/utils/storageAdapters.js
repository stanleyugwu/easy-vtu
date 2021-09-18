//storage helper packages
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encrypt, decrypt} from './crypto';
import Constants from 'expo-constants';

const storeKey = Constants.manifest.extra.localStoreKey;

//data retriever
async function getLocalData(decryptData = true) {
    try {   
        const data = await AsyncStorage.getItem(storeKey);

        //no data
        if(data == null) return null
        
        //decrypt data
        let decrypted = JSON.parse(decryptData ? decrypt(data) : data);
        return decrypted

    } catch (error) {
        // There was an error on the native side
        return false
    }
}

//data persistor
async function storeLocalData(data, encryptData = true) {
    try {
        await AsyncStorage.setItem(
            storeKey,
            encryptData ? encrypt(JSON.stringify(data)) : JSON.stringify(data)
        );
        //data stored
        return true
    } catch (error) {
        // There was an error on the native side
        return false
    }
}

export {storeLocalData,getLocalData}