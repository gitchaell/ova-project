// NOTE:
// Returning immediately allows malicious actors to figure out valid usernames from response times,
// allowing them to only focus on guessing passwords in brute-force attacks.
// As a preventive measure, you may want to hash passwords even for invalid usernames.
// However, valid usernames can be already be revealed with the signup page among other methods.
// It will also be much more resource intensive.
// Since protecting against this is non-trivial,
// it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
// If usernames are public, you can outright tell the user that the username is invalid.

export class UserCredentialsNotValidException extends Error {
	constructor() {
		super('Credenciales no válidas')
	}
}
