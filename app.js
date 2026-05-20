const socket = io();

// DOM Elements - General
const roleScreen = document.getElementById('role-screen');
const btnRoleHost = document.getElementById('btn-role-host');
const btnRolePlayer = document.getElementById('btn-role-player');

// DOM - Host
const hostLobbyScreen = document.getElementById('host-lobby-screen');
const hostPinDisplay = document.getElementById('host-pin-display');
const hostPlayerCount = document.getElementById('host-player-count');
const hostQrImg = document.getElementById('host-qr-img');
const hostPlayersList = document.getElementById('host-players-list');
const btnHostStart = document.getElementById('btn-host-start');

const hostQuizScreen = document.getElementById('host-quiz-screen');
const hostCurrentQ = document.getElementById('host-current-q');
const hostQuestionText = document.getElementById('host-question-text');
const hostOptTexts = [
    document.getElementById('host-opt-0-text'),
    document.getElementById('host-opt-1-text'),
    document.getElementById('host-opt-2-text'),
    document.getElementById('host-opt-3-text')
];

const hostResultsScreen = document.getElementById('host-results-screen');
const hostPodiumList = document.getElementById('host-podium-list');
const btnHostReset = document.getElementById('btn-host-reset');

// DOM - Player
const playerJoinScreen = document.getElementById('player-join-screen');
const playerPinStep = document.getElementById('player-pin-step');
const playerNickStep = document.getElementById('player-nick-step');
const playerPinInput = document.getElementById('player-pin');
const btnPlayerEnterPin = document.getElementById('btn-player-enter-pin');
const playerNickInput = document.getElementById('player-nickname');
const btnPlayerEnterNick = document.getElementById('btn-player-enter-nick');
const playerJoinError = document.getElementById('player-join-error');

const playerWaitingScreen = document.getElementById('player-waiting-screen');
const playerGamepadScreen = document.getElementById('player-gamepad-screen');
const playerScoreDisplay = document.getElementById('player-score-display');
const playerOpts = document.querySelectorAll('.player-opt');

const playerFeedbackScreen = document.getElementById('player-feedback-screen');
const playerFeedbackBg = document.getElementById('player-feedback-bg');
const playerFeedbackIcon = document.getElementById('player-feedback-icon');
const playerFeedbackTitle = document.getElementById('player-feedback-title');
const playerPointsEarned = document.getElementById('player-points-earned');

// Icons
const ICON_LOADER = `<div class="loader"></div>`;
const ICON_CORRECT = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 100px; height: 100px; animation: pop 0.5s ease-out;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
const ICON_INCORRECT = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 100px; height: 100px; animation: pop 0.5s ease-out;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

let isHost = false;
let localPlayerNick = '';
let currentPin = '';

// The authoritative state kept by the HOST
let hostRoomState = null;

function getEmptyRoom(pin) {
    return {
        pin: pin,
        status: 'lobby', 
        currentQuestionIndex: 0,
        questionStartTime: 0,
        players: {}, // { "Nick": { score: 0, hasAnswered: false, lastPoints: 0, isCorrect: false } }
        correctIndex: 0
    };
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// ==========================================
// INITIAL SETUP
// ==========================================
btnRoleHost.addEventListener('click', initHost);
btnRolePlayer.addEventListener('click', () => showScreen(playerJoinScreen));

// ==========================================
// HOST LOGIC
// ==========================================
function initHost() {
    isHost = true;
    currentPin = Math.floor(100000 + Math.random() * 900000).toString();
    hostRoomState = getEmptyRoom(currentPin);
    
    socket.emit('create_room', currentPin);

    hostPinDisplay.textContent = currentPin;
    const currentUrl = window.location.href.split('?')[0];
    const joinUrl = `${currentUrl}?pin=${currentPin}`;
    hostQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(joinUrl)}`;

    showScreen(hostLobbyScreen);
    updateHostUI();
}

// Quando alguém entra na sala
socket.on('player_req_join', (data) => {
    if(!isHost) return;
    const { nick } = data;
    if(!hostRoomState.players[nick]) {
        hostRoomState.players[nick] = { score: 0, hasAnswered: false, lastPoints: 0, isCorrect: false };
        updateHostUI();
        syncStateToPlayers();
    }
});

// Quando alguém responde
socket.on('player_answered', (data) => {
    if(!isHost) return;
    if(hostRoomState.status !== 'question') return;

    const { nick, answerIdx } = data;
    const pData = hostRoomState.players[nick];
    
    if(!pData || pData.hasAnswered) return;

    const timeElapsedMs = Date.now() - hostRoomState.questionStartTime;
    const isCorrect = (answerIdx === hostRoomState.correctIndex);
    
    let points = 0;
    if(isCorrect) {
        const decay = Math.floor(timeElapsedMs / 1000) * 15;
        points = Math.max(100, 1000 - decay);
        pData.score += points;
    }

    pData.hasAnswered = true;
    pData.lastPoints = points;
    pData.isCorrect = isCorrect;
    
    updateHostUI();
    syncStateToPlayers();
});

function syncStateToPlayers() {
    socket.emit('host_sync_state', { pin: currentPin, state: hostRoomState });
}

function updateHostUI() {
    if (hostRoomState.status === 'lobby') {
        const pNames = Object.keys(hostRoomState.players);
        hostPlayerCount.textContent = pNames.length;
        hostPlayersList.innerHTML = pNames.map(p => `<div class="player-chip">${p}</div>`).join('');
    }
    
    if (hostRoomState.status === 'question') {
        const pNames = Object.keys(hostRoomState.players);
        if(pNames.length > 0) {
            const allAnswered = pNames.every(p => hostRoomState.players[p].hasAnswered);
            if(allAnswered) {
                // Para não avançar instantaneamente antes do aluno ver o feedback final, dá um delay
                setTimeout(() => hostNextQuestion(), 3000);
            }
        }
    }
}

btnHostStart.addEventListener('click', () => {
    if(Object.keys(hostRoomState.players).length === 0) {
        alert("Aguarde pelo menos um jogador!");
        return;
    }
    hostRoomState.status = 'question';
    hostRoomState.currentQuestionIndex = 0;
    hostLoadQuestion();
});

function hostLoadQuestion() {
    const qData = quizQuestions[hostRoomState.currentQuestionIndex];
    hostRoomState.questionStartTime = Date.now();
    hostRoomState.correctIndex = qData.correctIndex;
    
    // Reset answers
    Object.keys(hostRoomState.players).forEach(p => {
        hostRoomState.players[p].hasAnswered = false;
        hostRoomState.players[p].lastPoints = 0;
    });

    syncStateToPlayers();

    hostCurrentQ.textContent = hostRoomState.currentQuestionIndex + 1;
    hostQuestionText.textContent = qData.question;
    qData.options.forEach((opt, idx) => {
        hostOptTexts[idx].textContent = opt;
    });
    
    showScreen(hostQuizScreen);
}

function hostNextQuestion() {
    hostRoomState.currentQuestionIndex++;
    
    if(hostRoomState.currentQuestionIndex >= quizQuestions.length) {
        hostRoomState.status = 'leaderboard';
        syncStateToPlayers();
        
        const sortedPlayers = Object.entries(hostRoomState.players).sort((a,b) => b[1].score - a[1].score);
        hostPodiumList.innerHTML = sortedPlayers.map((p, idx) => `
            <div class="podium-item">
                <span>${idx+1}º ${p[0]}</span>
                <span>${p[1].score} pts</span>
            </div>
        `).join('');
        
        showScreen(hostResultsScreen);
    } else {
        hostLoadQuestion();
    }
}

btnHostReset.addEventListener('click', () => {
    location.reload();
});


// ==========================================
// PLAYER LOGIC
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('pin')) {
    playerPinInput.value = urlParams.get('pin');
    showScreen(playerJoinScreen);
}

btnPlayerEnterPin.addEventListener('click', () => {
    currentPin = playerPinInput.value.trim();
    if (currentPin.length === 0) {
        playerJoinError.textContent = "PIN Inválido.";
        return;
    }
    playerJoinError.textContent = "";
    playerPinStep.style.display = 'none';
    playerNickStep.style.display = 'block';
});

btnPlayerEnterNick.addEventListener('click', () => {
    const nick = playerNickInput.value.trim();
    if(nick.length === 0) {
        playerJoinError.textContent = "Digite um apelido!";
        return;
    }
    
    socket.emit('join_room', { pin: currentPin, nick: nick }, (response) => {
        if(response.error) {
            playerJoinError.textContent = response.error;
        } else {
            localPlayerNick = nick;
            showScreen(playerWaitingScreen);
        }
    });
});

// Recebe a sincronização de estado do Host
socket.on('state_updated', (room) => {
    if(isHost) return; // Host não liga pra isso
    if(!localPlayerNick) return; // Aluno ainda não entrou
    
    const myData = room.players[localPlayerNick];
    if(!myData) return;

    playerScoreDisplay.textContent = myData.score;

    if (room.status === 'lobby') {
        showScreen(playerWaitingScreen);
    } 
    else if (room.status === 'question') {
        if (!myData.hasAnswered) {
            showScreen(playerGamepadScreen);
        }
    }
    else if (room.status === 'leaderboard') {
        playerFeedbackBg.className = 'full-bg-overlay bg-loading';
        playerFeedbackIcon.innerHTML = '🏆';
        playerFeedbackTitle.textContent = "Olhe para a tela principal!";
        playerPointsEarned.textContent = `Sua pontuação total: ${myData.score} pts`;
        showScreen(playerFeedbackScreen);
    }
});

// Responde
playerOpts.forEach(btn => {
    btn.addEventListener('click', () => {
        const answerIdx = parseInt(btn.dataset.idx);
        
        socket.emit('player_answer', { pin: currentPin, nick: localPlayerNick, answerIdx });
        
        // Simula loading antes do Host devolver o score na próxima sincronização
        showScreen(playerFeedbackScreen);
        playerFeedbackBg.className = 'full-bg-overlay bg-loading';
        playerFeedbackIcon.innerHTML = ICON_LOADER;
        playerFeedbackTitle.textContent = "Verificando...";
        playerPointsEarned.textContent = "";
        
        // Timeout para dar sensação de envio, depois o HostSync atualiza a tela
        setTimeout(() => {
            // Em caso de delay, vamos tentar buscar o estado? Na verdade, já vai ter recebido.
            // Para não quebrar, vamos esperar o próximo state_updated do host para mostrar verde/vermelho.
            // O ideal é a lógica ver o isCorrect, mas o state já vem de cima.
        }, 500);
    });
});

// Escuta a confirmação da resposta (quando a variável hasAnswered no hostRoomState passa pra true, a gente renderiza o acerto/erro aqui mesmo)
socket.on('state_updated', (room) => {
    if(isHost || !localPlayerNick) return;
    const myData = room.players[localPlayerNick];
    
    if(room.status === 'question' && myData.hasAnswered) {
        showScreen(playerFeedbackScreen);
        if (myData.isCorrect) {
            playerFeedbackBg.className = 'full-bg-overlay bg-correct';
            playerFeedbackIcon.innerHTML = ICON_CORRECT;
            playerFeedbackTitle.textContent = "Correto!";
            playerPointsEarned.textContent = `+${myData.lastPoints} pts`;
        } else {
            playerFeedbackBg.className = 'full-bg-overlay bg-incorrect';
            playerFeedbackIcon.innerHTML = ICON_INCORRECT;
            playerFeedbackTitle.textContent = "Incorreto!";
            playerPointsEarned.textContent = "Não desanime!";
        }
    }
});
