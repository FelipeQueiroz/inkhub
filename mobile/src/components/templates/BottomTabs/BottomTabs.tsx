/* eslint-disable @typescript-eslint/no-explicit-any */
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
const TabBarIcon = (props: any) => {
  return (
    <AntDesign
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};

{
  /*  */
}

interface BottomTabsProps {
  type?: 'home' | 'about';
}

export const BottomTabs = ({ type }: BottomTabsProps) => {
  return (
    <View className="mx-24 mb-4 flex-row items-center  justify-between">
      <Link href="/" asChild>
        <Pressable>
          <View
            className={`flex-row items-center rounded-2xl   p-2 ${
              type === 'home' && 'border-2'
            }`}
          >
            <TabBarIcon name="home" />
            <Text className="ml-2">Home</Text>
          </View>
        </Pressable>
      </Link>
      <Link href="/about" asChild>
        <Pressable>
          <View
            className={`flex-row items-center rounded-2xl   p-2 ${
              type === 'about' && 'border-2'
            }`}
          >
            <TabBarIcon name="infocirlceo" />
            <Text className="ml-2">About</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};
