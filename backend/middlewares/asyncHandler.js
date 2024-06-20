const asyncHandler = (middleware) => (req, res, next) => {
    Promise.resolve(middleware(req, res, next))
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })
}

export default asyncHandler