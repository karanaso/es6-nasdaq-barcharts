"use strict";

let app = require('./app');
let port = process.env.PORT || '3000';

app.listen( port, () => {
  console.log(`Server is running at ${port}`);
});
