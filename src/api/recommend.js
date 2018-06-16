import axios from 'axios'

let url = 'http://zqblog.top:5000'

// banner
export const getBanner = () => {
  return axios.get(url + '/banner', {}).then(res => {
    return Promise.resolve(res)
  })
}

// 精品歌单列表
export const getRecommend = () => {
  return axios.get(url + '/top/playlist/highquality?limit=50', {}).then((res) => {
    return Promise.resolve(res)
  })
}

// 精品歌单详情
export const getRecommendDetail = id => {
  return axios.get(url + '/playlist/detail?id=' + id, {}).then((res) => {
    return Promise.resolve(res)
  })
}
