import React from "react";
import styles from "./Song.module.css";

const Song = (props) => {
  const { name, artist, cover, album } = props.song;

  return (
    <div className={styles.Song}>
      <img src={cover} alt={album} />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  );
};

export default Song;
