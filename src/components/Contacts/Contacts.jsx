import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import Filter from 'components/Filter/Filter';
import ContactsItem from 'components/ContactsItem/ContactsItem';
import Notification from 'components/Notification/Notification';

const Contacts = ({ title = 'Contacts', contacts, deleteContact }) => {
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = (contacts, filter) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().trim().startsWith(filter.toLowerCase().trim())
    );

  return (
    <>
      <h2 className={css.title}>{title}</h2>
      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} handleChange={handleChange} />
          <ul className={css.contacts}>
            {!filter.trim() ? (
              <ContactsItem contacts={contacts} deleteContact={deleteContact} />
            ) : (
              <ContactsItem
                contacts={getFilteredContacts(contacts, filter)}
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
};

Contacts.propTypes = {
  title: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contacts;
