
const getEventUpArr = require('./getEventUpArr.js')

const arr = [
  [
    '013401800200CA80005F80',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '34',
        sValue: 'R718X'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: -0,
        sValue: '0.00 <span class="high-light">(LowBattery)</span>'
      },
      {
        name: 'status1',
        unit: '',
        method: 'num',
        show: 'status',
        index: 8,
        length: 2,
        value: 2,
        sValue: 2
      },
      {
        name: 'Distance',
        unit: 'mm',
        method: 'bigNum',
        show: 'bigNum',
        index: 10,
        length: 4,
        value: 202,
        sValue: '202'
      },
      {
        name: 'temperature3',
        unit: '°C',
        method: 'temperature',
        show: 'fixedValue',
        index: 14,
        length: 4,
        value: -3276.8,
        sValue: '-3276.80'
      },
      {
        name: 'FillLevel',
        unit: '%',
        method: 'num',
        show: 'value',
        index: 18,
        length: 2,
        value: 95,
        sValue: 95
      },
      {
        name: 'angle_of_Inclination',
        unit: '°',
        method: 'angle',
        show: 'value',
        index: 20,
        length: 2,
        value: -128,
        sValue: -128
      }
    ]
  ],
  [
    '013401800100CA80005F80',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '34',
        sValue: 'R718X'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: -0,
        sValue: '0.00 <span class="high-light">(LowBattery)</span>'
      },
      {
        name: 'status1',
        unit: '',
        method: 'num',
        show: 'status',
        index: 8,
        length: 2,
        value: 1,
        sValue: 'on'
      },
      {
        name: 'Distance',
        unit: 'mm',
        method: 'bigNum',
        show: 'bigNum',
        index: 10,
        length: 4,
        value: 202,
        sValue: '202'
      },
      {
        name: 'temperature3',
        unit: '°C',
        method: 'temperature',
        show: 'fixedValue',
        index: 14,
        length: 4,
        value: -3276.8,
        sValue: '-3276.80'
      },
      {
        name: 'FillLevel',
        unit: '%',
        method: 'num',
        show: 'value',
        index: 18,
        length: 2,
        value: 95,
        sValue: 95
      },
      {
        name: 'angle_of_Inclination',
        unit: '°',
        method: 'angle',
        show: 'value',
        index: 20,
        length: 2,
        value: -128,
        sValue: -128
      }
    ]
  ],
  [
    '013401800000CA010C5F12',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '34',
        sValue: 'R718X'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: -0,
        sValue: '0.00 <span class="high-light">(LowBattery)</span>'
      },
      {
        name: 'status1',
        unit: '',
        method: 'num',
        show: 'status',
        index: 8,
        length: 2,
        value: 0,
        sValue: 'off'
      },
      {
        name: 'Distance',
        unit: 'mm',
        method: 'bigNum',
        show: 'bigNum',
        index: 10,
        length: 4,
        value: 202,
        sValue: '202'
      },
      {
        name: 'temperature3',
        unit: '°C',
        method: 'temperature',
        show: 'fixedValue',
        index: 14,
        length: 4,
        value: 26.8,
        sValue: '26.80'
      },
      {
        name: 'FillLevel',
        unit: '%',
        method: 'num',
        show: 'value',
        index: 18,
        length: 2,
        value: 95,
        sValue: 95
      },
      {
        name: 'angle_of_Inclination',
        unit: '°',
        method: 'angle',
        show: 'value',
        index: 20,
        length: 2,
        value: 18,
        sValue: 18
      }
    ]
  ],
  [
    '014A012400000000000001',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '4A',
        sValue: 'R718N37'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: 3.6,
        sValue: '3.60'
      },
      {
        name: 'a_current',
        unit: 'mA',
        method: 'bigNum',
        show: 'bigNum',
        index: 8,
        length: 4,
        value: 0,
        sValue: '0'
      },
      {
        name: 'b_current',
        unit: 'mA',
        method: 'bigNum',
        show: 'bigNum',
        index: 12,
        length: 4,
        value: 0,
        sValue: '0'
      },
      {
        name: 'c_current',
        unit: 'mA',
        method: 'bigNum',
        show: 'bigNum',
        index: 16,
        length: 4,
        value: 0,
        sValue: '0'
      },
      {
        name: 'Mulitplier1',
        unit: '',
        method: 'num',
        show: 'value',
        index: 20,
        length: 2,
        value: 1,
        sValue: 1
      }
    ]
  ],
  [
    '014A0124FFFF0000000001',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '4A',
        sValue: 'R718N37'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: 3.6,
        sValue: '3.60'
      },
      {
        name: 'a_current',
        unit: 'mA',
        method: 'bigNum',
        show: 'bigNum',
        index: 8,
        length: 4,
        value: NaN,
        sValue: 'NA'
      },
      {
        name: 'b_current',
        unit: 'mA',
        method: 'bigNum',
        show: 'bigNum',
        index: 12,
        length: 4,
        value: 0,
        sValue: '0'
      },
      {
        name: 'c_current',
        unit: 'mA',
        method: 'bigNum',
        show: 'bigNum',
        index: 16,
        length: 4,
        value: 0,
        sValue: '0'
      },
      {
        name: 'Mulitplier1',
        unit: '',
        method: 'num',
        show: 'value',
        index: 20,
        length: 2,
        value: 1,
        sValue: 1
      }
    ]
  ],
  [
    '014A022401010000000000',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '4A',
        sValue: 'R718N37'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '02',
        sValue: '02'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: 3.6,
        sValue: '3.60'
      },
      {
        name: 'Mulitplier2',
        unit: '',
        method: 'num',
        show: 'value',
        index: 8,
        length: 2,
        value: 1,
        sValue: 1
      },
      {
        name: 'Mulitplier3',
        unit: '',
        method: 'num',
        show: 'value',
        index: 10,
        length: 2,
        value: 1,
        sValue: 1
      }
    ]
  ],
  [
    '0112012400000000000000',
    [
      {
        name: 'Version',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'DeviceType',
        unit: '',
        method: 'value',
        show: 'deviceType',
        index: 2,
        length: 2,
        value: '12',
        sValue: 'R718WB'
      },
      {
        name: 'ReportType',
        unit: '',
        method: 'value',
        show: 'value',
        index: 4,
        length: 2,
        value: '01',
        sValue: '01'
      },
      {
        name: 'battery',
        unit: 'V',
        method: 'battery',
        show: 'battery',
        index: 6,
        length: 2,
        value: 3.6,
        sValue: '3.60'
      },
      {
        name: 'WaterLeak1',
        unit: '',
        method: 'num',
        show: 'waterLeak',
        index: 8,
        length: 2,
        value: 0,
        sValue: 'noLeak1'
      }
    ]
  ]
]

test('fPort = 6', () => {
  const len = arr.length
  expect.assertions(len)

  for (let i = 0; i < len; i++) {
    const [input, output] = arr[i]
    const res = getEventUpArr(input, 6)
    
    expect(res).toEqual(output)
  }
})

// test.only('temp', () => {
//   console.log(getEventUpArr('013401800000CA010C5F12', 6))
//   expect(1).toBe(1)
// })