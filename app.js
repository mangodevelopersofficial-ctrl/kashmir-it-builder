const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/build-app', (req, res) => {
    const { htmlCode, type } = req.body;
    
    // 1. HTML file save karna
    fs.writeFileSync(path.join(__dirname, 'public/index.html'), htmlCode);

    // 2. GitHub par automatically bhejna
    console.log("Pushing to GitHub for Cloud Build...");
    const gitCommands = `git add . && git commit -m "New Build Request" && git push origin main`;

    exec(gitCommands, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "GitHub Push Failed! Check your terminal." });
        }
        res.json({ 
            success: true, 
            message: "🚀 Code GitHub par bhej diya gaya hai! 5 minute baad 'Actions' tab se apni file download karein." 
        });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));