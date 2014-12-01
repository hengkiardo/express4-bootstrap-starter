module.exports = function (app, mongoose) {

  var connect = function () {
    var options = {
      server: {
        socketOptions: { keepAlive: 1 }
      },
      auto_reconnect:true
    }
    mongoose.connect(app.config.database.url, options)
  }
  connect()

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err)
  })

  // Reconnect when closed
  mongoose.connection.on('disconnected', function () {
    connect()
  })

}
