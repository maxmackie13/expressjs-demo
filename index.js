const app = require('./server');
const port = process.env.PORT || 3000;

// listen for requests
app.listen(port, () => {
    console.log(`Express recently departend from port ${port}`)
})