/* eslint-env mocha */
import expect from 'expect'
import { renameSync, statSync } from 'fs'

/** @test api */
describe('api', function () {
  it('sould fail to require if nvm does not exists', function () {
    // move NVM_DIR
    const tmp = process.env.NVM_DIR + '.bck'
    renameSync(process.env.NVM_DIR, tmp)

    expect(function () {
      if (!statSync(tmp).isDir()) { return }
      require('../../src/api')
    }).toThrow()

    // restablish NVM_DIR
    renameSync(tmp, process.env.NVM_DIR)
  })
})
