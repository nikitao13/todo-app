import classes from './Header.module.scss';
import { MdOutlineTaskAlt } from 'react-icons/md';

const Header = () => {
  return (
    <div className={classes.container}>
      <h1>taskly</h1>
      <MdOutlineTaskAlt size={22} className={classes.icon} />
    </div>
  );
};
export default Header;
