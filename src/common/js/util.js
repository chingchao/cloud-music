function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (a) {
  let arr = [].concat(a)
  for (let i = 0; i < arr.length; i++) {
    let j = getRandom(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return [].concat(arr)
}
