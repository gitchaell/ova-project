function isCourseIdValid(id) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(id);
}
function CourseIdNotValidError(id) {
  return new Error(`Course ID ${id} is not valid`);
}

export { CourseIdNotValidError as C, isCourseIdValid as i };
