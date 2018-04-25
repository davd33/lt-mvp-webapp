//Install express server
const express = require('express')
const app = express()

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'))

app.get('*', function(req, res) {
  res.sendfile(__dirname + '/dist/index.html')
})

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080
app.listen(port)

console.log(`Listening on ${port}`)
