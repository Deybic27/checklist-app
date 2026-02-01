import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedSectionTitleContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSectionTitleContainer({ style, lightColor, darkColor, ...otherProps }: ThemedSectionTitleContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundSection');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor, borderColor: borderColor }, style, styles.formContainer]} {...otherProps} />;
}

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
});