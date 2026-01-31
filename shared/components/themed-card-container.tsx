import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedCardContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedCardContainer({ style, lightColor, darkColor, ...otherProps }: ThemedCardContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style, styles.formContainer]} {...otherProps} />;
}

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
});