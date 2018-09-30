const mongoose = require('mongoose');
const Event = mongoose.model('Event');

 function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
  };

module.exports = (app) => {

    app.get('/api/events', (req, res, next) => {
      Event
        .find({})
        .exec((err, events) => {
            if(err) next(err);
            res.send(events);
        });
    });

    app.post('/api/events', (req, res, next) => {
        const { title, body, author, authorRole} = req.body;
        const event = new Event({
            title,
            body,
            author,
            authorRole
        });
        
        event
            .save()
            .then(() => {
                res.send({"message": "post success"});
            })
            .catch((err) => {
                next(err);
            });
    })
    app.delete('/api/events/:id', (req, res, next) => {
        const eventId = req.params.id;
        if(eventId){
            Event
                .findByIdAndRemove(eventId)
                .exec((err, event) => {
                    if(err) next(err);
                    res.send({message: "event deleleted"})
                }) 
        }
        
    })
    app.put('/api/events/:id', (req, res, next) => {
        const eventId = req.params.id;
        const {title, body, author, authorRole} = req.body;
        console.log(title, body, author, authorRole);
        Event
            .findByIdAndUpdate(eventId)
            .exec((err, event) => {
                if(!event) {
                    sendJSONresponse(res, 404, {"message": "Event not found"})
                    return;
                }else if(err) {
                    return next(err);
                }

                event.title = title;
                event.body= body;
                event.author= author;
                event.authorRole = authorRole;

                event.save((err, event) => {
                    if(err) {
                        console.log(err);
                        next(err);
                    }else {
                        sendJSONresponse(res, 200, event);
                    }
                })

            })
    })
}