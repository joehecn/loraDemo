
const { base64ToHex, hexToBase64 } = require('./util.js')

const arr = [
  // [base64, hex]
  ['ATQBJAAAygEMXxI=', '013401240000CA010C5F12'],
  ['AUoBJAAAAAAAAAE=', '014A012400000000000001'],
  ['AUoCJAEBAAAAAAA=', '014A022401010000000000'],
  ['ARIBJAAAAAAAAAA=', '0112012400000000000000'],
  ['ATQBJAAAygEMXxE=', '013401240000CA010C5F11'],
  // 垃圾桶 00137a100000cf22
  ['AjQAAAAAAAAAAAA=', '0234000000000000000000'], // 读取设备参数
  ['gjQAPAA8AQH0ABQ=', '8234003C003C0101F40014'],
  ['BjQAAAAAAAAAAAA=', '0634000000000000000000'], // 读取设备参数 FillMaxDistance
  ['BDQAAAAAAAAAAAA=', '0434000000000000000000'], // 读取设备参数 OnDistanceThreshold
  // 电表 00137a100000b341
  ['AkoAAAAAAAAAAAA=', '024A000000000000000000'], // 读取设备参数
  ['gkoDhAOEAGQAAAA=', '824A038403840064000000']  // 
]

test('base64ToHex', () => {
  const len = arr.length
  expect.assertions(len)
  for (let i = 0; i < len; i++) {
    const [input, output] = arr[i]
    const res = base64ToHex(input)
    // console.log({ input, output: res })
    expect(res).toBe(output)
  }
})

test('hexToBase64', () => {
  const len = arr.length
  expect.assertions(len)
  for (let i = 0; i < len; i++) {
    const [output, input] = arr[i]
    const res = hexToBase64(input)
    // console.log({ input, output: res })
    expect(res).toBe(output)
  }
})

// test.only('temp', () => {
//   // console.log(hexToBase64('024A000000000000000000'))
//   console.log(base64ToHex('gkoDhAOEAGQAAAA='))
//   expect(1).toBe(1)
// })