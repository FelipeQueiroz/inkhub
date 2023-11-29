import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native"; // @ts-ignore
import Logo from "../../../assets/inkhub_logo_nobg.png";
import { router } from "expo-router";
import { Box } from "@/components/templates/Box/Box";

WebBrowser.maybeCompleteAuthSession();

const Welcome = () => {
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
      const responseUserInfo = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = await responseUserInfo.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      router.replace("/auth/home");
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
      <View className="my-5 flex-1  justify-between gap-1 ">
        <View className="items-start px-3 pt-14">
          <View className="rounded-3xl bg-white">
            <Image
              source={Logo}
              className="xl:trans h-16 w-16 xl:bg-transparent"
            />
          </View>
        </View>
        <View className="flex-1 items-start gap-2 px-2">
          <Text className="text-left text-5xl font-bold text-white">
            Bem-vindo!
          </Text>
          <Text className="text-left text-2xl text-gray-500">
            Faça o login para continuar
          </Text>
          <Text>{JSON.stringify(userInfo, null, 2)}</Text>
          <Button title="Continuar com Google" onPress={() => promptAsync()} />
          <Button
            title="Deletar cache"
            onPress={() => AsyncStorage.removeItem("@user")}
          />
        </View>
      </View>
    </Box>
  );
};

export { Welcome };
