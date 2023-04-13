class NotImplementedException extends Error {
    constructor(message) {
        super(`${message} as called withou an implementation`)

        this.name = "NotImplementedException"
    }
}

export { NotImplementedException }