import { Image, Text, TouchableOpacity } from "react-native";

import { format, isAfter, isBefore, parseISO, set } from "date-fns";
import { router } from "expo-router";

type StudioBoxProps = {
  txNameStudio: string;
  dateOpen: string;
  dateClose: string;
  distance: string;
  background: string;
};

export const StudioBox = ({
  txNameStudio,
  background,
  distance,
  dateOpen,
  dateClose,
}: StudioBoxProps) => {
  const now = new Date();

  const openTime = set(now, {
    hours: parseISO(dateOpen).getHours(),
    minutes: parseISO(dateOpen).getMinutes(),
    seconds: 0,
  });
  const closeTime = set(now, {
    hours: parseISO(dateClose).getHours(),
    minutes: parseISO(dateClose).getMinutes(),
    seconds: 0,
  });

  const isOpen = isAfter(now, openTime) && isBefore(now, closeTime);

  const statusText = isOpen
    ? ` - ${format(openTime, "HH:mm")} às ${format(closeTime, "HH:mm")}`
    : ` - ${format(openTime, "HH:mm")} às ${format(closeTime, "HH:mm")}`;

  const textColorClass = isOpen ? "text-green-500" : "text-red-500";

  return (
    <TouchableOpacity
      onPress={() => router.replace("/auth/studio")}
      style={{ backgroundColor: "#30444E", height: "auto" }}
      className="px-4 py-4 mx-5 my-5 w-80 max-h-96 rounded-2xl"
    >
      <Image
        source={{ uri: background }}
        style={{ width: "100%", height: 250 }}
        className={"rounded-2xl"}
      />
      <Text className="text-xl my-2 text-white">{txNameStudio}</Text>
      <Text
        className={`text-lg my-0.5 ${textColorClass}`}
        style={{ color: "#96A7AF" }}
      >
        <Text>
          <Text className={textColorClass}>
            {isOpen ? "Aberto agora" : "Fechado agora"}
          </Text>
        </Text>
        {statusText}
      </Text>
      <Text
        className={`text-lg my-0.5 ${textColorClass}`}
        style={{ color: "#96A7AF" }}
      >
        {distance}
      </Text>
    </TouchableOpacity>
  );
};
