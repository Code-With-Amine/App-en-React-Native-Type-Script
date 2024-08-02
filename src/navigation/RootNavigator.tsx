import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ItemsList from '../components/ItemsList';
import PostDetail from '../components/PostDetail';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ItemsList" component={ItemsList} options={{ title: 'Items List' }} />
        <Stack.Screen name="PostDetail" component={PostDetail} options={{ title: 'Post Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
