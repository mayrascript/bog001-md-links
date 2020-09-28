const validation = require('./app/app');
const argv = require('minimist')(process.argv.slice(2));

function getFilePath(argv) {
  return argv._[0];
}

function getValidateTag(argv) {
  return !!argv.validate || false;
}

function main(argv) {
  const filePath = getFilePath(argv);
  const validateTag = getValidateTag(argv);

  return validation
    .init(filePath, {validate: validateTag})
    .then(res => console.log(JSON.stringify(res)))
    .catch(err => console.log(err));
}

main(argv);


module.exports = { getFilePath, getValidateTag, main}
