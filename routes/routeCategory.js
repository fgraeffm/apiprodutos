module.exports = {
    cadastrar: async function (req, res) {
        const category = req.db.category;
        var name = req.body.name;

        if (name != undefined && name != "") {
            const [data, created] = await category.findOrCreate({ where: { name: name } })

            if (created) {
                res.status(201)
                    .json({
                        status: "success",
                        data: {
                            id: data.id,
                            name: data.name
                        }
                    }, data.id);
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        code: 400,
                        message: "Categoria já registrada"
                    });
            }

        } else {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Name não pode ser vazio"
                });
        }
    },
    atualizar: async function (req, res) {
        const category = req.db.category;
        var id = req.params.id;
        var name = req.body.name

        if (name == undefined || name == "") {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "Name não pode ser vazio"
                });
            return;
        }

        if (!isNaN(id)) {
            const searchData = await category.findOne({ where: { name: name } });
            if (searchData != null) {
                res.status(400)
                    .json({
                        status: "error",
                        code: 400,
                        message: "Nome da categoria já existe"
                    });
                return;
            }

            const rows = await category.update({ name: name },
                {
                    where: { id: id }
                });

            if (rows > 0) {
                const data = await category.findByPk(id);

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

        } else {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "O id da categoria deve ser um número"
                })
        }
    },
    deletar: async function (req, res) {
        const category = req.db.category;
        var id = req.params.id;

        if (!isNaN(id)) {
            const data = await category.destroy({ where: { id: id } });
            if (data > 0) {
                res.status(200)
                    .json({
                        status: "success",
                        message: "Categoria removida"
                    });
            } else {
                res.status(400)
                    .json({
                        status: "error",
                        message: "Nenhuma categoria foi removida"
                    });
            }

        } else {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "O id da categoria deve ser um número"
                });
        }
    },
    exibir: async function (req, res) {
        const category = req.db.category;
        var id = req.params.id;

        if (!isNaN(id)) {
            const data = await category.findByPk(id);
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
                        message: "Categoria não encontrada"
                    })
            }
        } else {
            res.status(400)
                .json({
                    status: "error",
                    code: 400,
                    message: "O id da categoria deve ser um número"
                })
        }
    },
    listar: async function (req, res) {
        const category = req.db.category;

        const data = await category.findAll();

        if (data != null) {
            var result = {
                status: 200,
                data: []
            }

            data.forEach(d => {
                result.data.push(d);
            });

            res.status(200)
            .json({result});

        } else {
            res.status(404)
                .json({
                    status: "error",
                    code: 404,
                    message: "Nenhum dado encontrado"
                })
        }
    }
};