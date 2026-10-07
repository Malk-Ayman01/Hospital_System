const crudStub = require('./crudStub');

// TODO: replace stub with real handlers once the schema is final.
module.exports = crudStub('Patients', { read: ['ADMIN','DOCTOR','NURSE','RECEPTIONIST'], write: ['ADMIN','RECEPTIONIST'], update: ['ADMIN','RECEPTIONIST','NURSE'] });
