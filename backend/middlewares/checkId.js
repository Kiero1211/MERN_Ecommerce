import { isValidObjectId } from "mongoose";

export const checkId = (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(404);
        throw new Error(`Invalid ObjectID: ${req.params.id}`);
    }
    next();
}
