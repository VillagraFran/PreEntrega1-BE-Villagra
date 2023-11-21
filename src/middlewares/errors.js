import EError from "../config/errors/enums.js"

export const errorHandler = (error, req, res, next) => {
    if (error !== undefined) {
        console.log(error.cause)
        switch (error.code) {
            case EError.INVALID_DATA_ERROR:
                res.send({status:"error", error: error.name})
                break;
            default:
                res.send({status:"error", error:"unhandled error"})
        }
    } else {
        next()
    }
}