import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]; 

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (error) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }
};

const authoriseRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        next();
    };
};

export { protect, authoriseRole };
