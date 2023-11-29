import { Button, Image, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Box } from "@/components/templates/Box/Box";
import { router } from "expo-router";
import { ScheduleBox } from "@/components/molecules/ScheduleBox/ScheduleBox";
import { StudioBox } from "@/components/molecules/StudioBox/StudioBox";

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

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    router.replace("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  const mockupSchedule = [
    {
      id: 1,
      txNameStudio: "Studio 1",
      dtStartSchedule: "2023-12-10 10:00:00",
      dtEndSchedule: "2023-12-10 11:00:00",
    },
    {
      id: 2,
      txNameStudio: "Studio 2",
      dtStartSchedule: "2023-12-11 11:00:00",
      dtEndSchedule: "2023-12-11 12:00:00",
    },
  ];

  const mockupStudio = [
    {
      id: 1,
      txNameStudio: "Studio 1",
      txAddress: "Rua 1",
      distance: "1.5km",
      dateOpen: "2023-12-10 10:00:00",
      dateClose: "2023-12-10 18:00:00",
      txBackground:
        "https://images.unsplash.com/photo-1608666599953-b951163495f4?q=80&w=3566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      txNameStudio: "Studio 2",
      txAddress: "Rua 2",
      dateOpen: "2023-12-10 10:00:00",
      dateClose: "2023-12-10 18:00:00",
      distance: "2.5km",
      txBackground:
        "https://images.unsplash.com/photo-1608666599953-b951163495f4?q=80&w=3566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      txNameStudio: "Studio 3",
      txAddress: "Rua 3",
      dateOpen: "2023-12-10 00:00:00",
      dateClose: "2023-12-10 10:00:00",
      distance: "3.5km",
      txBackground:
        "https://images.unsplash.com/photo-1608666599953-b951163495f4?q=80&w=3566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
          <View className={"h-40"}>
            <Text
              className="text-2xl my-4 text-white"
              style={{ color: "#96A7AF" }}
            >
              Agendamento
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mockupSchedule.map((schedule) => (
                <ScheduleBox
                  key={schedule.id}
                  txNameStudio={schedule.txNameStudio}
                  dtStartSchedule={schedule.dtStartSchedule}
                  dtEndSchedule={schedule.dtEndSchedule}
                />
              ))}
            </ScrollView>
          </View>

          <View>
            <Text
              className="text-2xl my-5 text-white"
              style={{ color: "#96A7AF" }}
            >
              Estúdios próximos
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mockupStudio.map((schedule) => (
                <StudioBox
                  key={schedule.id}
                  txNameStudio={schedule.txNameStudio}
                  dateOpen={schedule.dateOpen}
                  dateClose={schedule.dateClose}
                  distance={schedule.distance}
                  background={schedule.txBackground}
                />
              ))}
            </ScrollView>
          </View>

          <Button title={"Sair"} onPress={() => handleLogout()} />
        </View>
      </View>
    </Box>
  );
};

export { Home };
