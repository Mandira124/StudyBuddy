import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";

interface ChatInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileInputClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  handleSendMessage,
  handleMessageChange,
  handleFileChange,
  fileInputRef,
  handleFileInputClick,
}) => {
  const handleSendButtonClick = () => {
    handleSendMessage();
    setTimeout(adjustTextareaHeight, 0);
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById(
      "chat-textarea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <div className="flex items-center p-4 bg-white border-t border-gray-400 max-w-4xl">
      <textarea
        id="chat-textarea"
        rows={1}
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none resize-none"
        style={{ minHeight: "38px", maxHeight: "80px" }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="text-green-800 px-4 py-2 rounded-lg"
        onClick={handleFileInputClick}
      >
        <FontAwesomeIcon icon={faPaperclip} />
      </button>
      <button
        className="text-green-800 px-4 py-2 rounded-lg ml-2"
        onClick={handleSendButtonClick}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default ChatInput;
