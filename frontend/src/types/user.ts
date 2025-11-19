export interface User {
	id: number;
	username: string;
}

export function isUser(obj: any): obj is User {
	return (
		typeof obj === "object" &&
		obj !== null &&
		typeof obj.id === "number" &&
		typeof obj.username === "string"
	);
}

export default User;

