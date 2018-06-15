import axios from 'axios'

// 精品歌单列表
export const getRecommend = () => {
  return axios.get('http://zqblog.top:5000/top/playlist/highquality', {}).then((res) => {
    return Promise.resolve(res)
  })
}

// 精品歌单详情
export const getRecommendDetail = id => {
  return axios.get('http://zqblog.top:5000/playlist/detail?id=' + id, {}).then((res) => {
    return Promise.resolve(res)
  })
}
