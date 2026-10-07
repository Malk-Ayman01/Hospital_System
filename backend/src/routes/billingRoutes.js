const crudStub = require('./crudStub');

// TODO: replace stub with real handlers once the schema is final.
module.exports = crudStub('Billing', { read: ['ADMIN','RECEPTIONIST'], write: ['ADMIN','RECEPTIONIST'] });
