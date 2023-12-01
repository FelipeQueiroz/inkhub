import { Stack } from "expo-router";
import { BottomTabs, Box } from "@/components/templates";
import { Profile } from "@/screens/auth/Profile/Profile";

const AuthHomeScreen = () => (
  <Box>
    <Stack.Screen
      options={{
        title: "AuthProfile",
        headerShown: false,
      }}
    />
    <Profile />
    <BottomTabs actived={"profile"} />
  </Box>
);

export default AuthHomeScreen;
