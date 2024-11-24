function isUserIdValid(id) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(id);
}
function UserIdNotValidError(id) {
  return new Error(`User ID ${id} is not valid`);
}

export { UserIdNotValidError as U, isUserIdValid as i };
