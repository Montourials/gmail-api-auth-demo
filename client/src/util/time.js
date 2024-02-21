export function msToTime(ms) {
  return new Date(ms).toLocaleString();
}

export function msToHours(ms) {
  return Math.floor(ms / 3600000);
}

export function msToMinutes(ms) {
  return Math.floor(ms / 60000);
}

export function msToSeconds(ms) {
  return Math.floor(ms / 1000);
}

export function secondsToMs(s) {
  return Math.floor(s * 1000);
}

export function secondsToMin(s) {
  return Math.floor(s / 60);
}

export function secondsToHours(s) {
  return Math.floor(s / 3600);
}

export function minutesToMs(min) {
  return Math.floor(min * 60000);
}

export function minutesToSeconds(min) {
  return Math.floor(min * 60);
}

export function minutesToHours(min) {
  return Math.floor(min / 60);
}

export default {
  msToTime,

  msToHours,
  msToMinutes,
  msToSeconds,
  secondsToMs,
  secondsToMin,
  secondsToHours,
  minutesToMs,
  minutesToSeconds,
  minutesToHours,
};
