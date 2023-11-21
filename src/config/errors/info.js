const registerErrorDataInfo = (userData) => {
    return `Some of the information provided is incomplete or invalid.
        Recibed data:
        -first_name: ${userData.first_name}
        -last_name: ${userData.last_name}
        -age: ${userData.age}
        -email: ${userData.username}
    `
}

const loginErrorDataInfo = (userData) => {
    return `The mail or password is invalid.
        Recibed data:
        -email: ${userData.username}
    `
}

export {registerErrorDataInfo, loginErrorDataInfo};