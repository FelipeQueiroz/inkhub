import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TabProps {
  actived?: boolean;
  onPress?: () => void;
  icon?: string;
  title: string;
}

export const Tab = ({ actived, onPress, icon, title }: TabProps) => {
  return (
    <Pressable onPress={onPress} className={"mx-2"}>
      <View
        className={`flex-row items-center rounded-xl   p-3`}
        style={{
          backgroundColor: actived ? "#FFF" : "#30444E",
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            color={actived ? "#FFFFFF" : "#96A7AF"}
            size={24}
          />
        )}
        <Text style={{ color: actived ? "#000" : "#96A7AF" }}>{title}</Text>
      </View>
    </Pressable>
  );
};
