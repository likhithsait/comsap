import groups from "@/data/groups.json";
import messages from "@/data/messages.json";
import { getCurrentUser } from "./auth";


function isUserInGroup(group, userId) {
  return group.members.some(m => m.userId === userId);
}


function getLastMessage(groupId) {
  return messages
    .filter(m => m.groupId === groupId && !m.isDeleted)
    .sort((a, b) => b.createdAt - a.createdAt)[0];
}


export function getChatSidebarData() {
  const user = getCurrentUser();
  if (!user) return [];

  return groups
   
    .filter(group => isUserInGroup(group, user.id))
   
    .map(group => {
      const lastMessage = getLastMessage(group.id);

      return {
        groupId: group.id,
        name: group.name,
        lastMessage: lastMessage ? lastMessage.content : "",
        lastMessageTime: lastMessage ? lastMessage.createdAt : 0
      };
    })
    .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
}
