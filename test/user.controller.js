const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'testinguser',
        firstname: 'John',
        lastname: 'Doe'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'John',
        lastname: 'Doe'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })




    it('avoid creating an existing user', (done) => {
      const user = {
        username: 'testinguser',
        firstname: 'John',
        lastname: 'Doe'
      }

      userController.create(user, () => {
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })

    })
  })

  describe('Get', () => {
    it('get a user by username', (done) => {
      const user = {
        username: 'testinguser',
        firstname: 'John',
        lastname: 'Doe'
      }

      //create a new user because tests are independant
      userController.create(user, () => {
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.deep.equal({
            firstname: user.firstname,
            lastname: user.lastname
          })
          done()
        })
      })
    })

    it('cannot get a user when it doet not exist', (done) => {
      //check with invalid user
      let notExistingUsername = "misterx"

      userController.get(notExistingUsername, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })
})



