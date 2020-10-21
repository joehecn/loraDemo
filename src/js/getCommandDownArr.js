
/**
 * npx mqtt pub
 *  -t 'application/2/device/00137a100000b341/command/down'
 *  -h '120.78.85.4'
 *  -p '1883'
 *  -m '{"confirmed":true,"fPort":7,"data":"AkoAAAAAAAAAAAA="}'
 */

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
      // 01 4A 003C 003C 0064 000000
      '01': [
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
      ],
      // 024A000000000000000000
      '02': []
    },
    '34': {
      // 01 34 003C 003C 01 01F4 0014
      '01': [
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
      // 0234000000000000000000
      '02': [],
      // 03 34 01F4 00000000000000
      '03': [
        {
          name: 'OnDistanceThreshold',
          unit: 'mm',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        }
      ],
      // 0434000000000000000000
      '04': [],
      // 05 34 1388 00000000000000
      '05': [
        {
          name: 'FillMaxDistance',
          unit: 'mm',
          method: 'num',
          show: 'value',
          index: 4,
          length: 4
        }
      ],
      // 0634000000000000000000
      '06': []
    },
    '12': {
      // 01 4A 003C 003C 0064 000000
      '01': [
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
      ],
      // 0212000000000000000000
      '02': []
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
const shows = {
  value(value) {
    return value
  },
  deviceType(value) {
    return deviceTypeMap[value]
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

const getCommandDownArr = phy => {
  const preArr = getPreArr()
  getArrValue(phy, preArr)

  const deviceType = preArr[1].value
  const cmdId = preArr[0].value

  const subArrMap = getSubArrMap()
  const subArr = subArrMap[deviceType][cmdId]
  getArrValue(phy, subArr)

  return [...preArr, ...subArr]
}

module.exports = getCommandDownArr
