import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  onPressIcon?: () => void;
  value: string;
  iconLeft?: string;
  iconRight?: string;
  secureTextEntry?: boolean;

  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
};

export const Input = (props: InputProps) => {
  const hasLeftIcon = !!props.iconLeft;
  const hasRightIcon = !!props.iconRight;

  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      {hasLeftIcon && (
        <Ionicons
          style={[styles.searchIcon, styles.leftIcon]}
          name={props.iconLeft}
          size={20}
          color="#96A7AF"
        />
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderTopLeftRadius: hasLeftIcon ? 0 : 8,
            borderBottomLeftRadius: hasLeftIcon ? 0 : 8,
            borderTopRightRadius: hasRightIcon ? 0 : 8,
            borderBottomRightRadius: hasRightIcon ? 0 : 8,
          },
        ]}
        underlineColorAndroid="transparent"
        {...props}
      />
      {hasRightIcon && (
        <Pressable onPress={props.onPressIcon}>
          <Ionicons
            style={[styles.searchIcon, styles.rightIcon]}
            name={props.iconRight}
            size={20}
            color={props.value.length > 3 ? "#FFF" : "#96A7AF"}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    padding: 10,
    backgroundColor: "#2A3C44",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#2A3C44",
    color: "#96A7AF",
  },
  leftIcon: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightIcon: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
