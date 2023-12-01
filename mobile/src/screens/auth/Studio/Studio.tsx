import { Box } from "@/components/templates";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabList } from "@/components/molecules/TabList/TabList";
import { useState } from "react";
import { AppointmentScheduler } from "@/components/molecules/AppointmentScheduler/AppointmentScheduler";
import { useLocalSearchParams } from "expo-router";
import { useGetStudio } from "@/hooks/studios/studios";
import useGetComments from "@/hooks/comments/comments";
import { format } from "date-fns";

export const Studio = () => {
  const local = useLocalSearchParams();

  const { data } = useGetStudio(Number(local.id));

  const { data: dataComments, isLoading: isLoadingComments } = useGetComments(
    Number(local.id),
  );

  const [tabs, setTabs] = useState<string[]>([
    "Descrição",
    "Agenda",
    "Comentários",
  ]);
  const [actived, setActived] = useState<string>("Descrição");

  const onChange = (tab: string) => {
    setActived(tab);
  };

  return (
    <Box>
      <ImageBackground
        source={{ uri: data?.imageUrl }}
        style={{ width: "100%", height: 300 }}
      />
      <View
        className="justify-between gap-1 rounded-t-5xl "
        style={{
          marginTop: -120,
          height: 120,
          backgroundColor: "rgba(23, 24, 28, 0.7)",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <View className="items-start pt-5">
          <View className={"px-4"}>
            <Text className={"text-white text-lg mb-2 font-bold"}>
              {data?.name}
            </Text>

            <View className={" align-center flex-row "}>
              <Ionicons name={"heart"} color={"#96A7AF"} size={16} />
              <Text className={"text-white "}> 148 likes</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: -30,
          width: "100%",
          backgroundColor: "#17181C",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
        className={"flex-1"}
      >
        <View className="items-center px-4 pt-5">
          <TabList tabs={tabs} actived={actived} onChange={onChange} />

          {actived === "Descrição" && (
            <View
              className={"p-5 rounded-3xl mx-5 mt-2"}
              style={{ backgroundColor: "#30444E" }}
            >
              <Text className={"text-white text-sm mb-2 font-bold "}>
                Seja bem-vindo!
              </Text>
              <Text className={" text-sm mb-2 "} style={{ color: "#96A7AF" }}>
                {data?.description}
              </Text>
            </View>
          )}

          {actived === "Agenda" && (
            <AppointmentScheduler studioId={Number(data?.id)} />
          )}

          {actived === "Comentários" && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: 400 }}
            >
              {dataComments?.map((comment) => (
                <View
                  className={"p-5 mt-4"}
                  key={comment.id}
                  style={{ backgroundColor: "#30444E", borderRadius: 20 }}
                >
                  <View className={"flex-row items-center justify-between"}>
                    <View className={"flex-row items-center"}>
                      <Image
                        source={{ uri: comment.user.imageUrl }}
                        style={{ width: 48, height: 48 }}
                        className={"rounded-full"}
                      />
                      <Text className={"text-white ml-2 font-bold text-lg"}>
                        {comment.user.name}
                      </Text>
                    </View>
                    <Text className={"text-lg"} style={{ color: "#96A7AF" }}>
                      {format(new Date(comment.commentDate), "HH:mm")}
                    </Text>
                  </View>
                  <Text className={"text-white mt-2 text-sm"}>
                    {comment.content}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Box>
  );
};
