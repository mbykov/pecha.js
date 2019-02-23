//

const path = require('path')

const settings = require('electron-settings')
const log = console.log
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'));

export function signup(upath) {
  let serverAuth = new PouchDB('http://localhost:5984/mydb', {skip_setup: true})
  let localpath = path.resolve(upath, 'pouch', 'auth')
  let localDB = new PouchDB(localpath)
  localDB.sync(serverAuth, {live: true, retry: true}).on('error', console.log.bind(console))

  serverAuth.signUp('batman', 'brucewayne', function (err, response) {
    if (err) {
      if (err.name === 'conflict') {
        // "batman" already exists, choose another username
      } else if (err.name === 'forbidden') {
        // invalid username
      } else {
        // HTTP error, cosmic rays, etc.
      }
    }
  })
    .then(function(res) {
      log('SIGNUP RES', res)
    })
  return
}
