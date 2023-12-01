import { Box } from "@/components/templates";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { ScheduleBox } from "@/components/molecules/ScheduleBox/ScheduleBox";
import { useEffect, useState } from "react";
import { User } from "@/hooks/user/user";
import useGetSchedulings, {
  Scheduling as SchedulingInterface,
} from "@/hooks/scheduling/scheduling";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Scheduling = () => {
  const [user, setUser] = useState<User | undefined>();

  const [scheduling, setScheduling] = useState<SchedulingInterface[]>([]);

  const {
    data: schedulingData,
    isLoading,
    refetch,
    isRefetching,
  } = useGetSchedulings(Number(user?.id));

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser().then(() => refetch());
  }, []);

  if (!user?.id) {
    return (
      // You can render a loading state or any other component until user.id is available
      <Text>teste</Text>
    );
  }

  return (
    <Box>
      <View className="my-5 flex-1  justify-between gap-1 ">
        <View className="items-start px-4 pt-14">
          {isLoading ? (
            <Text className={"text-white text-2xl"}>Carregando...</Text>
          ) : (
            <>
              <Text
                className="text-2xl my-4 text-white"
                style={{ color: "#96A7AF" }}
              >
                {scheduling?.length > 0 ? "Agendamentos" : "Sem agendamentos"}
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: 700 }}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                  />
                }
              >
                {scheduling?.map((schedule) => (
                  <View className={"mt-5"} key={schedule.id}>
                    <ScheduleBox
                      key={schedule.id}
                      txNameStudio={schedule.studio.name}
                      dtStartSchedule={schedule.dtStartSchedule}
                      dtEndSchedule={schedule.dtEndSchedule}
                    />
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Box>
  );
};
