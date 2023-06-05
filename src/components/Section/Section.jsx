import PropTypes from 'prop-types';
import css from './Section.module.css';

const Section = ({ title = 'Phonebook', children }) => (
  <section className={css.section}>
    <h1 className={css.title}>{title}</h1>
    {children}
  </section>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
