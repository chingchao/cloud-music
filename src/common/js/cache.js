import storage from 'good-storage'

const SEARCH_KEYS = 'search_keys'
const MAX_LENGTH = 5

// 新增搜索记录
export function addSearch (query) {
  let searchHistory = storage.get(SEARCH_KEYS, [])
  let index = searchHistory.findIndex(item => {
    return item === query
  })

  if (index > -1) {
    searchHistory.splice(index, 1)
  }
  searchHistory.unshift(query)

  if (searchHistory.length > MAX_LENGTH) {
    searchHistory.pop()
  }

  storage.set(SEARCH_KEYS, searchHistory)
  return searchHistory
}

// 获取搜索记录
export function loadSearch () {
  return storage.get(SEARCH_KEYS, [])
}

// 储存搜索记录
export function saveSearch (arr) {
  storage.set(SEARCH_KEYS, arr)
}
