const router = require('express')();
const jwt = require('jsonwebtoken');
const jwtSecret = "sdg84294t12sxcg205303bd94ar23506";
const verbose = process.env.NODE_ENV !== 'test';
const auth = require('./middlewares/authentication').auth;
const hateoas = require('express-hateoas-yml');
const path = require('path');
const hateoasOptions = {
    linksFile: path.join(__dirname, '/middlewares/hateoasLinks.yml')
};


module.exports = function(database) {
    const user = require('./routeUser');
    const category = require('./routeCategory');
    const product = require('./routeProduct');

    router.map = function(a, route){
        route = route || '';
        for (var key in a) {
          switch (typeof a[key]) {
            case 'object':
                router.map(a[key], route + key);
              break;
            case 'function':
              //if (verbose) console.log('%s %s', key, route);
              router[key](route, a[key]);
              break;
          }
        }
    };

    router.use('*', (req, res, next) => hateoas(req, res, next, hateoasOptions))
        .use((req, res, next) => {
            req.jwt = jwt;
            req.jwtSecret = jwtSecret;
            req.db = database;
            return next();
        })
        .post('/login', user.login)
        .post('/registrar', user.registrar)
        .use(auth)
        .map({
            '/category':{
                post: category.cadastrar,
                get: category.listar,
                '/:id':{
                    put: category.atualizar,
                    delete: category.deletar,
                    get: category.exibir
                }
            },
            '/product':{
                post: product.cadastrar,
                get: product.listar,
                '/:id':{
                    put: product.atualizar,
                    delete: product.deletar,
                    get: product.exibir
                }
            }
        });

    return router;
};