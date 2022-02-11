// 封装localstorage
import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

// =================book的缓存逻辑=========================
// 每本电子书都开一个local空间单独存储
export function setBookObject(fileName, key, value) {
  // 逻辑,先判断有没有存储
  let book = getLocalStorage(`${fileName}--info`)

  // 如果没有,则初始化该书存储
  if (!book) {
    book = {}
  }
  // 然后将数据key-value存储到book对象
  // 再将book对象作为val存储到local中
  book[key] = value
  setLocalStorage(`${fileName}--info`, book)
}

// 获取book
export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}--info`)
  // 不存在,则缓存
  if (book) {
    return book[key]
  } else {
    return null
  }
}

// 获取缓存字体
export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily')
}

// 保存缓存字体
export function saveFontFamily(fileName, font) {
  return setBookObject(fileName, 'fontFamily', font)
}

// 字体size
export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}
