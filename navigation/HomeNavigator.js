import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import HomeScreen from '../screens/HomeScreen';

export default DrawerNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen}
  }, {
    navigationOptions: ({ navigation }) => ({
      drawerIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios' ? `ios-log-in${focused ? '' : '-outline'}` : 'md-log-in';
          break;
          case 'Settings':
            iconName = Platform.OS === 'ios' ? `ios-person-add${focused ? '' : '-outline'}` : 'md-person-add';
          break;
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
