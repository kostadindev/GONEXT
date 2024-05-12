

export function formatGameDurationFromMs(seconds: number) {
  const hours = Math.floor(seconds / 3600); // 3600 seconds in an hour
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Construct the formatted string conditionally to include hours if needed
  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  formattedDuration += `${minutes}m ${remainingSeconds}s`;

  return formattedDuration;
}