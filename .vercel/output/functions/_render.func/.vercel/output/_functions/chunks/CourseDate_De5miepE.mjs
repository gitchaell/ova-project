function isCourseDateValid(date) {
  return !!date;
}
function CourseDateNotValidError(date) {
  return new Error(`Date ${date} is required`);
}
const courseDateFormatter = new Intl.DateTimeFormat("es", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC"
});

export { CourseDateNotValidError as C, courseDateFormatter as c, isCourseDateValid as i };
