import axios from 'axios'
let url = 'http://www.zqblog.top:5000'

// 获取歌手列表
export function getSinger () {
  return axios.get(url + '/top/artists?offset=0&limit=100', {}).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌手详情
export function getSingerDetail (id) {
  return axios.get(url + '/artists?id=' + id, {}).then(res => {
    return Promise.resolve(res)
  })
}
