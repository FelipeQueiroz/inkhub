import { Pressable, ScrollView, Text, View } from "react-native";
import { Box } from "@/components/templates";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { TabList } from "@/components/molecules/TabList/TabList";
import { useState } from "react";
import { StudioBox } from "@/components/molecules/StudioBox/StudioBox";
import { useGetStudios } from "@/hooks/studios/studios";

export const Search = () => {
  const [tabs, setTabs] = useState<string[]>(["Próximos", "Favoritos"]);
  const [actived, setActived] = useState<string>("Próximos");

  const { data, isLoading } = useGetStudios();

  const onChange = (tab: string) => {
    setActived(tab);
  };

  const mockupFavoriteStudio = [
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
  ];

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
          <Text className={"text-4xl mt-5 text-white font-bold w-40"}>
            Buscar estúdios
          </Text>
          <View className={"h-20"}>
            <TabList tabs={tabs} actived={actived} onChange={onChange} />
          </View>
          <View className={" w-full"}>
            {actived === "Próximos" && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ScrollView
                  contentContainerStyle={{ alignItems: "center" }}
                  style={{ width: "100%", height: "80%" }}
                >
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
            )}
          </View>

          <View className={" w-full"}>
            {actived === "Favoritos" && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ScrollView
                  contentContainerStyle={{ alignItems: "center" }}
                  style={{ width: "100%", height: 590 }}
                >
                  {mockupFavoriteStudio.map((schedule) => (
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
            )}
          </View>
        </View>
      </View>
    </Box>
  );
};
