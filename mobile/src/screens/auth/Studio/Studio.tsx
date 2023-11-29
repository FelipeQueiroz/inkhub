import { Box } from "@/components/templates";
import { ImageBackground, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabList } from "@/components/molecules/TabList/TabList";
import { useState } from "react";
import { AppointmentScheduler } from "@/components/molecules/AppointmentScheduler/AppointmentScheduler";

export const Studio = () => {
  const [tabs, setTabs] = useState<string[]>([
    "Descrição",
    "Agenda",
    "Comentários",
  ]);
  const [actived, setActived] = useState<string>("Descrição");

  const onChange = (tab: string) => {
    setActived(tab);
  };

  const mockupStudio = {
    id: 1,
    txNameStudio: "TattoInk DF",
    likes: 32,
    txBackground:
      "https://images.unsplash.com/photo-1608666599953-b951163495f4?q=80&w=3566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blockedDates: [
      {
        id: 1,
        dtStart: "2023-12-10 10:00:00",
        dtEnd: "2023-12-10 11:00:00",
      },
      {
        id: 2,
        dtStart: "2023-12-11 11:00:00",
        dtEnd: "2023-12-11 12:00:00",
      },
    ],
    comments: [
      {
        id: 1,
        txComment: "Comentário 1",
        txNameUser: "Usuário 1",
        txPhotoUser:
          "https://lh3.googleusercontent.com/a/ACg8ocJ5fODo0wYId1nzxJ0lQSsy7Uf8lmqYhQUqmtg5xI7ROeA=s96-c",
      },
    ],
    txDescription:
      "Bem-vindo à TattooInk DF, onde o passado encontra a pele. Nossa equipe de artistas apaixonados e talentosos está pronta para transformar suas ideias em obras-primas atemporais. Com um toque nostálgico e um estilo clássico, trazemos à vida a tradição das tatuagens old school, com cores vibrantes, linhas ousadas e designs que contam histórias. Entre em nossa loja e faça parte da história da tatuagem, onde cada tatuagem é uma homenagem à arte que transcende gerações.",
  };
  return (
    <Box>
      <ImageBackground
        source={{ uri: mockupStudio.txBackground }}
        style={{ width: "100%", height: 300 }}
      />
      <View
        className=" justify-between gap-1 rounded-t-5xl "
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
              {mockupStudio.txNameStudio}
            </Text>

            <View className={" align-center flex-row "}>
              <Ionicons name={"heart"} color={"#96A7AF"} size={16} />
              <Text className={"text-white "}> {mockupStudio.likes} likes</Text>
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
                {mockupStudio.txDescription}
              </Text>
            </View>
          )}

          {actived === "Agenda" && <AppointmentScheduler />}
        </View>
      </View>
    </Box>
  );
};
