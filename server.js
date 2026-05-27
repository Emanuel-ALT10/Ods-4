const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

const rooms = {}; // { pin: hostSocketId }

io.on('connection', (socket) => {
    
    // Host cria a sala
    socket.on('create_room', (pin) => {
        socket.join(pin);
        rooms[pin] = socket.id;
    });

    // Jogador tenta entrar
    socket.on('join_room', (data, callback) => {
        const { pin, nick } = data;
        if(rooms[pin]) {
            socket.join(pin);
            // Avisa o host que alguém quer entrar
            io.to(rooms[pin]).emit('player_req_join', { nick, socketId: socket.id });
            callback({ success: true });
        } else {
            callback({ error: 'PIN Inválido ou Sala Fechada.' });
        }
    });

    // Host aprova o jogador (após validar apelido único, etc)
    socket.on('host_sync_state', (data) => {
        const { pin, state } = data;
        // Envia o estado do jogo para todos na sala
        socket.to(pin).emit('state_updated', state);
    });

    // Jogador envia resposta para o Host
    socket.on('player_answer', (data) => {
        const { pin, nick, answerIdx } = data;
        if(rooms[pin]) {
            io.to(rooms[pin]).emit('player_answered', { nick, answerIdx });
        }
    });

    // Jogador envia emoji
    socket.on('player_send_emoji', (data) => {
        const { pin, emoji } = data;
        if(rooms[pin]) {
            io.to(rooms[pin]).emit('show_emoji', { emoji });
        }
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Kahoot Server rodando em http://localhost:${PORT}`);
});
