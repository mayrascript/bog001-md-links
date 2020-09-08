const fs = require('fs')
const pathExt = require('path');
const marked = require('marked');
const urlExists = require('url-exists');


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

    renderer.link = (href, title, text) => {
      const link = {href, text, file: path};
      links.push(link);
    };

    marked(markdown, { renderer: renderer });

    if(!!options.validate) {
      for(let i = 0; i < links.length; i ++) {
        const link = links[i];
        const url = link.href;
        const callback = (err, exists) => {
          const isIterationDone = i === links.length - 1;
          link.status = exists ? 200 : 404;
          link.ok = exists;
          if(isIterationDone) {
            return resolve(links);
          }
        };
        urlExists(url, callback)
      }
    } else {
      return resolve(links);
    }

  });
};

exports.init = init;
