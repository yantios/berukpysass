const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({limit:'1mb'}));
app.use('/api', require('./api/routes'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req,res) => res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT, () => console.log(`BypassLink BRUTALL running at http://localhost:${PORT}`));
