/* global describe, it, before */

import chai from 'chai'
import { Controller } from '../dist/foolproof-task.js'

chai.expect()

const expect = chai.expect

let lib

describe('Given an instance of my Controller', () => {
  before(() => {
    lib = new Controller()
  })
  describe('when the controller is constructed', () => {
    it('by default the route should be empty', () => {
      expect(lib._activeRoute).to.be.equal('')
    })
  })
})
