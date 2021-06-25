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
}

export default User;