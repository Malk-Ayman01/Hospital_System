const crudStub = require('./crudStub');

// TODO: replace stub with real handlers once the schema is final.
module.exports = crudStub('Appointments', { read: ['ADMIN','DOCTOR','NURSE','RECEPTIONIST'], write: ['ADMIN','RECEPTIONIST','DOCTOR'], remove: ['ADMIN','RECEPTIONIST'] });
