
const getCommandDownArr = require('./getCommandDownArr.js')

const arr = [
  [
    '024A000000000000000000',
    [
      {
        name: 'CmdID',
        unit: '',
        method: 'value',
        show: 'value',
        index: 0,
        length: 2,
        value: '02',
        sValue: '02'
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
      }
    ]
  ],
  [
    '014A003C003C0064000000',
    [
      {
        name: 'CmdID',
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

test('getCommandDownArr', () => {
  const len = arr.length
  expect.assertions(len)

  for (let i = 0; i < len; i++) {
    const [input, output] = arr[i]
    const res = getCommandDownArr(input, 7)
    
    expect(res).toEqual(output)
  }
})

// test.only('temp', () => {
//   console.log(getCommandDownArr('014A003C003C0064000000'))
//   expect(1).toBe(1)
// })