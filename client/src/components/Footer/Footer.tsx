import classes from './Footer.module.scss';
import { BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className={classes.container}>
      <p>made by nikita o'keeffe</p>
      <a
        href="https://github.com/nikitao13"
        className={classes.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub className={classes.icon} />
      </a>
    </div>
  );
};
export default Footer;
