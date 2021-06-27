import axios from 'axios';
import constants from '../globals/constants';


class Request {
    constructor(request_id, author_id, author_name, deadline, delivery_date, expiration_date, title, comment, hidden, state) {
        this.request_id = request_id
        this.author_id = author_id
        this.author_name = author_name
        this.deadline = deadline
        this.delivery_date = delivery_date
        this.expiration_date = expiration_date
        this.title = title
        this.comment = comment
        this.hidden = hidden
        this.state = state
        this.files = File
    }

    attachFile(file) {
        file.request_id = this.request_id
        this.files = file
    }

    deleteInDb() {
        axios.get(constants.deleteRequest, { params: { 'id': this.request_id }})
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



export default Request;