class File {
    constructor(id, name, path, color, stapple, format, recto_verso, nb_per_page, request_id) {
        this.id = id
        this.name = name
        this.path = path
        this.color = color
        this.stapple = stapple
        this.format = format
        this.recto_verso = recto_verso
        this.nb_per_page = nb_per_page
        this.request_id = request_id
    }
}

export default File;