import messages from "@/data/messages.json";

export function getMessagesForGroup(groupId) {
  if (!groupId) return [];

  return messages
    .filter(m => m.groupId === groupId && !m.isDeleted)
    .sort((a, b) => a.createdAt - b.createdAt);
}
