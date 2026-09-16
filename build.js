const fs=require('fs');const path=require('path');
const dirs=['programs'];
const manifest={};
for(const dir of dirs){const p=path.join('content',dir);manifest[dir]=fs.existsSync(p)?fs.readdirSync(p).filter(f=>f.endsWith('.json')).sort():[];}
fs.writeFileSync(path.join('content','manifest.json'),JSON.stringify(manifest,null,2)+'\n');
