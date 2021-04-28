import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Player.module.css";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setPlayingState,
  playingState,
  songs,
  setCurrentSong,
}) => {
  const [songTimeInfo, setSongTimeInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  useEffect(() => {
    console.log("useEffect");
    if (playingState) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [playingState, currentSong]);

  const audioEl = useRef(null);

  function playSongHandler() {
    audioEl.current.play();
    setPlayingState(true);
  }

  function pauseSongHandler() {
    audioEl.current.pause();
    setPlayingState(false);
  }

  function timeUpdateHandler(e) {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration ? e.target.duration : 0;
    const animationPercentage = Math.round((currentTime / duration) * 100);

    setSongTimeInfo({
      ...songTimeInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  }

  function dragSliderHandler(e) {
    audioEl.current.currentTime = e.target.value;
  }

  function endAudio(e) {
    e.target.currentTime = 0;
    setPlayingState(false);
  }

  function setPreviousSongHandler() {
    let currentSongIndex = songs.indexOf(currentSong);
    const prevSongIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;

    setCurrentSong(songs[prevSongIndex]);
  }
  function setNextSongHandler() {
    let currentSongIndex = songs.indexOf(currentSong);
    const nextSongIndex =
      currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;

    setCurrentSong(songs[nextSongIndex]);
  }

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className={styles.Player}>
      <div className={styles.timeControl}>
        <p>{getTime(songTimeInfo.currentTime)}</p>
        <div
          className={styles.track}
          style={{
            backgroundImage: `linear-gradient(to right, ${currentSong.colors[0]}, ${currentSong.colors[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songTimeInfo.duration}
            value={songTimeInfo.currentTime}
            onChange={dragSliderHandler}
          />
          <div
            className={styles.animateTrack}
            style={{
              transform: `translateX(${songTimeInfo.animationPercentage}%)`,
            }}
          />
        </div>
        <p>{getTime(songTimeInfo.duration)}</p>
      </div>
      <div className={styles.playControl}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          onClick={setPreviousSongHandler}
        />
        <FontAwesomeIcon
          icon={playingState ? faPause : faPlay}
          size="2x"
          onClick={playingState ? pauseSongHandler : playSongHandler}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          onClick={setNextSongHandler}
        />
      </div>
      <audio
        ref={audioEl}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={endAudio}
        src={currentSong.audio}
      >
        <source src={currentSong.audio} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Player;
