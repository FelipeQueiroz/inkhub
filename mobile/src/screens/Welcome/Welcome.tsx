import { Image, Text, View } from 'react-native'; // @ts-ignore

import Logo from '../../../assets/inkhub_logo_nobg.png';

const Welcome = () => (
  <View className="my-5 flex-1 items-center justify-between gap-1">
    <View className="items-center pt-12">
      <Image source={Logo} className="xl:trans h-32 w-32 xl:bg-transparent" />
    </View>
    <View className="items-center gap-2 px-2">
      <Text className="text-center text-5xl font-bold">InkHub</Text>
      <Text className="px-12 text-center text-2xl font-bold">
        Conectando Tatuadores a Estúdios de Tatuagem
      </Text>
      <Text className="text-1xl px-10 text-center">
        O InkHub é a solução que une tatuadores iniciantes com talento e
        público, mas sem local, a estúdios de tatuagem que enfrentam tempos
        ociosos e custos elevados de aluguel. Através do nosso aplicativo,
        estúdios podem oferecer horários não utilizados, proporcionando a
        tatuadores em ascensão a oportunidade de praticar sua arte em um
        ambiente profissional. Essa colaboração beneficia ambos os lados,
        tornando a tatuagem mais acessível e fomentando o crescimento da
        indústria.
      </Text>
    </View>
    <View className="text= items-center">
      <Text>Felipe Queiroz de Magalhães Correia. RA: 21708413</Text>
      <Text>Daniel Ferreira de Alencar Junior RA: 22006187</Text>
      <Text>Igor Costa Farage Fonseca RA: 21951714</Text>
      <Text>Nicolas Freitas Ribeiro RA: 21908996</Text>
    </View>
  </View>
);

export { Welcome };
