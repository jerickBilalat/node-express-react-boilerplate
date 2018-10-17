const mongoose = require('mongoose');
const Event = mongoose.model('Event');

 function sendJSONresponse(res, status, content) {
	 	res.status(status);
		res.json(content);
	};

	function asyncWrapper(fn) {
		return function(req, res, next) {
			fn(req, res, next).catch( err => next(err));
		}
	}

module.exports = (app) => {

		app.get('/api/events', (req, res, next) => {
			Event
				.find({})
				.exec((err, events) => {
					if(err) return next(err);
					if(!events.length) return sendJSONresponse(res, 204, { "errorMessage": "No events found" });
					return sendJSONresponse(res, 200, events);
				})
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
		
		app.put('/api/events/:id', (req, res, next) => {
				const eventId = req.params.id;
				const {title, body, author, authorRole} = req.body;
				const createdOn = Date.now();
				Event.findByIdAndUpdate(eventId, {$set:{title, body, author, authorRole, createdOn }}, {runValidators: true, new: true})
				.exec((err, event) => {
					if(err) return next(err);
					res.send(event);
				})
				// const event = await Event.findByIdAndUpdate(eventId, {title, body, author, authorRole, createdOn }, {runValidators: true});
				// console.log(event);
				// res.send(event);
		})
}