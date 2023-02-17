export const authMiddleware = async (req, res, next) => {
    if (await req.session.user) {
        next();
    }
    else {
        res.redirect('/')
    }
};