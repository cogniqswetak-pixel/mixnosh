const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'components');

const replacements = [
  { search: /bg-neutral-950/g, replace: 'bg-white' },
  { search: /bg-neutral-900/g, replace: 'bg-orange-50/50' },
  { search: /bg-neutral-800/g, replace: 'bg-orange-100' },
  { search: /border-neutral-900/g, replace: 'border-orange-100' },
  { search: /border-neutral-800/g, replace: 'border-orange-200' },
  { search: /border-neutral-700/g, replace: 'border-orange-300' },
  { search: /text-white/g, replace: 'text-neutral-900' },
  { search: /text-neutral-400/g, replace: 'text-neutral-600' },
  { search: /text-neutral-300/g, replace: 'text-neutral-700' },
  { search: /text-neutral-500/g, replace: 'text-neutral-500' }, // unchanged basically, but if needed
  // Gradients
  { search: /from-orange-500 via-rose-500 to-violet-500/g, replace: 'from-orange-500 via-yellow-400 to-orange-400' },
  { search: /from-orange-500 to-rose-500/g, replace: 'from-orange-500 to-yellow-500' },
  { search: /from-teal-500 to-violet-500/g, replace: 'from-orange-500 to-yellow-500' }, // from older version if any
  // Accent text colors
  { search: /text-rose-400/g, replace: 'text-yellow-600' },
  { search: /text-violet-400/g, replace: 'text-orange-500' },
  { search: /text-orange-400/g, replace: 'text-orange-600' },
  { search: /text-rose-500/g, replace: 'text-yellow-500' },
  { search: /text-violet-500/g, replace: 'text-orange-500' },
  // Accent bg colors
  { search: /bg-rose-500/g, replace: 'bg-yellow-500' },
  { search: /bg-violet-500/g, replace: 'bg-orange-500' },
  { search: /border-rose-500/g, replace: 'border-yellow-500' },
  { search: /border-violet-500/g, replace: 'border-orange-500' },
  { search: /hover:bg-neutral-800/g, replace: 'hover:bg-orange-100' },
  { search: /hover:bg-neutral-900/g, replace: 'hover:bg-orange-50' },
  { search: /hover:text-white/g, replace: 'hover:text-neutral-900' }
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
      console.log(`Transformed ${file}`);
    }
  }
}

walk(directory);
console.log('Transformation complete.');
