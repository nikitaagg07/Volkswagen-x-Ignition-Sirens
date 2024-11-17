const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('a user connected');

    // When a message is sent from one user, broadcast it to the other user
    socket.on('sendMessage', (message) => {
        // Emit the message to the other client
        io.emit('receiveMessage', message);
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// Define routes for each page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html')); // Home page
});

app.get('/signaturestyling', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'signaturestyling.html')); // SignatureStyling page
});

app.get('/voyagesync', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'voyagesync.html')); // VoyageSync page
});

app.get('/caredrive', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'caredrive.html')); // CareDrive page
});

app.get('/alertguard', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'alertguard.html')); // AlertGuard page
});

// Example geolocation endpoint (mocked data)
app.get('/api/geolocation', (req, res) => {
    // Return mocked location (replace with real logic)
    const location = { lat: 28.7041, lng: 77.1025 }; // New Delhi
    res.json(location);
});

// Example geocode endpoint
app.post('/api/geocode', (req, res) => {
    const { address } = req.body;

    // Mock geocode response (you can replace this with a real geocoding API like Google Maps)
    if (address === "New Delhi") {
        res.json({ lat: 28.7041, lng: 77.1025 });  // New Delhi coordinates
    } else {
        res.json({ lat: 0, lng: 0 });  // Default or failed geocode
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
