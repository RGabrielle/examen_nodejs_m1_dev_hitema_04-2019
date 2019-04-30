const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        const index = this.peoples.findIndex(myPeople => myPeople.id == id);
        console.log(index);
        if(index > 0){
            this.peoples[index] = people.name;
        }
    }
    
    getPeople(filters) {
       return this.peoples;
    }
}
