/* eslint require-jsdoc: 0 */
import expect from 'expect'

// Note: nvm API resolve and reject with the exit code

export function shouldReject (promise, done) {
  return promise
  .then((code) => {
    done(new Error(`Resolved with ${code}, it should NOT`))
  })
  .catch((code) => {
    // exit code should NOT be 0 when Error
    expect(code).toNotEqual(0)
    done()
  })
}

export function shouldResolve (promise, done) {
  return promise
  .then((code) => {
    // exit code should be 0 when no Error
    expect(code).toEqual(0)
    done()
  })
  .catch((code) => {
    done(new Error(`Rejected with code ${code}`))
  })
}
