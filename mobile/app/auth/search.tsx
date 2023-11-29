import { Stack } from "expo-router";
import { BottomTabs, Box } from "@/components/templates";
import { Search } from "@/screens/auth/Search/Search";

const AuthSearchScreen = () => (
  <Box>
    <Stack.Screen
      options={{
        title: "AuthSearch",
        headerShown: false,
      }}
    />
    <Search />
    <BottomTabs actived={"search"} />
  </Box>
);

export default AuthSearchScreen;
