import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Storage from 'utils/localStorage';

const App = () => {
  const [contacts, setContacts] = useState(Storage.getContacts() ?? []);

  useEffect(() => Storage.setContacts(contacts), [contacts]);

  const addContact = newContact => {
    setContacts([...contacts, newContact]);
  };

  const deleteContact = e => {
    const deletedId = e.currentTarget.dataset.id;
    const filteredContacts = contacts.filter(({ id }) => id !== deletedId);

    setContacts(filteredContacts);
  };

  return (
    <>
      <Section>
        <Form contacts={contacts} addContact={addContact} />
        <Contacts contacts={contacts} deleteContact={deleteContact} />
      </Section>
      <ToastContainer position="top-left" autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
