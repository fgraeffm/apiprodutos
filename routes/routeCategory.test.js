const app = require('../app');
const supertest = require('supertest');
const sequelize = require('sequelize');
const database = require('../database/createDatabase');
const request = supertest(app);

describe('Category endpoint', () => {    
    var databaseName = 'testehox',
        username = 'root',
        password = '1234',
        host = 'localhost';

    var connection = null;
    let token = null;

    beforeAll(async done => {
        connection = new sequelize(databaseName, username, password, {
            host: host,
            dialect: 'mysql',
            timezone: '-03:00'
        })

        await connection.authenticate();
        request.post('/api/login')
        .send({username: "root", password: "1234"})
        .end(function(err, res){
            if(err){
                console.log("T: " + err);
                done();
            }
            token = res.body.token;
            done();
        });
    });

    it("Listar todas as categoria", async done => {
        const res = await request.get('/api/category').set('authorization', 'Bearer ' + token);
        
        expect(res.status).toBe(200);        
        done();
    });

    afterAll(() => {
        connection.close();
    })
});