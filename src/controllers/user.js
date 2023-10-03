const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    //check if user already exists
    db.hgetall(user.username, function (err, res) {
      if (err) return callback(err, null)

      //if user don't exist
      if (!res) {
        // Save to DB
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      } else {
        callback(new Error("User exists"), null)
      }
    })

  },
  get: (username, callback) => {
    if (!username) {
      return callback(new Error("Username not provided"), null)
    }

    db.hgetall(username, function (err, res) {
      if (err) return callback(err, null)

      //if the users exists
      if (res) {
        callback(null, res)
      } else {
        callback(new Error("User not found"), null)
      }
    })
  }
}
