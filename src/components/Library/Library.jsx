import React from "react";
import styles from "./Library.module.css";
import LibrarySong from "./LibrarySong/LibrarySong";

const Library = (props) => {
  return (
    <div className={[styles.Library, props.open ? styles.open : ""].join(" ")}>
      <h2>Library</h2>
      <div className={styles.librarySongs}>
        {props.songs.map((song) => (
          <LibrarySong
            song={song}
            key={song.id}
            currentSongSelect={props.currentSongSelect}
            playState={props.playState}
            currentSong={props.currentSong}
            setPlayingState={props.setPlayingState}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
