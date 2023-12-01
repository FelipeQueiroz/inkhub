import { Text, View } from "react-native";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type ScheduleBoxProps = {
  txNameStudio: string;
  dtStartSchedule: string;
  dtEndSchedule: string;
};

export const ScheduleBox = ({
  txNameStudio,
  dtStartSchedule,
  dtEndSchedule,
}: ScheduleBoxProps) => {
  const dateToNow =
    "Faltam " +
    formatDistanceToNow(new Date(dtStartSchedule), {
      locale: ptBR,
    }) +
    format(new Date(dtStartSchedule), " - dd/MM HH:mm");

  return (
    <View
      style={{ backgroundColor: "#30444E", width: 350 }}
      className="px-4 py-2 mx-2 rounded-2xl"
    >
      <Text className="text-xl my-2 text-white">{txNameStudio}</Text>
      <Text className="text-lg my-2 " style={{ color: "#96A7AF" }}>
        {dateToNow}
      </Text>
    </View>
  );
};
