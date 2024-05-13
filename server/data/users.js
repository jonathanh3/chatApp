const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

const activeUsers = []

function addActiveUser(user) {
  activeUsers.push(user);
}

function removeActiveUser(user) {
  activeUsers = activeUsers.filter(u => u !== user);
}

function getActiveUsers() {
  return activeUsers.map(user => user.username);

}
  
module.exports = { users, addActiveUser, removeActiveUser, getActiveUsers };
