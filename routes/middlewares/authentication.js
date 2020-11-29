module.exports = {
    auth: function(req, res, next){
        const authToken = req.headers['authorization'];
        const jwt = req.jwt;
        const jwtSecret = req.jwtSecret;

        if(authToken != undefined){
            const bearer = authToken.split(' ');
            var token = bearer[1];

            jwt.verify(token, jwtSecret, (err, data) => {
                if(err){
                    res.status(401)
                    .json({
                        status: "error",
                        code: 401,
                        message: "Token inválido"
                    });
                } else {
                    req.token = token;
                    req.loggedUser = {username: data.username, email: data.email};
                    next();
                }
            });
        } else {
            res.status(401)
            .json({
                status: "error",
                code: 401,
                message: "Usuário não autenticado"
            });
        }
    }
};