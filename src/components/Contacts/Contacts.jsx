import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import Filter from 'components/Filter/Filter';
import ContactsItem from 'components/ContactsItem/ContactsItem';
import Notification from 'components/Notification/Notification';

class Contacts extends Component {
  state = {
    filter: '',
  };

  setFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState(() => ({ [name]: value }));
  };

  getFilteredContacts = (filter, contacts) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().trim().startsWith(filter.toLowerCase().trim())
    );

  render() {
    const { filter } = this.state;
    const { title = 'Contacts', contacts, deleteContact } = this.props;

    return (
      <>
        <h2 className={css.title}>{title}</h2>
        {contacts.length > 0 ? (
          <>
            <Filter filter={filter} setFilter={this.setFilter} />
            <ul className={css.contacts}>
              {!filter.trim() ? (
                <ContactsItem
                  contacts={contacts}
                  deleteContact={deleteContact}
                />
              ) : (
                <ContactsItem
                  contacts={this.getFilteredContacts(filter, contacts)}
                  deleteContact={deleteContact}
                />
              )}
            </ul>
          </>
        ) : (
          <Notification />
        )}
      </>
    );
  }
}

Contacts.propTypes = {
  title: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contacts;
