import { Stack } from "expo-router";
import { Home } from "@/screens/auth/Home/Home";

const AuthHomeScreen = () => (
  <>
    <Stack.Screen
      options={{
        title: "AuthHome",
        headerShown: false,
      }}
    />
    <Home />
  </>
);

export default AuthHomeScreen;
