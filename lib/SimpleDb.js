const { writeFile, readFile, readdir } = require('fs/promises');
const path = require('path');


class SimpleDb {
  constructor(rootDir, fileId) {
    const fileName = `${fileId}.json`;
    this.jsonObj = path.join(rootDir, fileName);   
  }
    

  store(jsonFile) {
    const stringy = JSON.stringify(jsonFile);
    return writeFile(this.jsonObj, stringy);
  }
  //   the id is passed into the constructor instead of directly into the get()
  get() {
    return readFile(this.jsonObj)
      .then((obj) => JSON.parse(obj)).catch((error) => {
        if (error.code === 'ENOENT') {
          return null;
        }
        throw error;
      });

  }
  getAll() {
    return readdir(this.rootDir)
      .then((response) => Promise.all(
        response.map(item => readFile(path.join(this.rootDir, item))
          .then((response) => JSON.parse(response)))
      )); 
  }
 
}
module.exports = SimpleDb;



