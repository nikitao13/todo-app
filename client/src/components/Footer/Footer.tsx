import classes from './Footer.module.scss';
import { BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className={classes.container}>
      <p>made by nikita o'keeffe</p>
      <BsGithub className={classes.icon} />
    </div>
  );
};
export default Footer;
