import PropTypes from 'prop-types';
import css from './Notification.module.css';

const Notification = ({ text = 'There are no contacts' }) => (
  <p className={css.info}>{text}</p>
);

Notification.propTypes = {
  text: PropTypes.string,
};

export default Notification;
