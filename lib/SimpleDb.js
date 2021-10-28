const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(rootDir) {
    const fileName = `${shortid.generate()}.json`;
    this.jsonObj = path.join(rootDir, fileName);   
  }
  

  store(jsonFile) {
    const stringy = JSON.stringify(jsonFile);
    return writeFile(this.jsonObj, stringy);
  }
  
  get() {
    return readFile(this.jsonObj, 'utf8').catch((error) => {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    });
  }
  parse(file) {
    return JSON.parse(file);
  }
}
module.exports = SimpleDb;
