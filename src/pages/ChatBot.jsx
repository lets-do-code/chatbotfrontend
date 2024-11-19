import React, { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input) return;
        const newMessages = [...messages, { user: "You", text: input }];
        setMessages(newMessages);

        const response = await fetch("http://127.0.0.1:5000/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });
        const data = await response.json();

        setMessages([...newMessages, { user: "Bot", text: data.message }]);
        setInput("");
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-md flex flex-col border">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">Hotel Chatbot</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div
                    className={`inline-block px-4 py-2 rounded-md bg-blue-100 text-blue-700 "
                        }`}
                >
                    <strong className="bg-blue-100 text-blue-700">Bot: </strong>Hello
                </div>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${msg.user === "Bot" ? "text-left" : "text-right"
                            }`}
                    >
                        <div
                            className={`inline-block px-4 py-2 rounded-md ${msg.user === "Bot"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                                }`}
                        >
                            <strong>{msg.user}: </strong>{msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-200 flex items-center p-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
