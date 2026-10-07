/**
 * Demo screen showcasing shared native components from @ruparupa/ui-native.
 *
 * @format
 */

import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from '@ruparupa/ui-native';

function App() {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>React Native — @ruparupa/ui-native</Text>
            <Text style={styles.subtitle}>
              Shared tokens + contracts with the web app, rendered natively.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TextInput</Text>

            <TextInput
              label="Full name"
              placeholder="Jane Doe"
              value={name}
              onChangeText={setName}
              leftIcon={<Text>👤</Text>}
            />

            <TextInput
              label="Search"
              placeholder="Search products…"
              value={search}
              onChangeText={setSearch}
              leftIcon={<Text>🔍</Text>}
              rightIcon={search.length > 0 ? <Text>✕</Text> : undefined}
              onRightIconPress={
                search.length > 0 ? () => setSearch('') : undefined
              }
            />

            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              error="Email is required"
            />

            <TextInput label="Disabled" disabled value="Read only" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Buttons</Text>
            <View style={styles.buttonRow}>
              <Button
                label="Submit"
                onPress={() => setCount((c) => c + 1)}
              />
              <Button label="Secondary" variant="secondary" />
              <Button label="Ghost" variant="ghost" />
              <Button label="Disabled" disabled />
            </View>
            <Text style={styles.count}>Pressed {count} times</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B1220',
  },
  subtitle: {
    fontSize: 14,
    color: '#5B6472',
    lineHeight: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1220',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  count: {
    fontSize: 14,
    color: '#5B6472',
  },
});

export default App;
