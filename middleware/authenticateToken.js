const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        return res.status(401).json({ message: "Нет авторизации, токен не найден"});
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Токен недействителен"});
    }
}

module.exports = authenticateToken;