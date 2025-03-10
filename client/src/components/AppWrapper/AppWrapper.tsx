import classes from './AppWrapper.module.scss';
import { PropsWithChildren } from 'react';

const AppWrapper = ({ children }: PropsWithChildren) => {
  return <div className={classes.container}>{children}</div>;
};

export default AppWrapper;