const crudStub = require('./crudStub');

// TODO: replace stub with real handlers once the schema is final.
module.exports = crudStub('Medical records', { read: ['ADMIN','DOCTOR','NURSE'], write: ['DOCTOR'], remove: ['ADMIN'] });
