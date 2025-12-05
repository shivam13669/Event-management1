const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
