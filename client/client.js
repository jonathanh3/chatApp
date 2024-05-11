const socket = io();
const usernameForm = document.querySelector('#username-form');
const messageForm = document.querySelector('#message-form');
const usernameInput = document.querySelector('#username-input');
const messageInput = document.querySelector('#m');
const messages = document.querySelector('#messages');
const usernameParagraph = document.querySelector('#username-paragraph');
const usersList = document.querySelector('#active-users');
let activeUsers = [];

// Disable message input and send button initially
messageInput.disabled = true;
messageForm.querySelector('button').disabled = true;

// Function to render the user list in the UI
function renderUserList() {
    // Clear the existing user list
    usersList.innerHTML = '';
    // Add each user to the list
    activeUsers.forEach(username => {
        const listItem = document.createElement('li');
        listItem.textContent = username;
        usersList.appendChild(listItem);
    });
}

function getMessageText(msgObj) {
    return `${msgObj.timestamp} - ${msgObj.username}: ${msgObj.message}`;
}

// Event listener for username form submission
usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        socket.emit('username', username); // Send chosen username to server
    }
});

// Event listener for message form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message); // Send chat message to server
        messageInput.value = ''; // Clear message input field
    }
});

// Listen for chat messages
socket.on('chat message', (msgObj) => {
    const item = document.createElement('li');
    item.textContent = getMessageText(msgObj);
    messages.appendChild(item);
});

// Username accepted by server
socket.on('usernameAccepted', (username) => {
    console.log(`Username accepted: ${username}`);
    usernameParagraph.textContent = `Your username: ${username}`
    usernameForm.style.display = 'none'; // Hide username form
    messageInput.disabled = false;
    messageForm.querySelector('button').disabled = false;
    messageForm.style.display = 'block'; // Show message form
    messageInput.focus(); // Focus on message input field

    const errorContainer = document.querySelector('#username-error');
    errorContainer.textContent = ''; // Clear error message
    errorContainer.style.display = 'none'; // Hide the error container
});

// Username error from server
socket.on('usernameError', (errorMessage) => {
    console.error(`Username error: ${errorMessage}`);
    // Display error message in the UI
    const errorContainer = document.querySelector('#username-error');
    errorContainer.textContent = errorMessage;
    // Clear the username input field
    usernameInput.value = '';
    // Show the username form to allow user to try again
    usernameForm.style.display = 'block';
});

// Inside the 'socket.on('update user list', (userList) => {...})' event handler
socket.on('update user list', (userList) => {
    activeUsers = userList;
    renderUserList();
});

socket.on('load messages', (data) => {
    messages.innerHTML = ''; 

    data.forEach((msgObj) =>{
        const listItem = document.createElement('li');
        const messageText = getMessageText(msgObj)
        listItem.textContent = messageText;
        messages.appendChild(listItem);
    })
});
