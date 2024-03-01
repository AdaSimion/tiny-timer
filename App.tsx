import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Timer from './components/Timer';

export default function App() {
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const toggleStartPause = useCallback(() => {
    setIsTimerRunning((previousState) => !previousState);
  }, [setIsTimerRunning]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Timer isRunning={isTimerRunning} setIsRunning={setIsTimerRunning} />
      <TouchableOpacity onPress={toggleStartPause} style={styles.startButton}>
        <Ionicons
          name={isTimerRunning ? 'pause-circle' : 'play-circle'}
          size={120}
          color="#e8c410"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 160
  },
  startButton: {
    marginTop: 64
  }
});
