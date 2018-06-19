import axios from 'axios'

let url = 'http://zqblog.top:5000'

// 榜单详情
export function getRank (idx) {
  return axios.get(url + '/top/list?idx=' + idx, {}).then(res => {
    return Promise.resolve(res)
  })
}
