"use babel"

var React = require('react')
var _ = require('lodash')
var PlaybackBar = require('./player/PlaybackBar.jsx')
var Playlist = require('./playlist/Playlist.jsx')

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PlaylistStore = require('../stores/PlaylistStore')
var PlayerStore = require('../stores/PlayerStore')

var Loader = require('../util/Loader')
var loader = new Loader()

function getPlaylistState(){
  return {
    items: PlaylistStore.getAll(),
    playlist: PlaylistStore.getPlaylist()
  }  
}

function getPlayerState(){
  return {
    playbackInfo: PlayerStore.getPlaybackInfo()
  }
}

module.exports = React.createClass({
  getInitialState: function() {
    return _.merge(getPlayerState(), getPlaylistState());
  },
  componentDidMount: function() {
    PlaylistStore.addChangeListener(this._onPlaylistChange);
    PlayerStore.addChangeListener(this._onPlayerChange);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onPlaylistChange);
    PlayerStore.removeChangeListener(this._onPlayerChange)
  },  
  render: function() {
    return (
      <div className="playa-main">
        <PlaybackBar playlist={this.state.playlist} playbackInfo={this.state.playbackInfo}/>
        <Playlist className="playa-playlist-main" items={this.state.items}/>
      </div>
    );
  },
  _onPlaylistChange: function() {
    this.setState(getPlaylistState());
  },
  _onPlayerChange: function(){
    this.setState(getPlayerState());
  }  
})