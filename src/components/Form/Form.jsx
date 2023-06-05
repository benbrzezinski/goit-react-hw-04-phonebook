import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import css from './Form.module.css';

class Form extends Component {
  static id = {
    nameInput: nanoid(),
    numberInput: nanoid(),
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { contacts, setContact } = this.props;

    const contactsNames = contacts.map(({ name }) => name);

    if (contactsNames.includes(name)) {
      return Notify.failure(`${name} is already in contacts!`, {
        position: 'left-top',
        distance: '45px',
        clickToClose: true,
        fontSize: '14px',
        cssAnimationStyle: 'from-top',
      });
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContact(newContact);
    this.setState(() => ({ name: '', number: '' }));
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor={Form.id.nameInput}>
          Name
        </label>
        <input
          className={css.input}
          id={Form.id.nameInput}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label} htmlFor={Form.id.numberInput}>
          Number
        </label>
        <input
          className={css.input}
          id={Form.id.numberInput}
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  setContact: PropTypes.func.isRequired,
};

export default Form;
