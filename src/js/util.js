
// 'ARIBJAAAAAAAAAA=' -> '0112012400000000000000'
const base64ToHex = str => {
  const raw = atob(str)
  const arr = []
  for (let i = 0, len = raw.length; i < len; i++) {
    const hex = raw.charCodeAt(i).toString(16)
    arr.push(`0${hex}`.substr(-2))
  }
  return arr.join('').toUpperCase()
}

// '0112012400000000000000' -> 'ARIBJAAAAAAAAAA='
const hexToBase64 = str => {
  const arr = []
  for (let i = 0, len = str.length; i < len; i += 2) {
    const hex = str.substr(i, 2)
    arr.push(parseInt(hex, 16))
  }
  const b = String.fromCharCode(...arr)
  return btoa(b)
}

module.exports = {
  base64ToHex,
  hexToBase64
}
