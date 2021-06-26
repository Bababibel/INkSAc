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
                return lists;
            }
            else {
                console.log('Error in getting all lists from database: '+response.data.message);
            }
        });
    }

    static getList = async (id) => {
        axios.get(constants.getList, { params: { 'id': id }})
        .then(response => {
            if ('data' in response.data) {
                let e = response.data.data;
                let list = new List(e.id, e.name, e.theorical_count, e.creation_date, e.location);
                return list;
            }
            else {
                console.log('Error in getting all lists from database: '+response.data.message);
            }
        });
    }

    updateInDb() {
        let formData = new FormData();
        formData.append('id', this.id);
        formData.append('new_name', this.name);
        formData.append('th_count', this.theoricalCount);
        formData.append('location', this.location)
        console.log(...formData);
        axios.post(constants.updateList, formData)
        .then(response => {
            if ('message' in response.data) { 
                console.log("From List class: "+response.data.message)
                return true;
            }
            else {
                console.log("From List class: ERROR NO ANSWER");
                console.log(response);
                return false;
            }
        })
    }

    deleteInDb() {
        axios.get(constants.deleteList, { params: { 'id': this.id }})
        .then(response => {
            if ('message' in response.data) { 
                console.log("From User class: "+response.data.message)
                return true;
            }
            else {
                console.log("From User class: ERROR NO ANSWER");
                console.log(response);
                return false;
            }
        })
    }
    
}

export default List;