import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedSectionContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSectionContainer({ style, lightColor, darkColor, ...otherProps }: ThemedSectionContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundSection');

  return <View style={[{ backgroundColor }, style, styles.formContainer]} {...otherProps} />;
}

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    // paddingVertical: 1,
    // paddingHorizontal: 10,
    borderRadius: 20,
    // marginBottom: 10,
    // borderWidth: 1,
    // borderColor: "red"
  },
});