import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Day {
  label: string;
  day: string;
  value: string;
}

const getDaysOfWeek = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Começa a semana na segunda-feira
  return Array.from({ length: 7 }, (_, i) => addDays(start, i)).map((date) => ({
    label: format(date, "EEEEEE", { locale: ptBR }).toUpperCase(),
    day: format(date, "dd", { locale: ptBR }).toUpperCase(),
    value: format(date, "yyyy-MM-dd"),
  }));
};

const timeSlots: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const AppointmentScheduler: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [daysOfWeek, setDaysOfWeek] = useState<Day[]>(getDaysOfWeek());

  useEffect(() => {
    setDaysOfWeek(getDaysOfWeek());
  }, []);

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
    setSelectedTimes([]);
  };
  const handleTimePress = (time: string) => {
    setSelectedTimes((prevTimes) => {
      if (prevTimes.includes(time)) {
        return prevTimes.filter((t) => t !== time);
      } else {
        return [...prevTimes, time];
      }
    });
  };

  const isTimeSelected = (time: string) => {
    return selectedTimes.includes(time);
  };
  console.log(selectedTimes);

  return (
    <View className={"rounded-3xl mt-2"}>
      <Text className={"text-lg font-bold mt-5"} style={{ color: "#96A7AF" }}>
        Datas
      </Text>
      <ScrollView horizontal style={{ maxHeight: 100 }}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day.value}
            style={[
              styles.dayButton,
              selectedDay === day.value && styles.selectedDay,
            ]}
            onPress={() => handleDayPress(day.value)}
          >
            <View className={"text-center w-full items-center"}>
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day.value && styles.selectedDayText,
                ]}
                className={"font-bold text-2xl"}
              >
                {day.label}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day.value && styles.selectedDayText,
                ]}
                className={"font-bold text-2xl"}
              >
                {day.day}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedDay && (
        <>
          <Text
            className={"text-lg font-bold my-5"}
            style={{ color: "#96A7AF" }}
          >
            Horários
          </Text>
          <ScrollView horizontal style={{ maxHeight: 80 }}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  isTimeSelected(time) && styles.selectedTime,
                ]}
                onPress={() => handleTimePress(time)}
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    isTimeSelected(time) && styles.selectedTime,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {selectedTimes.length > 0 && (
        <View>
          <TouchableOpacity
            style={styles.submitButton}
            className={"w-full items-center align-middle flex-row mt-5"}
          >
            <Text
              className={
                "text-lg items-center text-center w-full text-white font-bold"
              }
            >
              Agendar agora!
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 80,
  },
  dayText: {
    color: "#fff",
  },
  selectedDay: {
    backgroundColor: "#FFF",
  },
  selectedDayText: {
    color: "#000",
  },
  timeButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  timeButton: {
    padding: 10,
    margin: 5,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
    color: "#FFF",
  },
  selectedTime: {
    backgroundColor: "#FFF",
    color: "#000",
  },
  disabledTime: {
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#779CAB",
    borderRadius: 12,
    height: 50,
    color: "#fff",
  },
});
