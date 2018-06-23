import axios from 'axios'
let url = 'http://www.zqblog.top:5000'

export function getRecommendMV () {
  return axios.get(url + '/mv/first?limit=20', {}).then(res => {
    return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
  })
}

export function getNewMV () {
  return axios.get(url + '/personalized/mv', {}).then(res => {
    return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
  })
}
