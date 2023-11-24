import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

type CarouselProps = {};

export const CarouselComponent = (props: CarouselProps) => {
  const width = Dimensions.get("window").width;
  return (
    <View className={"flex-1react-native-reanimated"}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
};
