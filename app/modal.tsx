import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  const currentYear = new Date().getFullYear()
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi Lista</ThemedText>
      <Link href="https://sites.google.com/view/mi-lista-privacidad" style={styles.link}>
        <ThemedText type="link">Ver Política de Privacidad</ThemedText>
      </Link>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Volver</ThemedText>
      </Link>
      <ThemedText type="default">© {currentYear}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
