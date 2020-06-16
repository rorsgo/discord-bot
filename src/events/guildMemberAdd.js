const newUsers = require("../index");

module.exports = (client, member) => {
  newUsers.set(member.id, member.user);
  member.send("Test")
  console.log(newUsers)
}