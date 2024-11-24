const USER_NAMES_MIN_LENGTH = 5;
const USER_NAMES_MAX_LENGTH = 200;
function isUserNamesValid(names) {
  return names.length >= USER_NAMES_MIN_LENGTH && names.length <= USER_NAMES_MAX_LENGTH;
}
function UserNamesNotValidError(names) {
  return new Error(
    `Names ${names} must be between ${USER_NAMES_MIN_LENGTH} and ${USER_NAMES_MAX_LENGTH} characters`
  );
}

export { USER_NAMES_MIN_LENGTH as U, USER_NAMES_MAX_LENGTH as a, UserNamesNotValidError as b, isUserNamesValid as i };
