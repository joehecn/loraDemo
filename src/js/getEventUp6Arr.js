
const getPreArr = () => {
  return [
    {
      name: 'Version',
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
    },
    {
      name: 'ReportType',
      unit: '',
      method: 'value',
      show: 'value',
      index: 4,
      length: 2
    }
  ]
}
const getSubArrMap = () => {
  return {
    '4A': {
      '00': [
        {
          name: 'SoftwareVersion',
          unit: '',
          method: 'value',
          show: 'value',
          index: 6,
          length: 2
        },
        {
          name: 'HardwareVersion',
          unit: '',
          method: 'value',
          show: 'value',
          index: 8,
          length: 2
        },
        {
          name: 'DateCode',
          unit: '',
          method: 'value',
          show: 'value',
          index: 10,
          length: 8
        }
      ],
      '01': [
        {
          name: 'battery',
          unit: 'V',
          method: 'battery',
          show: 'battery',
          index: 6,
          length: 2
        },
        {
          name: 'a_current',
          unit: 'mA',
          method: 'bigNum',
          show: 'bigNum',
          index: 8,
          length: 4
        },
        {
          name: 'b_current',
          unit: 'mA',
          method: 'bigNum',
          show: 'bigNum',
          index: 12,
          length: 4
        },
        {
          name: 'c_current',
          unit: 'mA',
          method: 'bigNum',
          show: 'bigNum',
          index: 16,
          length: 4
        },
        {
          name: 'Mulitplier1',
          unit: '',
          method: 'num',
          show: 'value',
          index: 20,
          length: 2
        }
      ],
      '02': [
        {
          name: 'battery',
          unit: 'V',
          method: 'battery',
          show: 'battery',
          index: 6,
          length: 2
        },
        {
          name: 'Mulitplier2',
          unit: '',
          method: 'num',
          show: 'value',
          index: 8,
          length: 2
        },
        {
          name: 'Mulitplier3',
          unit: '',
          method: 'num',
          show: 'value',
          index: 10,
          length: 2
        }
      ]
    },
    '34': {
      '00': [
        {
          name: 'SoftwareVersion',
          unit: '',
          method: 'value',
          show: 'value',
          index: 6,
          length: 2
        },
        {
          name: 'HardwareVersion',
          unit: '',
          method: 'value',
          show: 'value',
          index: 8,
          length: 2
        },
        {
          name: 'DateCode',
          unit: '',
          method: 'value',
          show: 'value',
          index: 10,
          length: 8
        }
      ],
      '01': [
        {
          name: 'battery',
          unit: 'V',
          method: 'battery',
          show: 'battery',
          index: 6,
          length: 2
        },
        {
          name: 'status1',
          unit: '',
          method: 'num',
          show: 'status',
          index: 8,
          length: 2
        },
        {
          name: 'Distance',
          unit: 'mm',
          method: 'bigNum',
          show: 'bigNum',
          index: 10,
          length: 4
        },
        {
          name: 'temperature3',
          unit: '°C',
          method: 'temperature',
          show: 'fixedValue',
          index: 14,
          length: 4
        },
        {
          name: 'FillLevel',
          unit: '%',
          method: 'num',
          show: 'value',
          index: 18,
          length: 2
        },
        // 有效倾角范围大约在正负120度之间
        {
          name: 'angle_of_Inclination',
          unit: '°',
          method: 'angle',
          show: 'value',
          index: 20,
          length: 2
        }
      ]
    },
    '12': {
      '00': [
        {
          name: 'SoftwareVersion',
          unit: '',
          method: 'value',
          show: 'value',
          index: 6,
          length: 2
        },
        {
          name: 'HardwareVersion',
          unit: '',
          method: 'value',
          show: 'value',
          index: 8,
          length: 2
        },
        {
          name: 'DateCode',
          unit: '',
          method: 'value',
          show: 'value',
          index: 10,
          length: 8
        }
      ],
      '01': [
        {
          name: 'battery',
          unit: 'V',
          method: 'battery',
          show: 'battery',
          index: 6,
          length: 2
        },
        {
          name: 'WaterLeak1',
          unit: '',
          method: 'num',
          show: 'waterLeak',
          index: 8,
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
  },
  // '00': 0   0.00   0.00
  // '7F': 127 12.70  12.70
  // '80': 128 -0.00  0.00 (LowBattery)
  // 'FF': 255 -12.70 12.70 (LowBattery)
  battery(value) {
    const v = parseInt(value, 16)
    if (v > 127) {
      // 此算式不能再简化，要考虑 -0 的情况
      return -((v - 128) / 10)
    }
    return v / 10
  },
  // '0000' 0
  // 'FFFE' 65534
  // 'FFFF' NaN   'NA'
  bigNum(value) {
    if (value === 'FFFF') return NaN
    return parseInt(value, 16)
  },
  // '0000': 0     0.00
  // '7FFF': 32767 3276.70
  // '8000': 32768 -3276.80
  // 'FFFF': 65535 -0.10
  temperature(value) {
    const v = parseInt(value, 16)
    if (v > 32767) {
      return (v - 65536) / 10
    }
    return v / 10
  },
  angle(value) {
    const v = parseInt(value, 16)
    if (v > 127) {
      return v - 256
    }
    return v
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
//判断是否为负数, 包含 -0 判断
const isNegative = num => {
  return num < 0 || 1 / num === -Infinity
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
  fixedValue(value) {
    return value.toFixed(2)
  },
  deviceType(value) {
    return deviceTypeMap[value]
  },
  battery(value) {
    const v = Math.abs(value).toFixed(2)
    if (isNegative(value)) {
      return `${v} <span class="high-light">(LowBattery)</span>`
    }
    return v
  },
  waterLeak(value) {
    return showBool(value, 'noLeak1', 'Leak1')
  },
  status(value) {
    return showBool(value, 'off', 'on')
  },
  bigNum(value) {
    if (isNaN(value)) return 'NA'
    return value.toString()
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

const getEventUp6Arr = phy => {
  const preArr = getPreArr()
  getArrValue(phy, preArr)

  const deviceType = preArr[1].value
  const reportType = preArr[2].value

  const subArrMap = getSubArrMap()
  const subArr = subArrMap[deviceType][reportType]
  getArrValue(phy, subArr)

  return [...preArr, ...subArr]
}

module.exports = getEventUp6Arr
