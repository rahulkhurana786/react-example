import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

// Import mock screens
import UsersList from '../screens/UsersList';
import BookmarksList from '../screens/BookmarksList';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  showLabel: false,
  inactiveTintColor: '#c0c0c3',
  activeTintColor: '#2D3038',
  style: {
    height: '10%',
    backgroundColor: '#1E1B26'
  }
};

const screenOptions = (route, color, focused) => {
  let iconName;
  switch (route.name) {
    case 'UsersList':
      iconName = 'home';
      break;
    case 'BookmarksList':
      iconName = 'bookmark-multiple-outline';
      break;
    default:
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
};

function home() {
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => screenOptions(route, color)
      })}
    >
      <Tab.Screen name='UsersList' component={UsersList} />
      <Tab.Screen name='BookmarksList' component={BookmarksList} />
    </Tab.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Login"}
        headerShown={false}
        screenOptions={{
          headerTransparent: true,
          // gestureEnabled: false,
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={home} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};


export default RootNavigator;
