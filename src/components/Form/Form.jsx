import { useState } from 'react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css';

const ID = {
  nameInput: nanoid(),
  numberInput: nanoid(),
};

const Form = ({ contacts, addContact }) => {
  const [values, setValues] = useState({ name: '', number: '' });

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    if (name === 'name') setValues({ ...values, name: value });
    if (name === 'number') setValues({ ...values, number: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactsNames = contacts.map(({ name }) => name);

    if (contactsNames.includes(values.name)) {
      return toast.error(`${values.name} is already in contacts!`);
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    addContact(newContact);
    setValues({ name: '', number: '' });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={ID.nameInput}>
        Name
      </label>
      <input
        className={css.input}
        id={ID.nameInput}
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.label} htmlFor={ID.numberInput}>
        Number
      </label>
      <input
        className={css.input}
        id={ID.numberInput}
        type="tel"
        name="number"
        value={values.number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  addContact: PropTypes.func.isRequired,
};

export default Form;
