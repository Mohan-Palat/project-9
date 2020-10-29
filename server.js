const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Ready to rock!!!");
});

app.listen(PORT, () => {
    console.log("Server is listening!!!");
});