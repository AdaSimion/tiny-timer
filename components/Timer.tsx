import Ionicons from '@expo/vector-icons/Ionicons';
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import formatTime from '../utils/formatTime';

type TimerInterface = {
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
};

const Timer: FunctionComponent<TimerInterface> = ({
  isRunning = false,
  setIsRunning
}) => {
  const [timerProgress, setTimerProgress] = useState<number>(0);

  const lastRecordedTimestamp = useRef<number>(new Date().getTime());
  const timerAnimationRef = useRef<number | null>(null);

  const animateOneSecondTimerProgress = useCallback(() => {
    const currentTimestamp = new Date().getTime();

    if (currentTimestamp - lastRecordedTimestamp.current >= 1000) {
      setTimerProgress((timerProgress) => timerProgress + 1);
      lastRecordedTimestamp.current = currentTimestamp;
    }

    // Recursive call to repeat the animation as the timer progresses:
    timerAnimationRef.current = requestAnimationFrame(
      animateOneSecondTimerProgress
    );
  }, [setTimerProgress, lastRecordedTimestamp, timerAnimationRef]);

  const clearTimerAnimation = useCallback(() => {
    if (timerAnimationRef.current !== null) {
      cancelAnimationFrame(timerAnimationRef.current);
      timerAnimationRef.current = null;
    }
  }, [timerAnimationRef.current]);

  useEffect(() => {
    if (!isRunning) {
      clearTimerAnimation();
      return;
    }

    timerAnimationRef.current = requestAnimationFrame(
      animateOneSecondTimerProgress
    );
  }, [isRunning]);

  const resetTimerProgress = useCallback(() => {
    clearTimerAnimation();
    setTimerProgress(0);
    setIsRunning(false);
  }, [setIsRunning, setTimerProgress]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timerProgress)}</Text>
      {timerProgress > 0 ? (
        <TouchableOpacity onPress={resetTimerProgress}>
          <Ionicons name="play-back" size={45} color="#a19f9c" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 130,
    alignItems: 'flex-end'
  },
  timerText: {
    fontSize: 45,
    fontWeight: '600',
    marginBottom: 16
  }
});

export default Timer;
