const io = require("socket.io")(5000)

io.on("connection", (socket) => {
  const id = socket.handshake.query.id
  // constant id
  socket.join(id)
  // we are creating new socket IDs instead using the
  // static ID

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      // we will remove each recipient from his list
      // of recipients.
      const newRecipients = recipients.filter((r) => r !== recipient)
      newRecipients.push(id)

      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      })
    })
  })
})
