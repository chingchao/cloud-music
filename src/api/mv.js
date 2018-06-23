import axios from 'axios'
let url = 'www.zqblog.top:5000'

export function getRecommendMV () {
  return axios.get(url + '/mv/first?limit=20', {}).then(res => {
    return Promise.resolve(res)
  })
}

export function getNewMV () {
  return axios.get(url + '/personalized/mv', {}).then(res => {
    return Promise.reject(res)
  })
}
