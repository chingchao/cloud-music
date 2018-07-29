import axios from 'axios'
let url = 'http://zqblog.top:5000'

export function hotSearch () {
  return axios.get(url + '/search/hot', {}).then(res => {
    return Promise.resolve(res)
  })
}

export function searchFn (keywrods, pageSize, pageIndex) {
  return axios.get(url + `/search?keywords=${keywrods}&limit=${pageSize}&offset=${(pageIndex - 1) * pageSize}`, {}).then(res => {
    return Promise.resolve(res)
  })
}
