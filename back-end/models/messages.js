const moment = require('moment');

function formatMessage(username, text, room) {
  return {
    sender: username,
    message: text,
    timestamps: moment().format(' h:mm  a'),
    room
  };
}

module.exports = formatMessage;
