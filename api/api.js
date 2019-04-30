const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const v1 = express.Router();

const { digestAuth } = require('../basic-auth/basic-auth');
const PeopleService = require('./people-service');
const peopleService = new PeopleService();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

app.get('/api/v1/people', async (request, response) => {
    const data = await peopleService.getPeople();
    response.send(data);
});


app.get('/api/v1/people/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const people = await peopleService.getPeople(id);
        people ? response.send(people) : response.sendStatus(404);
    } catch (error) {
        response.sendStatus(404).end(error);
    }
});

app.post('/api/v1/people', digestAuth, async (request, response) => {
    const people = request.body;
    try {
        const result = await peopleService.insertPeople(people);
        response.send(result);
    } catch (error) {
        console.log('error occurs: ', error);
        response.sendStatus(404).end(error);
    }
});

module.exports = app;
