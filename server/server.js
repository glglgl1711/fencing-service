const {createServer} = require('http')
const {parse} = require('url')
const express = require('express')
const next = require('next');
const mysql = require('mysql2');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const connection = mysql.createConnection({
    host : 'gunhee0906.cafe24.com',
    user : 'gunhee0906',
    password : 'rjsgml!!4589',
    database : 'fencing'
});

app.prepare().then(() => {
    const server = express()
    const httpServer = createServer(server);

    const mainRoutes = require('./routes/mainRoute')
    server.use('/api/main' , mainRoutes)
    
    const userRoutes = require('./routes/userRoute')
    server.use(`/api/user`, userRoutes)

    const newsRoutees = require('./routes/newsRoute')
    server.use('/api/news', newsRoutees)
    
    const photoRoutes = require('./routes/photoRoute')
    server.use('/api/photo', photoRoutes)

    const serviceRoutes = require('./routes/serviceRoute')
    server.use('/api/service' , serviceRoutes)

    const ediotrRoutes = require('./routes/editorRoute')
    server.use('/api/editor' , ediotrRoutes)

    const adminRoutes = require('./routes/adminRoute')
    server.use('/api/admin' , adminRoutes)
    

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;

    connection.connect((err) => {
        if(err) {
            console.error('Error');
            return;
        }
        console.log('Connected To MySql');
    });

    httpServer.listen(port, (err) => {
        if(err) throw err;
        console.log(`Ready on Port : ${port}`);
    });
});
