import { Stack } from 'expo-router';

import { BottomTabs } from '@/components/BottomTabs';
import { Welcome } from '@/screens/Welcome/Welcome';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        title: 'Home',
        headerShown: false,
      }}
    />
    <Welcome />
    <BottomTabs type="home" />
  </>
);

export default Home;
