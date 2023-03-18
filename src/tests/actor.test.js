const request = require('supertest');
const app = require('../app');
require('../models')


let actorId
test('should POST', async() => { 
    const newActor = {
        firstName: 'Sofí',
        lastName: 'Villalba Raia',
        nationality:'Argentina',
        image: 'https://img.freepik.com/foto-gratis/nino-bebe-nina-nino-gateando-feliz-mirando-recto-aislado-pared-blanca_496169-789.jpg',
        birthday: '2022-08-22'               
    }
const res = await request(app)
    .post('/api/v1/actors')
    .send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
 })
 test("GET /actors shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/actors`);
    // console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test("GET /actors/:id shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/actors/${actorId}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('Sofí');
});

test("PUT /actors/:id shoud retur 200 code", async() => {
    const body = {
        firstName: 'Kangaroo'
    }
    const res = await request(app)
        .put(`/api/v1/actors/${actorId}`)
        .send(body);
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(body.firstName);
})

test("DELETE /actors/:id shoud retur 204 code", async() => {
    const res = await request(app).delete(`/api/v1/actors/${actorId}`);
    expect(res.status).toBe(204);
})
