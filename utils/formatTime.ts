const ensureTwoDigitFormat: (digits: number) => string = function (
  digits: number
) {
  return ('0' + Math.floor(digits)).slice(-2);
};

/*
    Formats a number of seconds to the time format HH:MM:SS.
*/
const formatTime: (secondsToFormat: number) => string = function (
  secondsToFormat: number
) {
  const hours = Math.floor(secondsToFormat / 3600);
  const minutes = Math.floor((secondsToFormat % 3600) / 60);
  const seconds = secondsToFormat % 60;

  return `${
    hours <= 99 ? ensureTwoDigitFormat(hours) : hours
  }:${ensureTwoDigitFormat(minutes)}:${ensureTwoDigitFormat(seconds)}`;
};

export default formatTime;
