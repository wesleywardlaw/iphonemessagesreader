const Messages = require('./controllers/messages');

module.exports = function(app){
	app.get("/messages/:id/:date", Messages.fetchMessages);
}