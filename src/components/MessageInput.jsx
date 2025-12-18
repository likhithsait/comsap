export default function MessageInput({
  value = "",
  onChange,
  onSend,
  replyToMessage,
  onCancelReply
}) {
  const safeValue = value ?? "";

  return (
    <div className="p-4 border-t border-black bg-white">
     
      {replyToMessage && (
        <div className="mb-2 p-2 bg-black text-sm text-gray-300 rounded flex justify-between items-center">
          <span className="truncate">
            Replying to: {replyToMessage.content}
          </span>
          <button
            onClick={onCancelReply}
            className="ml-2 text-red-400"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={safeValue}
          onChange={e => onChange(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-neutral-200 text-black border  rounded px-3 py-2 outline-0"
        />

        <button
          onClick={onSend}
          disabled={!safeValue.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
