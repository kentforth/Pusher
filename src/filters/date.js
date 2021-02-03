export default value => {
  const date = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });
};
