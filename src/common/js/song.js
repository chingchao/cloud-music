export default class Song {
  // 歌曲列表
  constructor (item) {
    this.name = item.name
    this.id = item.id
    this.al_name = item.al ? item.al.name : item.album.name
    this.singers = item.ar ? item.ar.map(item => item.name).join('/') : item.artists.map(item => item.name).join('/')
    this.img = item.al ? item.al.picUrl : item.album.picUrl ? item.album.picUrl : ''
    this.url = 'http://music.163.com/song/media/outer/url?id=' + this.id + '.mp3'
  }
}

export class SearchSong {
  // 搜索结果列表
  constructor (item) {
    this.name = item.name
    this.id = item.id
    this.al_name = item.album.name
    this.singers = item.artists.map(item => item.name).join('/')
    this.img = ''
    this.album_id = item.album.id
    this.url = 'http://music.163.com/song/media/outer/url?id=' + this.id + '.mp3'
  }
}
