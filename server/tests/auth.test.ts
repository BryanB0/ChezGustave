import supertest from 'supertest';
import app from '../src/app';
import database from '../src/database';

describe('Authentification', () => {

    beforeAll(async () => {
        // INIT
        await database.initialize();
    });

   /* it('Login w/o body', async () => {
        const auth = await supertest(app).post('/auth/login');
        expect(auth.statusCode).toBe(403);
    });*/
     
    it('Login body but not registered', async () => {
        const auth = await supertest(app).post('/auth/login')
        .send({email : 'nom.prenom@pro.com', password:'bonj'})

        expect(auth.statusCode).toBe(403);
    });

    it('Login body and registered', async () => {
        const auth = await supertest(app).post('/auth/login')
        .send({email : 'bryan@mailpro.fr', password:'hellothere'})

        expect(auth.statusCode).toBe(200);
    });

    it('Logout', async () => {
        const auth = await supertest(app).post('/auth/logout');
        expect(auth.statusCode).toBe(200);
    });

    afterAll(async () => {
        // CLEANUP
        await database.destroy();
    });

});