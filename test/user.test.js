let app = require('../app')
const supertest = require('supertest')
const request = supertest(app)


let token = "eyJhbGciOiJIUzI1NiJ9.NTg1M2ZlZTgtNzJmYy00MjVmLWEwNmUtNTM1ZTVjNjZjYTQ0.zEVOsmt_mGhOBqq4UkM1UgHf2wqQrXqTpwQd1R2POtw";
let userID = ""
let countryID;
describe("Country API's", () => {
    // it('user signup', async done => {
    //     const response = await request
    //         .post('/user/signup')
    //         .send({
    //             prefferedLanguageCode: "ARB",
    //             email: "TEST1223334444@TEST.com",
    //             password: "password",
    //             userName: "TEST",
    //             firstName: "FIRSTSNAMA",
    //             lastName: "LASTANAME",
    //             phoneNo: 8847488894,
    //             country_id: "7ca28824-1760-11eb-8edd-08606e6ce1c1",
    //         })
    //     expect(response.status).toBe(200);
    //     token = response.body.data.token
    //     userID = response.body.data.userID
    //     console.log(token, userID)
    //     done()

    // })

    it('Get All Countries', async done => {
        const response = await request
            .get('/country')
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        done()
    })
    it('Add a Country', async done => {
        const response = await request
            .post('/country')
            .set('Authorization', `Bearer ${token}`)
            .send({
                country: 'A'
            })
        expect(response.status).toBe(200);
        countryID = response.body.data.countryID
        done()
    })

    it('Update a Country', async done => {
        const response = await request
            .put('/country')
            .set('Authorization', `Bearer ${token}`)
            .send({
                countryID,
                country: 'Ame'
            })
        expect(response.status).toBe(200);
        done()
    })

    it('Get By countryID', async done => {
        const response = await request
            .get(`/country/getBy/:countryID`)
            .send({ countryID })
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        done()
    })


})













// var assert = require('assert');
// const chaiHttp = require("chai-http");
// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });
