class Request {
    constructor(expirationDate, intendLists, yesList, documents) {
        this.expirationDate = expirationDate;
        this.intendLists = intendLists; // Ex: ['3A', 'STI'] for 3ASTI
        this.yesList = yesList; // Ex: ['jean.jean@insa-cvl.fr', 'dupont.dupond@insa-cvl.fr']
        this.documents = documents; // Ex: ['cours_4a_sti.pdf', 'exo_3a_mri.pdf']
    }
}