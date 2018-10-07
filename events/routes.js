const mongoose = require('mongoose');
const Event = mongoose.model('Event');

 function sendJSONresponse(res, status, content) {
		res.status(status);
		res.json(content);
	};

module.exports = (app) => {

		app.get('/api/events', async (req, res, next) => {
			const event = await Event.find({});
				res.send(event);
		});

		app.post('/api/events', (req, res, next) => {
			const { title, body, author, authorRole} = req.body;
			Event
				.create({
					title,
					body,
					author,
					authorRole
				})
				.then( event => res.send(event))
				.catch( err => next(err));

		})
		
		app.delete('/api/events/:id', (req, res, next) => {
			const eventId = req.params.id;
			if(eventId){
				Event
						.findByIdAndRemove(eventId)
						.exec((err, event) => {
								if(err) next(err);
								res.send(event);
						}) 
			}
		})
		
		app.put('/api/events/:id', async (req, res, next) => {
			const eventId = req.params.id;
			const {title, body, author, authorRole} = req.body;
			const createdOn = Date.now();
			const event = await Event.findByIdAndUpdate(eventId, {title, body, author, authorRole, createdOn }, {runValidators: true});
			res.send(event);
		})
}