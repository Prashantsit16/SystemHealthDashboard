const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint to get system stats
app.get('/api/system-stats', (req, res) => {
    try {
        const stats = JSON.parse(fs.readFileSync(path.join(__dirname, '../system_stats.json'), 'utf8'));
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Unable to read system stats' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'System Health Dashboard is running' });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 System Health Dashboard running at: http://localhost:${port}`);
    console.log(`📊 API available at: http://localhost:${port}/api/system-stats`);
});
