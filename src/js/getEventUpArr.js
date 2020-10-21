
const getEventUp6Arr = require('./getEventUp6Arr.js')
const getEventUp7Arr = require('./getEventUp7Arr.js')

const getEventUpArr = (phy, fPort) => {
  switch (fPort) {
    case 6:
      return getEventUp6Arr(phy)
    default:
      return getEventUp7Arr(phy)
  }
}

module.exports = getEventUpArr
