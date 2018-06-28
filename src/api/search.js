import axios from 'axios'
let url = 'http://zqblog.top:5000'

export function hotSearch () {
  return axios.get(url + '/search/hot', {}).then(res => {
    return Promise.resolve(res)
  })
}

export function searchFn (keywrods) {
  return axios.get(url + '/search?keywords=' + keywrods, {}).then(res => {
    return Promise.resolve(res)
  })
}
