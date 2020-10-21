
const getEventUpArr = require('./getEventUpArr.js')

const arr = [
  [
    '814A000000000000000000',
    [
      {
        name: 'CmdID',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '81',
        sValue: '81'
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
        name: 'Status',
        unit: '',
        method: 'num',
        show: 'statusSuccess',
        index: 4,
        length: 2,
        value: 0,
        sValue: 'success'
      }
    ]
  ],
  [
    '814A010000000000000000',
    [
      {
        name: 'CmdID',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '81',
        sValue: '81'
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
        name: 'Status',
        unit: '',
        method: 'num',
        show: 'statusSuccess',
        index: 4,
        length: 2,
        value: 1,
        sValue: 'fail'
      }
    ]
  ],
  [
    '814A020000000000000000',
    [
      {
        name: 'CmdID',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '81',
        sValue: '81'
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
        name: 'Status',
        unit: '',
        method: 'num',
        show: 'statusSuccess',
        index: 4,
        length: 2,
        value: 2,
        sValue: 2
      }
    ]
  ],
  [
    '824A003C003C0064000000',
    [
      {
        name: 'CmdID',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '82',
        sValue: '82'
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
        name: 'MinTime',
        unit: 's',
        method: 'num',
        show: 'value',
        index: 4,
        length: 4,
        value: 60,
        sValue: 60
      },
      {
        name: 'MaxTime',
        unit: 's',
        method: 'num',
        show: 'value',
        index: 8,
        length: 4,
        value: 60,
        sValue: 60
      },
      {
        name: 'CurrentChange',
        unit: 'mA',
        method: 'num',
        show: 'value',
        index: 12,
        length: 4,
        value: 100,
        sValue: 100
      }
    ]
  ]
]

test('fPort = 7', () => {
  const len = arr.length
  expect.assertions(len)

  for (let i = 0; i < len; i++) {
    const [input, output] = arr[i]
    const res = getEventUpArr(input, 7)
    
    expect(res).toEqual(output)
  }
})

// test.only('temp', () => {
//   console.log(getEventUpArr('824A003C003C0064000000', 7))
//   expect(1).toBe(1)
// })