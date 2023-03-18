const request = require('supertest');
const app = require('../app');
require('../models')


let genreId
test('should POST', async() => { 
    const newGenre = {
        name:'Action'               
    }
const res = await request(app)
    .post('/api/v1/genres')
    .send(newGenre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
 })
 test("GET /genres shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/genres`);
    // console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test("GET /genres/:id shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/genres/${genreId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Action');
});

test("PUT /genres/:id shoud retur 200 code", async() => {
    const body = {
        name: 'Horror'
    }
    const res = await request(app)
        .put(`/api/v1/genres/${genreId}`)
        .send(body);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(body.name);
})

test("DELETE /genres/:id shoud retur 204 code", async() => {
    const res = await request(app).delete(`/api/v1/genres/${genreId}`);
    expect(res.status).toBe(204);
})
