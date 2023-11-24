import { Stack } from "expo-router";

import { Welcome } from "@/screens/Welcome/Welcome";

const Home = () => (
  <>
    <Stack.Screen
      options={{
        title: "Home",
        headerShown: false,
      }}
    />
    <Welcome />
  </>
);

export default Home;
