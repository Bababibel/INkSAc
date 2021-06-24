import axios from 'axios';
import constants from '../globals/constants';


class List {
    constructor(id, name, theoricalCount, creationDate, location) {
        this.key = id; // Prepare for arrays (need a unique key, reusing id)
        this.id = parseInt(id); // Ex: 6
        this.name = name; // Ex: '3A'
        this.theoricalCount = parseInt(theoricalCount); // Ex: 84
        this.creationDate = creationDate; // Ex: ""
        this.location = location; // Ex: "Blois" ou "Bourges"
    }

    static getAllLists = async  () => {
        axios.get(constants.getAllLists)
        .then(response => {
            let lists = [];
            if ('data' in response.data) {
                let data = response.data.data;
                data.forEach(e => {
                    lists.push(new List(e.id, e.name, e.theorical_count, e.creation_date, e.location));
                });
            }
            else {
                console.log('Error in getting all lists from database: '+response.data.message);
            }
        });
    }

    static getList = async (id) => {
        axios.get(constants.getList, { params: { 'id': id }})
        .then(response => {
            let list = [];
            if ('data' in response.data) {
                let e = response.data.data;
                let list = new List(e.id, e.name, e.theorical_count, e.creation_date, e.location);
            }
            else {
                console.log('Error in getting all lists from database: '+response.data.message);
            }
        });
    }
    static ntm = async () => {
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                this.sendToList = [];
                let data = response.data.data;
                data.forEach(e => {
                    this.sendToList.push(new List(e.id, e.name, e.theorical_count, e.creation_date, e.location));
                });
                console.log(this.sendToList);
                return this.sendToList
            }
            else {
                this.sentToList = null;
                console.log('Error in getting all lists from database: '+response.data.message);
            }
        })
    }
}

export default List;