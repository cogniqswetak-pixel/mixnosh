const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'components');

const replacements = [
  { search: /bg-orange-50\/50\/([0-9]+)/g, replace: 'bg-orange-50/$1' },
  { search: /bg-orange-50\/50/g, replace: 'bg-orange-50' },
  { search: /bg-white\/50/g, replace: 'bg-white/50' },
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      for (const { search, replace } of replacements) {
        content = content.replace(search, replace);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Fixed ${file}`);
    }
  }
}

walk(directory);
console.log('Fix complete.');
