export default class CreateRankDetail {
  constructor (item, idx) {
    this.idx = idx
    this.name = item.name
    this.coverImgUrl = item.coverImgUrl
    this.songList = item.tracks
    this.rankSongList = item.tracks.slice(0, 3)
    this.updateTime = item.updateTime
    this.songCount = item.trackCount
    this.subscribedCount = item.subscribedCount
  }
}
