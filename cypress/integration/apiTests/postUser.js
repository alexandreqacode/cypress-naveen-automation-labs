/// <reference types = "Cypress" />

const dataJson = require('../../fixtures/createUser.json')

describe('Post user request', () => {

    let accessToken = ''
    let randomText = ""
    let testEmail = ""

    it('Create user test function', () => {

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'

        cy.fixture('createUser').then((payload) => {


            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {

                    "email": testEmail,
                    "name": payload.name,
                    "gender": payload.gender,
                    "status": payload.status

                }
            }).then((response) => {
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body).has.property("name", payload.name)
                expect(response.body).has.property("gender", payload.gender)
                expect(response.body.email).to.eq(testEmail)
                expect(response.body.status).to.eq(payload.status)

            })
        })
    })
})