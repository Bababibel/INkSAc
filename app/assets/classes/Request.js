import axios from 'axios';
import constants from '../globals/constants';


class Request {
    constructor(request_id, author_id, author_name, deadline, delivery_date, expiration_date, title, comment, hidden, state, list) {
        console.log("Recut dans requete" + author_id)
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
        this.list = list
        this.files = null
    }

    attachFile(file) {
        file.request_id = this.request_id
        this.files = file
    }

    deleteInDb() {
        axios.get(constants.deleteRequest, { params: { 'id' : this.request_id }})
        .then(response => {
            if ('message' in response.data) { 
                console.log("From Request class: "+response.data.message)
                return true;
            }
            else {
                console.log("From User class: ERROR NO ANSWER");
                console.log(response);
                return false;
            }
        })
    }

    updateInDb(state) {
        console.log("auteur id "+this.author_id)
        let formData = new FormData();
        formData.append('id', this.request_id);
        formData.append('author', this.author_id);
        formData.append('deadline', this.deadline);
        formData.append('delivery_date', this.delivery_date);
        formData.append('title', this.title);
        formData.append('comment', this.comment);
        formData.append('hidden', this.hidden);
        formData.append('state', state);
        axios.post(constants.updateRequest, formData)
        .then(response => {
            if ('message' in response.data) { 
                console.log("From Request class: "+response.data.message)
                return true;
            }
            else {
                console.log("From List class: ERROR NO ANSWER");
                console.log(response);
                return false;
            }
        })
    }
}



export default Request;