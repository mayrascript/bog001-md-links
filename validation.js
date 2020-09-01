const init = (path, options = { validate: false}) => {
  return new Promise((resolve, reject) => {
    if(!path) {
      console.error('You must provide a file to find links')
      reject(new Error('You must provide a file to find links'));
    }

    return resolve(console.log('checking...'));


  });
};

exports.init = init;
