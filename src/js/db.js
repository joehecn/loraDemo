
const getList = listName => {
  const jsonStr = localStorage.getItem(listName) || '[]'
  return JSON.parse(jsonStr)
}
const setItemToList = (listName, item) => {
  const list = getList(listName)
  list.push(item)
  localStorage.setItem(listName, JSON.stringify(list))
  return list
}
const delList = listName => {
  localStorage.removeItem(listName)
}

const getValue = key => {
  return localStorage.getItem(key) || ''
}
const setValue = (key, value) => {
  localStorage.setItem(key, value)
}

module.exports = {
  getValue,
  setValue,

  getList,
  setItemToList,
  delList
}