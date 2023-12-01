import { Stack } from "expo-router";
import { BottomTabs, Box } from "@/components/templates";
import { Studio } from "@/screens/auth/Studio/Studio";

const AuthStudioScreen = () => (
  <Box>
    <Stack.Screen
      options={{
        title: "AuthStudio",
        headerShown: false,
      }}
    />
    <Studio />
    <BottomTabs actived={"home"} />
  </Box>
);

export default AuthStudioScreen;
