const mongoose = require('mongoose');
const Event = mongoose.model('Event');

 function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
  };

module.exports = (app) => {
    app.get('/api/events', (req, res) => {
      Event.find({}).exec((err, events) => {
            if(err) res.send(err);
            res.send(events);
        });
    })
    app.post('/api/events', (req, res) => {
        // const { title, body, author} = req.body;
        const event = new Event({
            title: "game day",
            body: "you are all invited for game day sunday",
            author: "Jerick Bilalat"
        });
        event.save();

        res.send({"message": "post success"});
    })
    app.delete('/api/events/:id', (req, res) => {
        const eventId = req.params.id;
        if(eventId){
            Event
                .findByIdAndRemove(eventId)
                .exec((err, event) => {
                    if(err) res.send(err);
                    res.send({message: "event deleleted"})
                }) 
        }
        
    })
    app.put('/api/events/:id', (req, res) => {
        const eventId = req.params.id;  
        Event
            .findByIdAndUpdate(eventId)
            .exec((err, event) => {
                if(!event) {
                    sendJSONresponse(res, 404, {"message": "Event Id not found"})
                    return;
                }else if(err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }

                event.title = "Updated game day";
                event.body= "Updated body";
                event.author= "update Author";

                event.save((err, event) => {
                    if(err) {
                        sendJSONresponse(res, 404, err);
                    }else {
                        sendJSONresponse(res, 200, event);
                    }
                })

            })
    })
}