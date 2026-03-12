const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    // Handle "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        req.user = { _id: verified.id, id: verified.id };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
