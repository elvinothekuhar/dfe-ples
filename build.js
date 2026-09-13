const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const folders = ['programs', 'schedule', 'news', 'documents', 'gallery'];
const manifest = {};

for (const folder of folders) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) {
    manifest[folder] = [];
    continue;
  }

  manifest[folder] = fs.readdirSync(dir)
    .filter(file => file.toLowerCase().endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
}

fs.writeFileSync(
  path.join(contentDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);

console.log('Generated content/manifest.json');
console.log(manifest);
