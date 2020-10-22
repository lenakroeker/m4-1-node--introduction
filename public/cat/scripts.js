
const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");


const handleFocus = () => {
    messageInput.focus();
}
const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    const message = { author: "user", text: messageInput.value };
    updateConversation(message);

    // this is a 'GET' call to the /cat-message endpoint in server.js
    fetch("/cat-message")
        .then((res) => res.json())
        .then((data) => {
            updateConversation(data.message);
        });
};

const updateConversation = (message) => {
    const { author, text } = message;
    const messageElem = document.createElement("p");
    messageElem.classList.add("message", author);
    messageElem.innerHTML = `<span>${text}</span>`;
    conversationElem.appendChild(messageElem);
    conversationElem.scrollTop = conversationElem.scrollHeight;
    console.log(message);
    if (author === "user") {
        messageInput.value = "";
    }
    handleFocus();
};

// focus on Input, must be at end of file
handleFocus();