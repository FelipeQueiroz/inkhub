import { Image, Text, View } from "react-native";
import { Box } from "@/components/templates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Input } from "@/components/atoms/Input/Input";
import { CarouselComponent } from "@/components/atoms/Carousel/Carousel";

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

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<IUser | undefined>();

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("@user");
      const currentUser = JSON.parse(savedUser);
      setUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);
  return (
    <Box>
      <View className="my-5 flex-1  justify-between gap-1 ">
        <View className="items-start px-4 pt-14">
          <View className={"flex-row w-full justify-between items-center"}>
            <Text className="text-5xl font-bold text-white">
              Olá, {user?.given_name}
            </Text>

            <Image
              source={{ uri: user?.picture }}
              style={{ width: 64, height: 64 }}
              className={"rounded-full"}
            />
          </View>
          <View className={"h-full mt-5"}>
            <Input
              placeholder={"Pesquisar"}
              onChangeText={handleChangeText}
              value={search}
              iconRight={"ios-search"}
            />
            <Text
              className="text-2xl my-3 text-white"
              style={{ color: "#96A7AF" }}
            >
              Agendamento
            </Text>
            <CarouselComponent />
          </View>
        </View>
      </View>
    </Box>
  );
};

export { Home };
