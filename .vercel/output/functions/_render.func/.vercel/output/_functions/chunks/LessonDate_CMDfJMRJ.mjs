function isLessonDateValid(date) {
  return !!date;
}
function LessonDateNotValidError(date) {
  return new Error(`Date ${date} is not valid`);
}
const lessonDateFormatter = new Intl.DateTimeFormat("es", {
  month: "long",
  day: "numeric",
  weekday: "long",
  timeZone: "UTC"
});

export { LessonDateNotValidError as L, isLessonDateValid as i, lessonDateFormatter as l };
