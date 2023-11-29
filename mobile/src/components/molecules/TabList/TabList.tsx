import { Tab } from "@/components/atoms/Tab/Tab";
import { ScrollView } from "react-native";

type TabListProps = {
  tabs: string[];
  actived: string;
  onChange: (tab: string) => void;
};

export const TabList = ({ tabs, actived, onChange }: TabListProps) => {
  return (
    <ScrollView horizontal className={"my-5"}>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          actived={actived === tab}
          onPress={() => onChange(tab)}
          title={tab}
        />
      ))}
    </ScrollView>
  );
};
