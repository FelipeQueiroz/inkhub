import { Image, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Box } from "@/components/templates/Box/Box";
import { ScheduleBox } from "@/components/molecules/ScheduleBox/ScheduleBox";
import { StudioBox } from "@/components/molecules/StudioBox/StudioBox";
import { useGetStudios } from "@/hooks/studios/studios";
import useGetSchedulings, { Scheduling } from "@/hooks/scheduling/scheduling";
import { User } from "@/hooks/user/user";

const Home = () => {
  const [user, setUser] = useState<User | undefined>();

  const { data, isLoading } = useGetStudios();

  const {
    data: schedulingData,
    isLoading: isLoadingScheduling,
    refetch,
    isRefetching,
  } = useGetSchedulings(Number(user?.id));

  const [scheduling, setScheduling] = useState<Scheduling[]>([]);

  useEffect(() => {
    if (schedulingData) {
      setScheduling(schedulingData);
    }
  }, [schedulingData]);

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("@user");
      const currentUser = JSON.parse(savedUser);
      setUser(currentUser);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser().then(() => refetch());
  }, []);

  return (
    <Box>
      <View className="my-5 flex-1  justify-between gap-1 ">
        <View className="items-start px-4 pt-14">
          <View className={"flex-row w-full justify-between items-center"}>
            <Text className="text-5xl font-bold text-white">
              Olá, {user?.name.split(" ")[0]}
            </Text>

            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 64, height: 64 }}
              className={"rounded-full"}
            />
          </View>
          <View className={"h-40"}>
            {isLoadingScheduling ? (
              <Text className={"text-white text-2xl"}>Carregando...</Text>
            ) : (
              <>
                <Text
                  className="text-2xl my-4 text-white"
                  style={{ color: "#96A7AF" }}
                >
                  {scheduling?.length > 0 ? "Agendamentos" : "Sem agendamentos"}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {scheduling?.map((schedule) => (
                    <ScheduleBox
                      key={schedule.id}
                      txNameStudio={schedule.studio.name}
                      dtStartSchedule={schedule.dtStartSchedule}
                      dtEndSchedule={schedule.dtEndSchedule}
                    />
                  ))}
                </ScrollView>
              </>
            )}
          </View>

          <View>
            <Text
              className="text-2xl my-5 text-white"
              style={{ color: "#96A7AF" }}
            >
              Estúdios próximos
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {isLoading && !data ? (
                <Text className={"text-white text-2xl"}>Carregando...</Text>
              ) : (
                <>
                  {data?.map((studio) => (
                    <StudioBox
                      key={studio.id}
                      id={studio.id}
                      txNameStudio={studio.name}
                      dateOpen={"2023-12-10 10:00:00"}
                      dateClose={"2023-12-10 18:00:00"}
                      distance={"2km"}
                      background={studio.imageUrl}
                    />
                  ))}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Box>
  );
};

export { Home };
