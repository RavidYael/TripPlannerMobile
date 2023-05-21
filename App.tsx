import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/components/login/LoginScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { initUser } from "./src/actions/security";
import MainScreen from "./src/components/main/MainScreen";
import CreateNewPostScreen from "./src/components/feed/creatNewPost/CreateNewPostScreen";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initRoute, setInitRoute] = useState(null);

  useEffect(() => {
    initUser((success) => {
      setInitRoute(success ? "Main" : "Login");
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {initRoute ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: { backgroundColor: "white" },
            }}
            initialRouteName={initRoute}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewPost"
              component={CreateNewPostScreen}
              options={{ headerTitle: "New Post" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
      <Toast/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
