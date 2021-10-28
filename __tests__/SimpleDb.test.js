const { mkdir, rm } = require('fs/promises');
const SimpleDb = require('../lib/SimpleDb.js');
const shortid = require('shortid');

describe('SimpleDb', () => {
  const rootDir = './__tests__/store';
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => mkdir(rootDir, { recursive: true }));
  });

  it('should save a json file in the store dir and then retrieve', () => {
    const shortyId = shortid.generate();
    const storeHouse = new SimpleDb(rootDir, shortyId);
    const jsonFile = { id: `${shortyId}`, name:'ruby!' } ;

    return storeHouse
      .store(jsonFile)
      .then(() => storeHouse.get())
      .then((retrievedFile) => expect(retrievedFile).toEqual(jsonFile));
  });

  it('should return null for this one since nothing is being stored ', () => {
    const shortyId = shortid.generate();
    const storeHouse = new SimpleDb(rootDir, shortyId);
    return storeHouse
      .get()
      .then((retrievedFile) => expect(retrievedFile).toEqual(null));

  });
  it('should return an array of objects that come from the files in the dir', () => {
    const jsonFile = { id: `${shortid.generate()}`, name:'ruby!' } ;
    const storeHouse = new SimpleDb(rootDir, jsonFile.id);

    return storeHouse
      .store(jsonFile)
      .then(() => storeHouse.store(jsonFile))
      .then(() => storeHouse.store(jsonFile))
      .then(() => storeHouse.store(jsonFile))
      .then(() => storeHouse.getAll())
      .then((retrievedFile) => expect(retrievedFile).toEqual(jsonFile));
  });

});
