import { USER_NAME } from "../constants";

export function logUser(name) {
	return {
		type: USER_NAME,
		payload: name,
	};
}
