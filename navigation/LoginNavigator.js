import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export default TabNavigator({
    Login: { screen: LoginScreen},
    Signup: { screen: SignupScreen},
  }, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Login':
            iconName = Platform.OS === 'ios' ? `ios-log-in${focused ? '' : '-outline'}` : 'md-log-in';
          break;
          case 'Signup':
            iconName = Platform.OS === 'ios' ? `ios-person-add${focused ? '' : '-outline'}` : 'md-person-add';
          break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
