const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static('.'));

// GitHub repository details
const owner = '1dev-hridoy';
const repo = 'WhatsApp-Widget-Chat-Box-Library';

// Route to get repository stats
app.get('/api/repo-stats', async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
        const { stargazers_count, forks_count } = response.data;
        
        res.json({
            stars: stargazers_count,
            forks: forks_count
        });
    } catch (error) {
        console.error('Error fetching repository stats:', error);
        res.status(500).json({ error: 'Failed to fetch repository stats' });
    }
});

// Update the stats every 5 minutes
setInterval(async () => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
        const { stargazers_count, forks_count } = response.data;
        console.log(`Updated stats - Stars: ${stargazers_count}, Forks: ${forks_count}`);
    } catch (error) {
        console.error('Error updating repository stats:', error);
    }
}, 5 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});