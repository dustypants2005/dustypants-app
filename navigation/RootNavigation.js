import { Notifications } from 'expo';
import React, { Component } from 'react';
import { StackNavigator, NavigationActions, View } from 'react-navigation';
import LoginNavigator from './LoginNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import HomeNavigator from './HomeNavigator';

const RootStackNavigator = StackNavigator({
    Login: {
      screen: LoginNavigator
    },
    HomeNav: {
      screen: HomeNavigator
    }
  }, {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  _loginNavigation(loginUser){
    return(
      NavigationActions.navigate({
        routeName: 'Home',
        params: loginUser
      })
    );
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
