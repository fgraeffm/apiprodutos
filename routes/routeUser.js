const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

module.exports = {
    registrar: async function (req, res) {
        const user = req.db.user;
        var { username, password, email } = req.body;

        if (username == "" || username == undefined) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Username não pode ser vazio"
                });
            return;
        }

        if (password == "" || password == undefined) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Password não pode ser vazio"
                });
            return;
        }

        if (email == undefined) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Email não pode ser vazio"
                });
            return;
        }

        var passwordHash = bcrypt.hashSync(password, 10);

        if (emailValidator.validate(email)) {
            const [ data, created ] = await user.findOrCreate({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: email }
                    ]
                },
                defaults: {
                    username: username,
                    password: passwordHash,
                    email: email
                }
            })

            if (created) {
                res.status(201)
                    .json({
                        status: "success",
                        data: {
                            username: data.username,
                            email: data.email,
                            userCreated: true
                        }
                    });
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        code: 400,
                        message: "Usuário já registrado"
                    });
            }
        } else {
            res.status(200)
                .json({
                    status: "error",
                    code: 200,
                    message: "Email inválido"
                });
        }
    },
    login: async function (req, res) {
        const user = req.db.user;
        const jwt = req.jwt;
        const jwtSecret = req.jwtSecret;

        var { username, password } = req.body;

        if (username == undefined || username == "") {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Username não pode ser vazio"
                });
            return;
        }

        if (password == undefined || password == "") {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Username não pode ser vazio"
                });
            return;
        }

        const data = await user.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: username }
                ]
            }
        });

        if (data != null) {
            var verifyHash = bcrypt.compareSync(password, data.password);
            if (verifyHash) {
                jwt.sign({
                    username: data.username,
                    email: data.email
                }, jwtSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400)
                            .json({
                                status: "error",
                                code: 400,
                                message: "" + err
                            });
                    } else {
                        res.status(200)
                            .json({
                                status: "success",
                                token: token
                            });
                    }
                });
            } else {
                res.status(401)
                    .json({
                        status: "error",
                        code: 401,
                        message: "Usuário ou senha não encontrados"
                    });
            }
        } else {
            res.status(401)
                .json({
                    status: "error",
                    code: 401,
                    message: "Usuário ou senha não encontrados"
                });
        }

    }
};