const KEY_CONTACTS = 'contacts';

const setContacts = contacts => {
  try {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
  } catch (err) {
    console.error(err.stack);
  }
};

const getContacts = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY_CONTACTS));
  } catch (err) {
    console.error(err.stack);
  }
};

const Storage = {
  setContacts,
  getContacts,
};

export default Storage;
