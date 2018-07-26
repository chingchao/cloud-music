export default class Song {
  // 普通歌曲列表/搜索结果列表
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
  // 普通歌曲列表/搜索结果列表
  constructor (item) {
    this.name = item.name
    this.id = item.id
    this.al_name = item.album.name
    this.singers = item.artists.map(item => item.name).join('/')
    this.img = `http://p3.music.126.net/dBrQq62j8s68s2hQc1O7rg==/${item.album.picId}.jpg`
    this.url = 'http://music.163.com/song/media/outer/url?id=' + this.id + '.mp3'
  }
}
