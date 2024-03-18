import supertest from 'supertest';
import app from '../src/app';
import database from '../src/database';

describe.only('Users', () => {

    beforeAll(async () => {
        // INIT
        await database.initialize();
    });

   it('Create User 1', async () => {
        const users = await supertest(app).post('/users')
        .send({email : 'bryan@mailpro.fr', name:'Bryan', tel: '0650772016', password: "hellothere", is_admin: true})
        expect(users.statusCode).toBe(201);
    });
   it('Create User 2', async () => {
        const users = await supertest(app).post('/users')
        .send({email : 'damien@mailpro.fr', name:'Damien', tel: '0246432214', password: "Booh", is_admin: true})
        expect(users.statusCode).toBe(201);
    });
    
    it('Put users', async () => {
        const users = await supertest(app).put('/users/2')
        .send({email : 'iris@mmonailpro.fr', name:'Iris', tel: '0156352512', password: "hellothere", is_admin: false})
        expect(users.statusCode).toBe(200);
    });
    
    
    it('should delete one user', async() => {
        const users = await supertest(app).delete('/users/2');
        expect(users.statusCode).toBe(200);
        
   })
    
    it('Get all users', async () => {
        const users = await supertest(app).get('/users');
        expect(users.statusCode).toBe(200);
        console.log(JSON.stringify(users.body))
        
        /*expect(users.body).toBe({

        })*/
    });
    afterAll(async () => {
        // CLEANUP
        await database.destroy();
    });

});