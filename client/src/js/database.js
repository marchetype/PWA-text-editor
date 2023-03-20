import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT Request');
  //connect to DB, select version in use, set up transaction, and open object store.
  const contactDb = await openDB('jate', 1);
  const transact = contactDb.transaction('jate', 'readwrite');
  const store = transact.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data has been saved!', result);

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET Request');
  //connect to DB, select verion in use, set up transaction, and open object store.
  const contactDb = await openDB('jate', 1);
  const transact = contactDb.transaction('jate', 'readonly');
  const store = transact.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
