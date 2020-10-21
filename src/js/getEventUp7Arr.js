
const getPreArr = () => {
  return [
    {
      name: 'CmdID',
      unit: '',
      method: 'value',
      show: 'value',
      index: 0,
      length: 2
    },
    {
      name: 'DeviceType',
      unit: '',
      method: 'value',
      show: 'deviceType',
      index: 2,
      length: 2
    }
  ]
}

const getSubArrMap = () => {
  return {
    '4A': {
      '81': [
        {
          name: 'Status',
          unit: '',
          method: 'num',
          show: 'statusSuccess',
          index: 4,
          length: 2
        }
      ],
      // 82 4A 0384 0384 0064 000000 gkoDhAOEAGQAAAA=
      '82': [
        {
          name: 'MinTime',
          unit: 's',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        },
        {
          name: 'MaxTime',
          unit: 's',
          method: 'num',
          show: 'value',
          index: 8,
          length: 4
        },
        {
          name: 'CurrentChange',
          unit: 'mA',
          method: 'num',
          show: 'value',
          index: 12,
          length: 4
        }
      ]
    },
    '34': {
      '81': [
        {
          name: 'Status',
          unit: '',
          method: 'num',
          show: 'statusSuccess',
          index: 4,
          length: 2
        }
      ],
      '82': [
        {
          name: 'MinTime',
          unit: 's',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        },
        {
          name: 'MaxTime',
          unit: 's',
          method: 'num',
          show: 'value',
          index: 8,
          length: 4
        },
        {
          name: 'BatteryChange',
          unit: '0.1V',
          method: 'num',
          show: 'value',
          index: 12,
          length: 2
        },
        {
          name: 'DistanceChange',
          unit: 'mm',
          method: 'num',
          show: 'value',
          index: 14,
          length: 4
        },
        {
          name: 'TemperatureChange',
          unit: '0.1°C',
          method: 'num',
          show: 'value',
          index: 18,
          length: 4
        }
      ],
      '83': [
        {
          name: 'Status',
          unit: '',
          method: 'num',
          show: 'statusSuccess',
          index: 4,
          length: 2
        }
      ],
      '84': [
        {
          name: 'OnDistanceThreshold',
          unit: 'mm',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        }
      ],
      '85': [
        {
          name: 'Status',
          unit: '',
          method: 'num',
          show: 'statusSuccess',
          index: 4,
          length: 2
        }
      ],
      '86': [
        {
          name: 'FillMaxDistance',
          unit: 'mm',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        }
      ]
    },
    '12': {
      '81': [
        {
          name: 'Status',
          unit: '',
          method: 'num',
          show: 'statusSuccess',
          index: 4,
          length: 2
        }
      ],
      // 82 4A 0384 0384 0064 000000 gkoDhAOEAGQAAAA=
      '82': [
        {
          name: 'MinTime',
          unit: 's',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        },
        {
          name: 'MaxTime',
          unit: 's',
          method: 'num',
          show: 'value',
          index: 8,
          length: 4
        },
        {
          name: 'BatteryChange',
          unit: '0.1V',
          method: 'num',
          show: 'value',
          index: 12,
          length: 2
        }
      ]
    }
  }
}

const methods = {
  value(value) {
    return value
  },
  //         'WaterLeak1' 'status1'
  // '00': 0 'noLeak1'    'off'
  // '01': 1 'Leak1'      'on'
  // '02': 2
  // 'FF': 255
  num(value) {
    return parseInt(value, 16)
  }
}

/**
 * 电表
 * 4A R718N37 外接75A 开环CT（三相总和225A）
 * 垃圾桶
 * 34 R718X
 * 水表
 * 12 R718WB
 */
const deviceTypeMap = {
  // 0  2  4  6
  '4A': 'R718N37', // 01 4A 01 24 0000 0000 0000 01  014A012400000000000001
  // 01 4A 02 24 01 01 0000000000    014A022401010000000000
  '34': 'R718X',   // 01 34 01 24 00 00E3 00F1 5F 16
  '12': 'R718WB'   // 01 12 01 24 00000000000000
}
const showBool = (num, fValue, tValue) => {
  if (num === 0) return fValue
  if (num === 1) return tValue
  return num
}
const shows = {
  value(value) {
    return value
  },
  deviceType(value) {
    return deviceTypeMap[value]
  },
  statusSuccess(value) {
    return showBool(value, 'success', 'fail')
  }
}

const getArrValue = (phy, arr) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]
    const { index, length } = item
    const str = phy.substr(index, length)

    const method = methods[item.method]
    item.value = method(str)

    const show = shows[item.show]
    item.sValue = show(item.value)
  }
}

const getEventUp7Arr = phy => {
  const preArr = getPreArr()
  getArrValue(phy, preArr)

  const deviceType = preArr[1].value
  const cmdId = preArr[0].value

  const subArrMap = getSubArrMap()
  const subArr = subArrMap[deviceType][cmdId]
  getArrValue(phy, subArr)

  return [...preArr, ...subArr]
}

module.exports = getEventUp7Arr
