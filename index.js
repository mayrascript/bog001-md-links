const validation = require('./validation');
const argv = require('minimist')(process.argv.slice(2));;

const filePath = argv._[0];
const validate = argv.validate || false;
console.log('filePath', filePath);
console.log(validate);

validation
  .init(filePath, {validate})
  .then(res => console.log(JSON.stringify(res)))
  .catch(err => console.log(err));
