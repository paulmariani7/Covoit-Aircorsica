let users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room }
  users.push(user)
  return user
}
// Update user settings
function updateUser(user){
  try{ users[users.findIndex(u => u.id === user.id)] = user }catch(err) {console.log(err)}
}
// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id)
}

function getUserByName(name) {
  return users.find(a=>a.username === name)
}

// User leaves chat
function userLeave(id) {
  let user = users.find(a=>a.id ===id)
  const index = users.findIndex(user => user.id === id)
  if (user) {
    users = users.filter(a=>a.id === id)
  }
  return user
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room)
}

function getRooms(str = ".") {
  return users.reduce((a,b)=>{
    if(!a.includes(b.room) && new RegExp("^"+str).test(b.room.toString()))
      a.push(b.room)
    return a
  },[])
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  updateUser,
  getRooms,
  getUserByName
}
