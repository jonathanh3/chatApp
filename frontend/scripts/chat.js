const socket = io();
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const usernameParagraph = document.querySelector('#username-paragraph');
const activeUsersList = document.querySelector('#active-users');
const navbarUser = document.getElementById('navbar-user');
const logoutButton = document.getElementById('logout-button');

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

function updateActiveUsersList(activeUsers) {
    const activeUsersList = document.getElementById('active-users');
    activeUsersList.innerHTML = ''; // Clear existing list

    activeUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user;
        activeUsersList.appendChild(listItem);
    });
}

function getMessageText(msgObj) {
    return `${msgObj.timestamp} - ${msgObj.username}: ${msgObj.message}`;
}

// Fetch the username from the server
fetch('/whoami')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.username) {
            navbarUser.textContent = `Logged in as: ${data.username}`;
        }
    })
    .catch(error => {
        console.error('Error fetching username:', error);
    });

// Event listener for message form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', message); // Send chat message to server
        messageInput.value = ''; // Clear message input field
    }
});

// Listen for chat messages
socket.on('chatMessage', (msgObj) => {
    const item = document.createElement('li');
    item.textContent = getMessageText(msgObj);
    messages.appendChild(item);
    scrollToBottom();
});

// Inside the 'socket.on('update user list', (userList) => {...})' event handler
socket.on('updateActiveUsers', (activeUsers) => {
    updateActiveUsersList(activeUsers);
});

// Listen for previousMessages
socket.on('previousMessages', (data) => {
    messages.innerHTML = '';

    data.forEach((msgObj) => {
        const listItem = document.createElement('li');
        const messageText = getMessageText(msgObj);
        listItem.textContent = messageText;
        messages.appendChild(listItem);
        scrollToBottom();
    });
});

// Logout button functionality
logoutButton.addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = '/login';
        }
    });
});
