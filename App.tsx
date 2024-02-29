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
      <Timer isRunning={isTimerRunning} />
      <TouchableOpacity onPress={toggleStartPause}>
        <Ionicons
          name={isTimerRunning ? 'pause-circle' : 'play-circle'}
          size={80}
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
    justifyContent: 'center'
  }
});
