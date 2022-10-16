/// <reference types ="Cypress" />
describe('Get api user tests', ()=>{

    let accessToken = ''

    it('check if first user status is active', ()=>{

        cy.request({

            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((res)=>{

            expect(res.status).to.eq(200)
            expect(res.body[0].status).to.eq("active")
        })
    })

    it('get user by ID and check its name', ()=>{

        cy.request({

            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/3818',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((res)=>{

            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq("Pres. Aasha Acharya")
        })
    })
})