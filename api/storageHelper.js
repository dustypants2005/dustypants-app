import { AsyncStorage } from 'react-native';
import storage from '../constants/storage';

export default {
  GetLoginUser: () => {
    return AsyncStorage.getItem(storage.loginUser)
    .then(user => {
      console.log('GetLoginUser: ', user);
      return user;
    })
    .catch( e => {
      console.log('GetLoginUser error: ', e);
    });
  },
  SetLoginUser: (value) => {
    return AsyncStorage.setItem(storage.loginUser, JSON.stringify(value))
    .catch( e => {
      console.log('SetLoginUser error: ', e);
    });
  }
}