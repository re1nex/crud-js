const express = require('express');
const handler = require('./handler');
const crud = express();

crud.use("/data/getAll", handler.getAll);
crud.get('/data/:id', handler.get);
crud.post('/data/:id/:param', handler.post);
crud.put("/data/:id/:param", handler.put);
crud.delete("/data/:id", handler.delete);
crud.listen(8080, () => {
    console.log('CRUD start');
})