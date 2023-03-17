const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')


let moviesId
test('should POST', async() => { 
    const newMovie = {
        name:'Avatar',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbbYUk3TNQ-hpvDYQcg-QqqwWVwfxZYqWCh-uNuuoWgKfcGopr',
        synopsis:'En un exuberante planeta llamado Pandora viven los Navi, seres que aparentan ser primitivos pero que en realidad son muy evolucionados',
        releaseYear: 2023        
    }
const res = await request(app)
    .post('/api/v1/movies')
    .send(newMovie);
    moviesId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
 })
 test("GET /movies shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/movies`);
    // console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test("GET /movies/:id shoud retur 200 code", async() => {
    const res = await request(app).get(`/api/v1/movies/${moviesId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Avatar');
});

test("PUT /movies/:id shoud retur 200 code", async() => {
    const body = {
        name: 'Avatar 2'
    }
    const res = await request(app)
        .put(`/api/v1/movies/${moviesId}`)
        .send(body);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(body.name);
})
test("POST /movies/:id/actors shoud retur 200 code", async() => {
    const actor = await Actor.create({
        firstName: 'Sofí',
        lastName: 'Villalba Raia',
        nationality:'Argentina',
        image: 'https://img.freepik.com/foto-gratis/nino-bebe-nina-nino-gateando-feliz-mirando-recto-aislado-pared-blanca_496169-789.jpg',
        birthday: '2022-08-22'
    })
    const res = await request(app)
    .post(`/api/v1/movies/${moviesId}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})
test("POST /movies/:id/actors shoud retur 200 code", async() => {
    const director = await Director.create({
        firstName: 'Gonza',
        lastName: 'Villalba',
        nationality:'Argentina',
        image: 'https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg',
        birthday: '1989-12-20'
    })
    const res = await request(app)
    .post(`/api/v1/movies/${moviesId}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})
test("POST /movies/:id/directors shoud retur 200 code", async() => {
    const genre = await Genre.create({
        name:'Action'
    })
    const res = await request(app)
    .post(`/api/v1/movies/${moviesId}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})
test("DELETE /movies/:id shoud retur 204 code", async() => {
    const res = await request(app).delete(`/api/v1/movies/${moviesId}`);
    expect(res.status).toBe(204);
})
