import axios from 'axios';
import constants from '../globals/constants';

class Request {
    constructor(expirationDate, lists, documents) {
        this.expirationDate = expirationDate;
        this.lists = lists; // Ex: ['3A', 'STI'] for 3ASTI
        this.documents = documents; // Ex: ['cours_4a_sti.pdf', 'exo_3a_mri.pdf']
    }
}