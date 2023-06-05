import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ text = 'Find contacts by name', filter, setFilter }) => (
  <>
    <p className={css.text}>{text}</p>
    <input
      className={css.filter}
      type="text"
      name="filter"
      value={filter}
      onChange={setFilter}
    />
  </>
);

Filter.propTypes = {
  text: PropTypes.string,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
