import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import formatTime from '../utils/formatTime';

type TimerInterface = {
  isRunning: boolean;
};

const Timer: FunctionComponent<TimerInterface> = ({ isRunning = false }) => {
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

  useEffect(() => {
    if (!isRunning) {
      if (timerAnimationRef.current !== null) {
        cancelAnimationFrame(timerAnimationRef.current);
        timerAnimationRef.current = null;
      }

      return;
    }

    timerAnimationRef.current = requestAnimationFrame(
      animateOneSecondTimerProgress
    );
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timerProgress)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24
  },
  timerText: {
    fontSize: 25,
    fontWeight: '500'
  }
});

export default Timer;
