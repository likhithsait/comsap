import users from "@/data/users.json";


let currentUserId = "u1";

export function getCurrentUser() {
  return users.find(user => user.id === currentUserId) || null;
}

export function setCurrentUser(userId) {
  currentUserId = userId;
}
