import axios from 'axios';
import constants from '../globals/constants';


class Request {
    constructor(request_id, author_id, author_name, deadline, delivery_date, expiration_date, title, comment, hidden, state, list) {
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
}



export default Request;