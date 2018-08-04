import React from 'react';
import styles from './Page.css';

const Page = (props) => {
  return(
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default Page;