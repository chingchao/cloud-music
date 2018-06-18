import axios from 'axios'

let url = 'http://zqblog.top:5000'

// 官方榜
export function getRank (idx) {
  return axios.get(url + '/top/list?idx=' + idx, {}).then(res => {
    return Promise.resolve(res)
  })
}

// 歌手榜
export function getSinger () {
  return axios.get(url + '/top/artists?offset=0&limit=100', {}).then(res => {
    return Promise.resolve(res)
  })
}
