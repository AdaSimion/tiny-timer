import formatTime from '../utils/formatTime';

test('Formats 15605 seconds to 04:20:05', () => {
  expect(formatTime(15605)).toBe('04:20:05');
});

test('Formats 7 seconds to 00:00:07', () => {
  expect(formatTime(7)).toBe('00:00:07');
});

test('Formats 123 seconds to 00:02:03', () => {
  expect(formatTime(123)).toBe('00:02:03');
});
