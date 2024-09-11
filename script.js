// script.js

// Author: Cade Beckers
// Written: 09/11/2024
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');
const sendBtn = document.getElementById('send-btn');

// func to send message to chatgpt
function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // display message and get response
    displayMessage(userMessage, 'user-message', 'User');
    callChatGPTAPI(userMessage);

    // clear inputs after sent
    chatInput.value = '';
}

// func to push and display chats
function displayMessage(message, className, username = 'ChatGPT') {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', className === 'user-message' ? 'user' : 'bot');

    // profile pictures
    const avatar = document.createElement('img');
    avatar.src = className === 'user-message' ? 'user-avatar.png' : 'chatgpt-avatar.png';
    avatar.classList.add('avatar');

    // message bubbles and formatting
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', className);

    const formattedMessage = `<strong>${username}</strong> <br> ${message}`;
    messageDiv.innerHTML = formattedMessage;

    // add profile pic to the message
    messageContainer.appendChild(avatar);
    messageContainer.appendChild(messageDiv);

    // push to chat window
    chatWindow.appendChild(messageContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// func to call chatgpt
function callChatGPTAPI(userMessage) {
    // insert your api key
    const apiKey = '';

    // send message to chatgpt
    axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
    // chatgpt response
    .then(response => {
        const botReply = response.data.choices[0].message.content;
        displayMessage(botReply, 'bot-message');
    })
    .catch(error => {
        console.error('Error calling OpenAI API:', error);
        displayMessage('Sorry, there was an error getting a response.', 'bot-message');
    });
}

// listener for send button
sendBtn.addEventListener('click', sendMessage);

// send message with enter
chatInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});
