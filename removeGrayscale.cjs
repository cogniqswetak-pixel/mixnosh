const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'components');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace grayscale classes and their hover states
      // We handle variations like 'grayscale group-hover:grayscale-0' or 'grayscale hover:grayscale-0'
      const originalLength = content.length;
      content = content.replace(/grayscale group-hover:grayscale-0/g, '');
      content = content.replace(/grayscale hover:grayscale-0/g, '');
      content = content.replace(/grayscale\s+/g, '');
      content = content.replace(/\s+grayscale/g, '');
      content = content.replace(/hover:grayscale-0\s+/g, '');
      content = content.replace(/\s+hover:grayscale-0/g, '');
      
      // We should also remove the transition-all and duration-500 or duration-700 if they are only for grayscale, 
      // but they might be used for scale on hover as well, so we leave them.
      // E.g., 'object-cover rounded-xl grayscale group-hover:grayscale-0' becomes 'object-cover rounded-xl  '
      // Just clean up double spaces
      content = content.replace(/\s{2,}/g, ' ');

      // Need to be careful not to corrupt standard double spacing, maybe just replacing exact strings is better
      let preciseContent = fs.readFileSync(fullPath, 'utf8');
      preciseContent = preciseContent.replace(/grayscale\s+group-hover:grayscale-0/g, '');
      preciseContent = preciseContent.replace(/grayscale\s+hover:grayscale-0/g, '');
      preciseContent = preciseContent.replace(/\s+grayscale/g, '');

      if (preciseContent.length !== fs.readFileSync(fullPath, 'utf8').length) {
        fs.writeFileSync(fullPath, preciseContent, 'utf8');
        console.log(`Removed grayscale from ${file}`);
      }
    }
  }
}

walk(directory);
console.log('Grayscale removal complete.');
