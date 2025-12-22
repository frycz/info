const fs = require('fs');
const path = require('path');

function showVersion() {
  const packagePath = path.join(__dirname, '../../package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  console.log(pkg.version);
}

module.exports = { showVersion };
