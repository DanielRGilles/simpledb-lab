const { mkdir, rm } = require('fs/promises');
const SimpleDb = require('../lib/SimpleDb.js');

describe('SimpleDb', () => {
  const rootDir = './__tests__/store';
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => mkdir(rootDir, { recursive: true }));
  });

  it('should save a json file in the store dir', () => {

    const storeHouse = new SimpleDb(rootDir);
    const jsonFile = { 'id': '1', 'name':'ruby!' } ;

    return storeHouse
      .store(jsonFile)
      .then(() => storeHouse.get())
      .then((gotFile) => storeHouse.parse(gotFile))
      .then((retrievedFile) => expect(retrievedFile).toEqual(jsonFile));
  });


});
