const request = require('supertest');
const app = require('../app');
require('../models')


let directorId
test('should POST', async() => { 
    const newDirector = {
        firstName: 'Flavio Gonzalo',
        lastName: 'Villalba Gargantini',
        nationality:'Argentina',
        image: 'https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg',
        birthday: '1989-12-20'               
    }
const res = await request(app)
    .post('/api/v1/directors')
    .send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
 })
 test("GET /directors shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/directors`);
    // console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test("GET /directors/:id shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/directors/${directorId}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('Flavio Gonzalo');
});

test("PUT /directors/:id shoud retur 200 code", async() => {
    const body = {
        firstName: 'Bees'
    }
    const res = await request(app)
        .put(`/api/v1/directors/${directorId}`)
        .send(body);
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(body.firstName);
})

test("DELETE /directors/:id shoud retur 204 code", async() => {
    const res = await request(app).delete(`/api/v1/directors/${directorId}`);
    expect(res.status).toBe(204);
})
