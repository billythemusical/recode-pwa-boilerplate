var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

console.log(obj.short_name)
process.exit()