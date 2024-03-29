import { Stack } from "expo-router";
import { Home } from "@/screens/auth/Home/Home";
import { BottomTabs, Box } from "@/components/templates";

const AuthHomeScreen = () => (
  <Box>
    <Stack.Screen
      options={{
        title: "AuthHome",
        headerShown: false,
      }}
    />
    <Home />
    <BottomTabs actived={"home"} />
  </Box>
);

export default AuthHomeScreen;
