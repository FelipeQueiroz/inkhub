import { Stack } from "expo-router";
import { BottomTabs, Box } from "@/components/templates";
import { Scheduling } from "@/screens/auth/Scheduling/Scheduling";

const AuthSchedulingScreen = () => (
  <Box>
    <Stack.Screen
      options={{
        title: "AuthScheduling",
        headerShown: false,
      }}
    />
    <Scheduling />
    <BottomTabs actived={"profile"} />
  </Box>
);

export default AuthSchedulingScreen;
