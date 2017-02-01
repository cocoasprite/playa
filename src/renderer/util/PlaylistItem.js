import md5 from 'md5';
import AudioMetadata from './AudioMetadata';

export default class PlaylistItem {
  constructor({ metadata = {}, duration = 0, filename, disabled = false }) {
    this.metadata = metadata;
    this.duration = duration;
    this.filename = filename;
    this.disabled = disabled;
    this.id = `t_${md5(this.filename)}`;
    this.audioMetadata = null;
  }
  formattedTitle() {
    return `${this.metadata.artist} - ${this.metadata.title}`;
  }
  getDiscNumber() {
    return this.disabled ? 0 : Math.max(1, +this.metadata.disk.no);
  }
  serializeForRemote() {
    if (this.disabled) {
      return {};
    }
    return {
      id: this.id,
      title: this.metadata.title,
      artist: this.metadata.artist,
      track: this.metadata.track,
      duration: this.duration,
      audioMetadata: this.audioMetadata,
    };
  }
  loadAudioMetadata() {
    if (!this.audioMetadata) {
      const audioMetadata = new AudioMetadata({
        filename: this.filename,
      });
      return audioMetadata.load().then(() => {
        this.audioMetadata = audioMetadata.toJSON();
        return this;
      });
    }
    return Promise.resolve(this);
  }
}
