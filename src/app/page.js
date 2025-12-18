"use client";

import { useState } from "react";
import { getChatSidebarData } from "@/lib/sidebar";
import { getMessagesForGroup } from "@/lib/messages";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import { getCurrentUser } from "@/lib/auth";

export default function Page() {
  const sidebar = getChatSidebarData();

  const [activeGroupId, setActiveGroupId] = useState(
    sidebar[0]?.groupId || null
  );
  function handleSend() {
  if (!input.trim() || !activeGroupId) return;

  const newMessage = {
    id: "local-" + Date.now(),
    groupId: activeGroupId,
    senderId: currentUser.id,
    content: input,
    replyTo: replyTo, // 🔑 attach reply
    isDeleted: false,
    createdAt: Date.now()
  };

  setLocalMessages(prev => [...prev, newMessage]);
  setInput("");
  setReplyTo(null); // 🔑 reset reply
}


  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const [localMessages, setLocalMessages] = useState([]);

  const currentUser = getCurrentUser();

  // combine JSON messages + locally sent messages
  const messages = [
    ...getMessagesForGroup(activeGroupId),
    ...localMessages.filter(m => m.groupId === activeGroupId)
  ];

  function handleSend() {
    if (!input.trim() || !activeGroupId) return;

    const newMessage = {
      id: "local-" + Date.now(),
      groupId: activeGroupId,
      senderId: currentUser.id,
      content: input,
      isDeleted: false,
      createdAt: Date.now()
    };

    setLocalMessages(prev => [...prev, newMessage]);
    setInput("");
  }
  const messageMap = {};
messages.forEach(m => {
  messageMap[m.id] = m;
});


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-white text-black">
        <div className="p-4 font-bold text-lg border-b">Chats</div>

        {sidebar.map(chat => (
          <div
            key={chat.groupId}
            onClick={() => setActiveGroupId(chat.groupId)}
            className={`p-3 cursor-pointer border-b hover:bg-gray-100
              ${activeGroupId === chat.groupId ? "bg-gray-200" : ""}`}
          >
            <div className="font-medium">{chat.name}</div>
            <div className="text-sm text-gray-500 truncate">
              {chat.lastMessage}
            </div>
          </div>
        ))}
      </aside>

      {/* Chat Panel */}
      <main className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b font-semibold text-black">
          {activeGroupId || "None"}
        </div>

        <MessageList messages={messages} 
         onReply={setReplyTo}/>

        <MessageInput
  value={input}
  onChange={setInput}
  onSend={handleSend}
  replyToMessage={replyTo ? messageMap[replyTo] : null}
  onCancelReply={() => setReplyTo(null)}
/>

      </main>
    </div>
  );
}
