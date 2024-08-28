const fs = require('fs');
const path = require('path');

function addJsExtension(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      addJsExtension(filePath);
    } else if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/(from\s+['"]\.\/.*?)(['"])/g, '$1.js$2');
      content = content.replace(/(from\s+['"]\.\.\/.*?)(['"])/g, '$1.js$2');
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

addJsExtension('./dist');
