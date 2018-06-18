export default class Song {
  constructor (item) {
    this.name = item.name
    this.id = item.aid
    this.al_name = item.al.name
    this.singers = item.ar.map(item => item.name).join('/')
    this.img = item.al.picUrl
    this.url = 'http://music.163.com/song/media/outer/url?id=' + this.id + '.mp3'
  }
}
