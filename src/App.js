import React from "react";
import styles from "./App.module.css";
import Player from "./components/Player/Player";
import Song from "./components/Song/Song";
import { chillHop } from "./util";
import Library from "./components/Library/Library";
import Nav from "./components/Nav/Nav";

const listOfSongs = chillHop();
const currentSong = listOfSongs[0];
currentSong.active = true;

class App extends React.Component {
  state = {
    listOfSongs: listOfSongs,
    currentSong,
    isPlaying: false,
    libraryIsOpen: false,
  };

  currentSongSelectHandler = (song) => {
    this.setState((prevState) => {
      prevState.currentSong.active = false;
      song.active = true;

      return { currentSong: song, isPlaying: true };
    });
  };

  setPlayingStateHandler = (state) => this.setState({ isPlaying: state });

  toggleLibraryStateHandler = () => {
    this.setState((prevState) => {
      return { libraryIsOpen: !prevState.libraryIsOpen };
    });
  };

  render() {
    return (
      <div
        className={[
          styles.App,
          this.state.libraryIsOpen ? styles.openedLibrary : "",
        ].join(" ")}
      >
        <Nav
          toggleLibrary={this.toggleLibraryStateHandler}
          libraryIsOpen={this.state.libraryIsOpen}
        />
        <Song song={this.state.currentSong} />
        <Player
          currentSong={this.state.currentSong}
          setPlayingState={this.setPlayingStateHandler}
          playingState={this.state.isPlaying}
          songs={this.state.listOfSongs}
          setCurrentSong={this.currentSongSelectHandler}
        />
        <Library
          songs={this.state.listOfSongs}
          currentSongSelect={this.currentSongSelectHandler}
          playState={this.state.isPlaying}
          open={this.state.libraryIsOpen}
          currentSong={this.state.currentSong}
          setPlayingState={this.setPlayingStateHandler}
        />
      </div>
    );
  }
}

export default App;
