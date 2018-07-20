import axios from 'axios'
let url = 'http://www.zqblog.top:5000'

// 获取歌词
export const getLyric = id => {
  return axios.get(url + '/lyric?id=' + id, {}).then(res => {
    return Promise.resolve(res)
  })
}
