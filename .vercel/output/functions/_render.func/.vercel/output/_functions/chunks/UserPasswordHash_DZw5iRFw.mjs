const USER_PASSWORD_MAX_LENGTH = 100;
const USER_PASSWORD_MIN_LENGTH = 8;
function isUserPasswordHashValid(passwordHash) {
  return !!passwordHash;
}
function UserPasswordHashNotValidError(passwordHash) {
  return new Error(`Password hash ${passwordHash} not found`);
}

export { USER_PASSWORD_MIN_LENGTH as U, USER_PASSWORD_MAX_LENGTH as a, UserPasswordHashNotValidError as b, isUserPasswordHashValid as i };
