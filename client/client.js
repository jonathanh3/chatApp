const socket = io();
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#m');
const messages = document.querySelector('#messages');
const usernameParagraph = document.querySelector('#username-paragraph');
const activeUsersList = document.querySelector('#active-users');

function updateActiveUsersList(activeUsers) {
    const activeUsersList = document.getElementById('active-users');
    activeUsersList.innerHTML = ''; // Clear existing list

    activeUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user
        activeUsersList.appendChild(listItem);
    });
}

function getMessageText(msgObj) {
    return `${msgObj.timestamp} - ${msgObj.username}: ${msgObj.message}`;
}

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

// Inside the 'socket.on('update user list', (userList) => {...})' event handler
socket.on('updateActiveUsers', (activeUsers) => {
    updateActiveUsersList(activeUsers);
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
