import request from "supertest";
import app from "../src/app";
import { connect, close } from "./db";

beforeAll(async () => await connect());
afterAll(async () => await close());

describe('POST /students', () => {
    it('it should store a new student', done => {
        request(app).post("/students")
            .send({
                firstName: "Geiel",
                lastName: "Peguero",
                age: 20
            })
            .expect(201)
            .then(res => {
                expect(res.body._id).toBeTruthy();
                done();
            });
    });
});

describe('GET /students', () => {
    it('it should get a student', done => {
        request(app).get('/students')
            .query({studentId: '2021-9343'})
            .expect(200)
            .then(res => {
                expect(res.body.studentId).toBe('2021-9343')
                done();
            });
    });
});

describe('PUT /students', () => {
    it('it should update a student', done => {
        request(app).put('/students/2021-9343')
            .send({
                lastName: 'Mateo'
            })
            .expect(204)
            .then(() => {
                done();
            });
    });
});

describe('PATCH /students', () => {
    it('it should merge a student', done => {
        request(app).patch('/students/2021-9343')
            .send({
                firstName: 'Pablo'
            })
            .expect(204)
            .then(() => {
                done();
            });
    });
});

describe('DELETE /students', () =>{
    it('it should delete a student', done => {
        request(app).delete('/students/2021-9343')
            .expect(204)
            .then(() => {
                done();
            });
    });
});