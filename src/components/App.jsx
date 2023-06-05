import { Component } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Storage from 'utils/localStorage';

class App extends Component {
  state = {
    contacts: Storage.getContacts() ?? [],
  };

  componentDidUpdate() {
    Storage.setContacts(this.state.contacts);
  }

  setContact = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  deleteContact = e => {
    const deletedId = e.currentTarget.dataset.id;

    this.setState(({ contacts }) => {
      const filteredContacts = contacts.filter(({ id }) => id !== deletedId);
      return { contacts: filteredContacts };
    });
  };

  render() {
    const { contacts } = this.state;

    return (
      <Section>
        <Form contacts={contacts} setContact={this.setContact} />
        <Contacts contacts={contacts} deleteContact={this.deleteContact} />
      </Section>
    );
  }
}

export default App;
