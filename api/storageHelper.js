import { AsyncStorage } from 'react-native';
import storage from '../constants/storage';

export default {
  GetToken: async () => {
    await AsyncStorage.getItem(storage.token)
    .then( token => {
      console.log('GetToken: ', token);
      return token;
    })
    .catch(e => {
      console.log('GetToken error: ', e);
    });
  },
  SetToken: async (value) => {
    await AsyncStorage.setItem(storage.token, JSON.stringify(value))
    .catch(e => {
      console.log('SetToken error: ', e);
    });    
  },
  GetUser: async () => {
    await AsyncStorage.getItem(storage.user)
    .then(user => {
      console.log('GetUser: ', user);
      return user;
    })
    .catch( e => {
      console.log('GetUser error: ', e);
    });    
  },
  SetUser: async (value) => {
    await AsyncStorage.setItem(storage.user, JSON.stringify(value))
    .catch( e => {
      console.log('SetUser error: ', e);
    });
  }
}