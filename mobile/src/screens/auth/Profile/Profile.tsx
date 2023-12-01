import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Box } from "@/components/templates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/hooks/user/user";

interface IUser {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export const Profile = () => {
  const [user, setUser] = useState<User | undefined>();

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("@user");
      const currentUser = JSON.parse(savedUser);
      setUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    router.replace("/");
  };

  return (
    <Box>
      <View className="my-5 flex-1  justify-between gap-1 ">
        <View className="items-start px-4 pt-14">
          <Link href="/auth/home" asChild>
            <Pressable>
              <View className={"flex-row w-full gap-2 items-center"}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text className={"text-sm text-white font-bold w-40"}>
                  Voltar
                </Text>
              </View>
            </Pressable>
          </Link>
          <View className={" w-full justify-between items-left mt-5"}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 100, height: 100 }}
              className={"rounded-2xl"}
            />

            <Text className="text-3xl font-bold mt-4 text-white">
              {user?.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => router.replace("/auth/scheduling")}
              className={"w-full items-center  flex-row mt-5"}
            >
              <Ionicons name={"book"} size={24} color={"white"} />
              <Text
                className={"text-lg ml-3 text-left w-full text-white font-bold"}
              >
                Agendamentos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleLogout}
              className={"w-full items-center  flex-row mt-5"}
            >
              <Ionicons name={"exit"} size={24} color={"white"} />
              <Text
                className={"text-lg ml-3 text-left w-full text-white font-bold"}
              >
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 15,
    color: "#fff",
  },
});
