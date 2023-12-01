import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // @ts-ignore
import Logo from "../../../assets/inkhub_logo_nobg.png";
import { router } from "expo-router";
import { Box } from "@/components/templates/Box/Box";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

WebBrowser.maybeCompleteAuthSession();

const Welcome = () => {
  const queryClient = useQueryClient();
  const googleAuthConfig = {
    iosClientId:
      "417621700424-fj7prbt211grhaq48asa1r0qjjbv850e.apps.googleusercontent.com",
    androidClientId:
      "417621700424-cm5dq1k88dlrqpkn7v5cmugtkvq4jgoi.apps.googleusercontent.com",
    webClientId:
      "417621700424-itftt5n3adf01gncalang5e5rl32e9iv.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  };
  const [, response, promptAsync] = Google.useAuthRequest({
    ...googleAuthConfig,
    redirectUri: "com.felipequeiroz.inkhub://",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(async () => {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      router.replace("/auth/home");
      return JSON.parse(user);
    }
    return null;
  });

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      setIsLoading(true);
      const responseUserInfo = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = await responseUserInfo.json();

      const dataVerifyUser = await fetch(
        `https://inkhub-api-production.up.railway.app/users/exists/${user.id}`,
      );

      const isUserExists = await dataVerifyUser.json();

      if (isUserExists === false) {
        // PEGAR ID DO USUARIO QUANDO VOLTAR DA RESPONSE E COLOCAR NO ASYNC STORAGE
        const { data } = await axios.post(
          "https://inkhub-api-production.up.railway.app/users",
          {
            googleId: user.id,
            portifolioUrl: user.picture,
            email: user.email,
            name: user.name,
            imageUrl: user.picture,
          },
        );

        await AsyncStorage.setItem(
          "@user",
          JSON.stringify({
            id: data.id,
            googleId: data?.googleId,
            portifolioUrl: data?.portifolioUrl,
            email: data?.email,
            name: data?.name,
            imageUrl: data?.imageUrl,
          }),
        );
        await queryClient.invalidateQueries();

        router.replace("/auth/home");
      } else {
        await AsyncStorage.setItem(
          "@user",
          JSON.stringify({
            id: isUserExists?.id,
            googleId: isUserExists?.googleId,
            portifolioUrl: isUserExists?.portifolioUrl,
            email: isUserExists?.email,
            name: isUserExists?.name,
            imageUrl: isUserExists?.imageUrl,
          }),
        );

        await queryClient.invalidateQueries();

        router.replace("/auth/home");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");

    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken as string);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  return (
    <Box>
      <View className="my-5 flex-1 items-center justify-center">
        <View className="items-start px-4 mb-5">
          <View className="rounded-3xl bg-white">
            <Image
              source={Logo}
              className="xl:trans h-24 w-24 xl:bg-transparent"
            />
          </View>
        </View>
        <View className="items-center gap-2 px-2">
          <Text className="text-left text-5xl font-bold text-white">
            Bem-vindo!
          </Text>
          <Text className="text-left text-2xl text-gray-500 mb-2">
            Faça o login para continuar
          </Text>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => promptAsync()}
            disabled={isLoading}
          >
            <Ionicons
              name={"logo-google"}
              size={24}
              color={"#fff"}
              style={{ marginRight: 10 }}
            />
            <Text className={"text-lg  text-white font-bold"}>
              {isLoading ? "Carregando..." : "Entrar com o Google"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#779CAB",
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 40,
    justifyContent: "center",
    flexDirection: "row",
    height: 50,
    color: "#fff",
  },
});

export { Welcome };
