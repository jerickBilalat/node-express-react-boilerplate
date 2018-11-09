const expect = require('chai').expect;
const request = require('supertest');
const {Event} = require("../events/model");
const mongoose = require("mongoose");
const User = require("../authetication/model");
const generateAuthToken = require("../authetication/utils").generateToken;

let server;

describe("/api/events", () => {

  beforeEach(() => { server = require('../server')});

  afterEach(async () => {
    server.close();
    await Event.remove({})
  })

  describe("POST /api/events", () => {

    let token,
        event;

    const execRequest = async () => {
      return await request(server)
        .post('/api/events')
        .set('authorization', token)
        .send(event);
    }

    beforeEach(() => {
      const user = new User();
      token = generateAuthToken(user);
      event = {"title":"created title", "body": "created body", "author": "auth user", "authorRole": "auth user role"};
    })


    it("should return 500 if any or more fields are invalid", (done) => {
      event = {};      
      execRequest()
        .then( res => { 
          expect(res.status).to.be.equal(500);
          expect(res.body).to.have.property('errorMessage');
          expect(res.body).to.have.property('error');
          done();
        })
        .catch( err => {
          console.error(err); 
          done(err);
        })
    })

    it("should save event", (done) => {      
      execRequest()
        .then( res => { 
          expect(res).to.not.be.null;
          done();
        })
        .catch( err => {
          console.error(err); 
          done(err);
        })
    })

    it("should return event", (done) => {      
      execRequest()
        .then( res => { 
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property('title', "created title");
          done();
        })
        .catch( err => {
          console.error(err); 
          done(err);
        })
    })

    

  });

  describe('GET /api/events', () => {
    let token,
        events;

    beforeEach(() => {
      const user = new User();
      token = generateAuthToken(user);
      events = [{
        "_id": "5bc92a48116a1a4c940d8d66",
        "title": "sdfsd update",
        "body": "fsdfsd",
        "author": "jerick bilalat",
        "authorRole": "developer",
        "__v": 0,
        "comments": [],
        "createdOn": "2018-10-19T14:48:50.169Z"
      },
      {
        "_id": "5bc944d8d0e23c4f406da196",
        "title": "csacas",
        "body": "dcasc",
        "author": "jerick bilalat",
        "authorRole": "developer",
        "__v": 1,
        "comments": [],
        "createdOn": "2018-10-19T02:43:36.199Z"
      }];
    })

    it('should return all events', async () => {
      
      await Event.collection.insertMany(events);

      const res = await request(server)
        .get('/api/events')
        .set('authorization', token );
      
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(res.body.some(event => event._id === '5bc92a48116a1a4c940d8d66')).to.be.true;
      expect(res.body.some(event => event._id === '5bc944d8d0e23c4f406da196')).to.be.true;

    });
  });

  // describe('PUT /:id', () => {
  //   let token; 
  //   let newName; 
  //   let event; 
  //   let id; 

  //   const exec = async () => {
  //     return await request(server)
  //       .put('/api/genres/' + id)
  //       .set('authorization', token)
  //       .send({ name: newName });
  //   }

  //   beforeEach(async () => {
  //     // Before each test we need to create a event and 
  //     // put it in the database.      
  //     event = new Genre({ name: 'genre1' });
  //     await event.save();
      
  //     token = new User().generateAuthToken();     
  //     id = event._id; 
  //     newName = 'updatedName'; 
  //   })

  //   it('should return 401 if client is not logged in', async () => {
  //     token = ''; 

  //     const res = await exec();

  //     expect(res.status).toBe(401);
  //   });

  //   it('should return 400 if event is less than 5 characters', async () => {
  //     newName = '1234'; 
      
  //     const res = await exec();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 400 if event is more than 50 characters', async () => {
  //     newName = new Array(52).join('a');

  //     const res = await exec();

  //     expect(res.status).toBe(400);
  //   });

  //   it('should return 404 if id is invalid', async () => {
  //     id = 1;

  //     const res = await exec();

  //     expect(res.status).toBe(404);
  //   });

  //   it('should return 404 if event with the given id was not found', async () => {
  //     id = mongoose.Types.ObjectId();

  //     const res = await exec();

  //     expect(res.status).toBe(404);
  //   });

  //   it('should update the event if input is valid', async () => {
  //     await exec();

  //     const updatedGenre = await Genre.findById(event._id);

  //     expect(updatedGenre.name).toBe(newName);
  //   });

  //   it('should return the updated event if it is valid', async () => {
  //     const res = await exec();

  //     expect(res.body).toHaveProperty('_id');
  //     expect(res.body).toHaveProperty('name', newName);
  //   });
  // });  

})

