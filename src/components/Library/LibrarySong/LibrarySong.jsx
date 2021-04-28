import React from "react";
import styles from "./LibrarySong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const LibrarySong = (props) => {
  const { name, artist, cover, album, id } = props.song;

  function selectLibrarySongHandler() {
    if (props.currentSong.id === id) {
      props.playState
        ? props.setPlayingState(false)
        : props.setPlayingState(true);
    } else {
      props.currentSongSelect(props.song);
    }
  }

  return (
    <div
      className={[
        styles.LibrarySong,
        props.song.active ? styles.selected : "",
      ].join(" ")}
      onClick={selectLibrarySongHandler}
    >
      <div
        className={[styles.image, props.playState ? styles.playing : ""].join(
          " "
        )}
      >
        <img src={cover} alt={album} />
        <FontAwesomeIcon icon={faPlay} className={styles.imagePlayIcon} />
        <FontAwesomeIcon icon={faPause} className={styles.imagePauseIcon} />
      </div>
      <div className={styles.songInfo}>
        <h5>{name}</h5>
        <h6>{artist}</h6>
      </div>
    </div>
  );
};

export default LibrarySong;
