import { Stack } from 'expo-router';

import { BottomTabs } from '@/components/templates';
import { About } from '@/screens/About/About';

const AboutScreen = () => (
  <>
    <Stack.Screen
      options={{
        title: 'About',
        headerShown: false,
      }}
    />
    <About />
    <BottomTabs type="about" />
  </>
);

export default AboutScreen;
