const { writeFile, readFile, readdir } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;  
  }  
  store(jsonFile) {
    const id = shortid.generate();
    jsonFile['id'] = id;
    const fileName = `${id}.json`;
    this.jsonObj = path.join(this.rootDir, fileName); 
    const stringy = JSON.stringify(jsonFile);
    return writeFile(this.jsonObj, stringy);
  }
  get(id) {
    const fileName = `${id}.json`;
    this.jsonObj = path.join(this.rootDir, fileName); 
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
        response.map(async json => {
          const file = await readFile(path.join(this.rootDir, json));
          return JSON.parse(file);
        }
        )));
  }}
module.exports = SimpleDb;



