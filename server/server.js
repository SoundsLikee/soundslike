import { createServer } from 'http';
import { Server } from 'socket.io';
import ss from 'socket.io-stream';
import path from 'path';
import * as fs from 'fs'

const httpServer = createServer().listen(3000);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:63342",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

io.on('connection', (socket) => {
    console.log("connection ok")
    ss(socket).on('stream', (stream, data) => {
        console.log('server stream');
        console.log(data);

        // let fileName = path.basename(data.name);
        
        stream.pipe(fs.createWriteStream(data.name));
    });
});
