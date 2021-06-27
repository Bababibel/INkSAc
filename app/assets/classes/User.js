import axios from "axios"
import constants from "../globals/constants"

class User {
    constructor(id, email, first_name, last_name, role, creation_date, last_login_date, location, lists) {
        this.id = id
        this.email = email
        this.first_name = first_name
        this.last_name = last_name
        this.role = role
        this.creation_date = creation_date
        this.last_login_date = last_login_date
        this.location = location
        this.lists = lists
    }

    updateInDb() {
        let formData = new FormData();
        formData.append('id', this.id);
        formData.append('email', this.email);
        formData.append('first_name', this.first_name);
        formData.append('last_name', this.last_name);
        formData.append('role', this.role);
        formData.append('location', this.location);
        axios.post(constants.updateUser, formData)
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

    deleteInDb() {
        axios.get(constants.deleteUser, { params: { 'id': this.id }})
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

    removeFromList(list_id, list_name) {
        this.lists.splice(list_name, 1);
        let formData = new FormData();
        formData.append('list_id', list_id);
        formData.append('user_id', this.id);
        axios.post(constants.removeUserFromList, formData)
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

    addToList(list_id, list_name) {
        if (!this.lists.includes(list_name)) this.lists.push(list_name);
        let formData = new FormData();
        formData.append('list_id', list_id);
        formData.append('user_id', this.id);
        axios.post(constants.addUserToList, formData)
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

    // really dangerous
    reloadFromDb() {
        axios.get(constants.getUser, { params: { 'id': this.id }})
        .then(response => {
            if (response.data) { // server answered
                if ('data' in response.data) { // there is data to collect
                    let u = response.data.data; // first object in the data array
                    this.id = u.id;
                    this.email = u.email;
                    this.first_name = u.first_name;
                    this.last_name = u.last_name;
                    this.role = u.role;
                    this.creation_date = u.creation_date;
                    this.last_login_date = u.last_login_date;
                    this.location = u.location;
                    this.list_names = u.list_names;
                }
                else if ('message' in response.data) { // no data but error message
                    console.log("Erreur. Réponse du serveur: "+response.data.message);
                }
                else console.log("Le serveur a renvoyé une réponse inhabituelle");
            }
            else console.log("Le serveur distant ne répond pas");
        })
    }
}

export default User;