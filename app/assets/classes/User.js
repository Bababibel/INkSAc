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
            if ('message' in response.data) console.log("From User class: "+response.data.message)
            else {
                console.log("From User class: ERROR NO ANSWER");
                console.log(response);
            }
        })
    }
}

export default User;