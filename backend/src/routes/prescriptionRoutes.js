const crudStub = require('./crudStub');

// TODO: replace stub with real handlers once the schema is final.
module.exports = crudStub('Prescriptions', { read: ['ADMIN','DOCTOR','NURSE'], write: ['DOCTOR'], remove: ['ADMIN'] });
