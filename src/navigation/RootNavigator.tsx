import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PostsList from "../components/PostsList";
import PostDetail from "../components/PostDetail";

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostsList"
          component={PostsList}
          options={{ title: "Liste des articles" }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{ title: "Détails de l'article" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
