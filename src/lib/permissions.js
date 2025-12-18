import rolePermissions from "@/data/rolePermissions.json";
import { getCurrentUser } from "./auth";

export function canPerform(action) {
  const user = getCurrentUser();
  if (!user) return false;

  return rolePermissions[user.role]?.[action] === true;
}
