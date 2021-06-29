import constants from "../globals/constants"

class File {
    constructor(id, name, path, color, stapple, format, recto_verso, nb_per_page, request_id, file_in_request_id, answer) {
        this.id = id
        this.name = name
        this.path = path
        this.color = color
        this.stapple = stapple
        this.format = format
        this.recto_verso = recto_verso
        this.nb_per_page = nb_per_page
        this.request_id = request_id
        this.file_in_request_id = file_in_request_id
        this.answer = answer
    }

    getDownloadUrl() {
        return constants.baseUrl + 'files/' + this.path.split('/')[this.path.split('/').length - 1];
    }
}

export default File;