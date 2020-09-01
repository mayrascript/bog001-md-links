const fs = require('fs')
const pathExt = require('path');
const marked = require('marked');


const init = (path, options = { validate: false}) => {
  return new Promise((resolve, reject) => {

    if(!path) {
      console.error('You must provide a file to find links')
      reject(new Error('You must provide a file to find links'));
    }
    const isValidExt = pathExt.extname(path) === '.md';

    if(!isValidExt) {
      reject(new Error('The file extension is invalid'));
    }

    if(!fs.existsSync(path)) {
      reject(new Error('The file path is invalid'));
    }

    const markdown = fs.readFileSync(path).toString();

    const links = [];

    const renderer = new marked.Renderer();

    renderer.link = function (href, title, text) {
      links.push({href, text, file: path});
    };

    marked(markdown, { renderer: renderer });

    return resolve(links);

  });
};

exports.init = init;
