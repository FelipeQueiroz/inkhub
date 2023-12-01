/* eslint-disable @typescript-eslint/no-explicit-any */
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

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
  actived?: "home" | "search" | "profile";
}

export const BottomTabs = ({ actived }: BottomTabsProps) => {
  return (
    <View
      className="px-24 py-5 rounded-t-3xl flex-row items-center  justify-between"
      style={{ backgroundColor: "#30444E" }}
    >
      <Link href="/auth/search" asChild>
        <Pressable>
          <View
            className={`flex-row items-center rounded-2xl   p-2 ${
              actived === "search" && "rounded-full"
            }`}
            style={{
              backgroundColor: actived === "search" ? "#7193A1" : "#30444E",
            }}
          >
            <Ionicons
              name="ios-search"
              color={actived === "search" ? "#FFFFFF" : "#96A7AF"}
              size={24}
            />
          </View>
        </Pressable>
      </Link>
      <Link href="/auth/home" asChild>
        <Pressable>
          <View
            className={`flex-row items-center rounded-2xl   p-2 ${
              actived === "home" && "rounded-full"
            }`}
            style={{
              backgroundColor: actived === "home" ? "#7193A1" : "#30444E",
            }}
          >
            <Ionicons
              name="home"
              color={actived === "home" ? "#FFFFFF" : "#96A7AF"}
              size={24}
            />
          </View>
        </Pressable>
      </Link>

      <Link href="/auth/profile" asChild>
        <Pressable>
          <View
            className={`flex-row items-center rounded-2xl   p-2 ${
              actived === "profile" && "rounded-full"
            }`}
            style={{
              backgroundColor: actived === "profile" ? "#7193A1" : "#30444E",
            }}
          >
            <Ionicons
              name="person"
              color={actived === "profile" ? "#FFFFFF" : "#96A7AF"}
              size={24}
            />
          </View>
        </Pressable>
      </Link>
    </View>
  );
};
