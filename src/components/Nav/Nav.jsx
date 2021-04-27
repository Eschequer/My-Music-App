import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from "./Nav.module.css";

const Nav = (props) => {
  return (
    <nav className={styles.Nav}>
      <h1>Waves</h1>
      <button onClick={props.toggleLibrary}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
