const crudStub = require('./crudStub');

// TODO: replace stub with real handlers once the schema is final.
module.exports = crudStub('Departments', { read: ['ADMIN','DOCTOR','NURSE','RECEPTIONIST'], write: ['ADMIN'] });
