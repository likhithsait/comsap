import users from "@/data/users.json";
import { getCurrentUser } from "@/lib/auth";

export default function MessageList({ messages, onReply }) {
  const currentUser = getCurrentUser();

  // build lookup map for replies
  const messageMap = {};
  messages.forEach(m => {
    messageMap[m.id] = m;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map(msg => {
        const sender = users.find(u => u.id === msg.senderId);
        const repliedMessage = msg.replyTo
          ? messageMap[msg.replyTo]
          : null;

        const isMine = msg.senderId === currentUser.id;

        return (
          <div
            key={msg.id}
            id={msg.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xs">
              {repliedMessage && (
                <div className="mb-1 text-sm bg-gray-200 text-black border-l-2 border-gray-400 pl-2 rounded">
                  {repliedMessage.content}
                </div>
              )}

              <div
                className={`rounded-lg px-4 py-2
                  ${isMine
                    ? "bg-neutral-500 text-white"
                    : "bg-gray-300 text-black"
                  }`}
              >
                {!isMine && (
                  <div className="text-xs font-semibold mb-1">
                    {sender?.username || "Unknown"}
                  </div>
                )}

                <div>{msg.content}</div>

                <button
                  onClick={() => onReply(msg.id)}
                  className="mt-1 text-xs text-black/60 hover:underline"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
