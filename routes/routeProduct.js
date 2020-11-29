const { Op } = require('sequelize');
const moment = require('moment');
const url = require('url');

module.exports = {
    cadastrar: async function (req, res) {
        const product = req.db.product;
        var { categoryId, name, manufacturingDate, perishableProduct, expirationDate, price } = req.body;

        if (isNaN(categoryId) || !categoryId) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "CategoryId é inválido"
                })
            return;
        }

        if (!name) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Name é inválido"
                })
            return;
        }

        if (!moment(manufacturingDate, moment.ISO_8601, true).isValid() || !manufacturingDate) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "ManufacturingDate é inválido"
                })
            return;
        }

        if (!expirationDate) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "ExpirationDate é inválido"
                })
            return;
        }

        if (!(perishableProduct === true || perishableProduct === false)) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "PerishableProduct é inválido " + perishableProduct
                })
            return;
        }

        if (perishableProduct) {
            if (moment(expirationDate, moment.ISO_8601, true).isValid()) {
                if (Date.parse(manufacturingDate) >= Date.parse(expirationDate)) {
                    res.status(400)
                        .json({
                            status: "error",
                            code: 400,
                            message: "ManufacturingDate não pode ser maior do que ExpirationDate"
                        })
                    return;
                }
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        code: 400,
                        message: "ExpirationDate é inválido"
                    })
                return;
            }
        }

        if (!price) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Price é inválido"
                })
            return;
        }

        try {
            const [data, created] = await product.findOrCreate({
                where: { name: name },
                defaults: {
                    categoryId: categoryId,
                    name: name,
                    manufacturingDate: manufacturingDate,
                    perishableProduct: perishableProduct,
                    expirationDate: expirationDate,
                    price: parseFloat(price).toFixed(2)
                }
            });

            if (created) {
                res.status(201)
                    .json({
                        status: "success",
                        data: data
                    }, data.id);
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        code: 400,
                        message: "Produto já registrado"
                    });
            }
        } catch (err) {
            res.status(500)
                .json({
                    status: "error",
                    code: 500,
                    message: "" + err
                });
        }

    },
    atualizar: async function (req, res) {
        const product = req.db.product;
        var id = req.params.id;
        var { categoryId, name, manufacturingDate, perishableProduct, expirationDate, price } = req.body;

        if (isNaN(id)) {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "O id do produto deve ser um número"
                })
            return;
        }

        try {
            if (name) {
                const searchData = await product.findOne({ where: { name: name } });
                if (searchData != null && searchData.id != id) {
                    res.status(400)
                        .json({
                            status: "error",
                            code: 400,
                            message: "Nome do produto já existe"
                        });
                    return;
                }
            }

            if(price){
                price = parseFloat(price).toFixed(2);
            }

            const rows = await product.update({
                categoryId: categoryId,
                name: name,
                manufacturingDate: manufacturingDate,
                perishableProduct: perishableProduct,
                expirationDate: expirationDate,
                price: price
            }, { where: { id: id } });

            if (rows > 0) {
                const data = await product.findByPk(id);

                res.status(200)
                    .json({
                        status: "success",
                        data: data
                    }, id);
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        code: 400,
                        message: "Nenhum dado foi atualizado"
                    });
            }
        } catch (err) {
            res.status(500)
                .json({
                    status: "error",
                    code: 500,
                    message: "" + err
                });
        }
    },
    deletar: async function (req, res) {
        const product = req.db.product;
        var id = req.params.id;

        if (!isNaN(id)) {
            const data = await product.destroy({ where: { id: id } });
            if (data > 0) {
                res.status(200)
                    .json({
                        status: "success",
                        message: "Produto removido"
                    });
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        message: "Nenhum produto foi removido"
                    });
            }

        } else {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "O id do produto deve ser um número"
                });
        }
    },
    exibir: async function (req, res) {
        const product = req.db.product;
        const category = req.db.category;
        var id = req.params.id;

        if (!isNaN(id)) {
            const data = await product.findByPk(id, {
                include: {
                    model: category,
                    attributes: ['name']
                }
            });
            if (data != null) {
                res.status(200)
                    .json({
                        status: "success",
                        data: data
                    }, data.id)
            } else {
                res.status(404)
                    .json({
                        status: "error",
                        code: 404,
                        message: "Produto não encontrado"
                    })
            }
        } else {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "O id do produto deve ser um número"
                })
        }
    },
    listar: async function (req, res) {
        const product = req.db.product;

        const queryObject = url.parse(req.url, true).query;
        var field = queryObject.field;
        var order = queryObject.order;

        if (!field) {
            field = "id";
        }

        if (!order) {
            order = "ASC";
        }

        try {
            const data = await product.findAll({
                order: [
                    [field, order]
                ],
                limit: 10
            });

            if (data != null) {
                var result = {
                    status: 200,
                    data: []
                }

                data.forEach(d => {
                    result.data.push(d);
                });

                res.status(200)
                    .json({ result });

            } else {
                res.status(404)
                    .json({
                        status: "error",
                        code: 404,
                        message: "Nenhum dado encontrado"
                    })
            }
        } catch (err) {
            res.status(500)
                .json({
                    status: "error",
                    code: 500,
                    message: "" + err
                });
        }
    }
};