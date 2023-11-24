import type React from 'react';
import { View } from 'react-native';

type BoxProps = {
  children: React.ReactNode;
};

export const Box = ({ children }: BoxProps) => {
  return (
    <View style={{ backgroundColor: '#17181C' }} className="flex-1">
      {children}
    </View>
  );
};
