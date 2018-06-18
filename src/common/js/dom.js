// 设置/获取 data 属性值
export function getData (el, name, val) {
  let attr = 'data-' + name
  if (val) {
    return el.setAttribute(attr, val)
  } else {
    return el.getAttribute(attr)
  }
}
