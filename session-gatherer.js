const { Gatherer } = require('lighthouse');

const TOKEN = 'iOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjkzZDU0MDBiLTQ5MzgtNDNmZS1iMjY4LTY2MDJlNDIxMjFiYiIsImlhdCI6MTU1MjkwNjc0NywiZXhwIjoxNTUyOTEwMzQ3fQ.qEJflkN2ntXrQFalBkkw4duCh55HdNBLGXZOV-dS3KQ';

function createSession(token) {
  localStorage.setItem('token', token);
}

class SessionGatherer extends Gatherer {

  async beforePass(options) {
    const driver = options.driver;
    return driver.evaluateScriptOnNewDocument(`(${createSession.toString()})('${TOKEN}')`);
  }
}

module.exports = SessionGatherer;
