
const mqtt = require('mqtt')
const moment = require('moment')

const { base64ToHex, hexToBase64 } = require('./js/util.js')
const getEventUpArr = require('./js/getEventUpArr.js')
const getCommandDownArr = require('./js/getCommandDownArr.js')
const { getValue, setValue, getList, setItemToList, delList } = require('./js/db.js')

let joeIsLoading = true
let client = null

function createCell(attr, value) {
  const cell = document.createElement(attr)
  cell.innerHTML = value
  return cell
}
function createTable(phy, arr) {
  const table = document.createElement('table')

  const caption = document.createElement('caption')
  caption.innerHTML = `<h3>PHYPayload: ${phy}</h3>`
  table.appendChild(caption)

  const head = document.createElement('tr')
    ;['Attribute Name', 'Value', 'Unit'].forEach(it => {
      const th = createCell('th', it)
      head.appendChild(th)
    })
  table.appendChild(head)

  for (let i = 0, len = arr.length; i < len; i++) {
    const { name, sValue, unit } = arr[i]
    const tr = document.createElement('tr')
      ;[name, sValue, unit].forEach(it => {
        const td = createCell('td', it)
        tr.appendChild(td)
      })
    table.appendChild(tr)
  }

  return table
}

function addDevice(topic, payload, time) {
  const div = document.createElement('div')
  div.classList.add('item')

  // left
  const left = document.createElement('div')
  left.classList.add('left')

  const h3 = document.createElement('h3')
  h3.innerText = topic
  left.appendChild(h3)

  const timeP = document.createElement('p')
  timeP.classList.add('time')
  timeP.innerText = `Time: ${moment(time).format('YYYY-MM-DD HH:mm:ss')}`
  left.appendChild(timeP)

  const pre = document.createElement('pre')
  pre.innerText = JSON.stringify(payload, null, 2)
  left.appendChild(pre)

  div.appendChild(left)

  // right
  if (topic.includes('/event/up')) {
    const right = document.createElement('div')
    right.classList.add('right')
    const phy = base64ToHex(payload.data)
    console.log({ phy })

    const arr = getEventUpArr(phy, payload.fPort)
    console.log(arr)
    const table = createTable(phy, arr)
    right.appendChild(table)

    div.appendChild(right)
  } else if (topic.includes('/command/down')) {
    const right = document.createElement('div')
    right.classList.add('right')
    const phy = base64ToHex(payload.data)
    console.log({ phy })

    const arr = getCommandDownArr(phy)
    console.log(arr)
    const table = createTable(phy, arr)
    right.appendChild(table)

    div.appendChild(right)
  }

  document.getElementById('app').prepend(div)
}

function ws(len) {
  // 如果有数据, hidden loading
  if (len) {
    joeIsLoading = false
    document.getElementById('loading').classList.add('hidden')
  }

  client = mqtt.connect('ws://120.78.85.4:8083') // you add a ws:// url here
  client.subscribe('application/#')
  client.on('message', function (topic, payload) {
    try {
      const str = new TextDecoder('utf-8').decode(payload)
      const pd = JSON.parse(str)
      const time = new Date()
      
      console.log({ topic, payload: pd, time })
      // save to localStorage
      setItemToList('lora-messages', { topic, payload: pd, time })

      const devicesSelect = document.getElementById('devices')
      if (devicesSelect.value === "" || topic.includes(devicesSelect.value)) {
        addDevice(topic, pd, time)
      }

      if (joeIsLoading) {
        joeIsLoading = false

        document.getElementById('loading').classList.add('hidden')
      }
    } catch (error) {
      console.error(error)
    }
  })
}

function getConfigId(key) {
  const map = {
    '00137a100000b341': '4A',
    '00137a100000cf22': '34',
    '00137a100000b4ac': '12'
  }
  return map[key]
}

function checkedNumber(num, max) {
  return num > 0 && num <= max // 65535
}

function hiddenElse34(value) {
  const c1 = document.getElementById('configparam34-01')
  const c3 = document.getElementById('configparam34-03')
  const c5 = document.getElementById('configparam34-05')

  c1.classList.add('hidden')
  c3.classList.add('hidden')
  c5.classList.add('hidden')

  if (['01', '03', '05'].includes(value)) {
    const c = document.getElementById(`configparam34-${value}`)
    c.classList.remove('hidden')
  }
}
function run() {
  try {
    // commondSelect34
    const commondSelect34 = document.getElementById('commond34')
    commondSelect34.addEventListener('change', () => {
      console.log(commondSelect34, commondSelect34.value)
      hiddenElse34(commondSelect34.value)
    })
    // commond downlinkBtn34
    const downlinkBtn34 = document.getElementById('downlinkBtn34')
    downlinkBtn34.addEventListener('click', () => {
      const cmdId = document.getElementById('commond34').value

      const deviceType = document.getElementById('deviceType34').value
      const minTime = parseInt(document.getElementById('minTimeInput34').value)
      const maxTime = parseInt(document.getElementById('maxTimeInput34').value)
      const batteryChange = parseInt(document.getElementById('batteryChangeInput34').value)
      const distanceChange = parseInt(document.getElementById('distanceChangeInput34').value)
      const temperatureChange = parseInt(document.getElementById('temperatureChangeInput34').value)
      const onDistanceThreshold = parseInt(document.getElementById('onDistanceThresholdInput34').value)
      const fillMaxDistance = parseInt(document.getElementById('fillMaxDistanceInput34').value)

      let PHYPayload = '0634000000000000000000'
      switch (cmdId) {
        case '01':
          // checked number
          if (!checkedNumber(minTime, 65535) ||
            !checkedNumber(maxTime, 65535) ||
            !checkedNumber(batteryChange, 255) ||
            !checkedNumber(distanceChange, 65535) ||
            !checkedNumber(temperatureChange, 65535)) {
              alert('Please check the parameter!')
              return
          }
          const minTimeStr = (`000${minTime.toString(16)}`).substr(-4).toUpperCase()
          const maxTimeStr = (`000${maxTime.toString(16)}`).substr(-4).toUpperCase()
          const batteryChangeStr = (`0${batteryChange.toString(16)}`).substr(-2).toUpperCase()
          const distanceChangeStr = (`000${distanceChange.toString(16)}`).substr(-4).toUpperCase()
          const temperatureChangeStr = (`000${temperatureChange.toString(16)}`).substr(-4).toUpperCase()
          PHYPayload = `01${deviceType}${minTimeStr}${maxTimeStr}${batteryChangeStr}${distanceChangeStr}${temperatureChangeStr}`
          break
        case '02':
          PHYPayload = '0234000000000000000000'
          break
        case '03':
          if (!checkedNumber(onDistanceThreshold, 65535)) {
              alert('Please check the parameter!')
              return
          }
          const onDistanceThresholdStr = (`000${onDistanceThreshold.toString(16)}`).substr(-4).toUpperCase()
          PHYPayload = `03${deviceType}${onDistanceThresholdStr}00000000000000`
          break
        case '04':
          PHYPayload = '0434000000000000000000'
          break
        case '05':
          if (!checkedNumber(fillMaxDistance, 65535)) {
            alert('Please check the parameter!')
            return
          }
          const fillMaxDistanceStr = (`000${fillMaxDistance.toString(16)}`).substr(-4).toUpperCase()
          PHYPayload = `05${deviceType}${fillMaxDistanceStr}00000000000000`
      }
      console.log({ PHYPayload })

      if (client) {
        const data = hexToBase64(PHYPayload)
        const topic = `application/2/device/${getValue('lora-device')}/command/down`
        const payload = {
          confirmed: true,
          fPort: 7,
          data
        }
        console.log({ topic, payload })
        client.publish(topic, JSON.stringify(payload))
      }
    })

    // commondSelect12
    const commondSelect12 = document.getElementById('commond12')
    console.log(commondSelect12, commondSelect12.value)
    commondSelect12.addEventListener('change', () => {
      const configParam = document.getElementById('configparam12')
      configParam.classList.toggle('hidden')
    })
    // commond downlinkBtn12
    const downlinkBtn12 = document.getElementById('downlinkBtn12')
    downlinkBtn12.addEventListener('click', () => {
      const cmdId = document.getElementById('commond12').value
      let PHYPayload = '0212000000000000000000'
      if (cmdId === '01') {
        const deviceType = document.getElementById('deviceType12').value
        const minTime = parseInt(document.getElementById('minTimeInput12').value)
        const maxTime = parseInt(document.getElementById('maxTimeInput12').value)
        const batteryChange = parseInt(document.getElementById('batteryChangeInput12').value)
        console.log({ cmdId, deviceType, minTime, maxTime, batteryChange })
        // checked number
        if (!checkedNumber(minTime, 65535) ||
          !checkedNumber(maxTime, 65535) ||
          !checkedNumber(batteryChange, 65535)) {
            alert('Please check the parameter!')
            return
        }

        const minTimeStr = (`000${minTime.toString(16)}`).substr(-4).toUpperCase()
        const maxTimeStr = (`000${maxTime.toString(16)}`).substr(-4).toUpperCase()
        const batteryChangeStr = (`0${batteryChange.toString(16)}`).substr(-2).toUpperCase()
        PHYPayload = `01${deviceType}${minTimeStr}${maxTimeStr}${batteryChangeStr}00000000`
      }
      console.log({ PHYPayload })

      if (client) {
        const data = hexToBase64(PHYPayload)
        const topic = `application/2/device/${getValue('lora-device')}/command/down`
        const payload = {
          confirmed: true,
          fPort: 7,
          data
        }
        console.log({ topic, payload })
        client.publish(topic, JSON.stringify(payload))
      }
    })

    // commond select
    const commondSelect = document.getElementById('commond')
    console.log(commondSelect, commondSelect.value)
    commondSelect.addEventListener('change', () => {
      const configParam = document.getElementById('config-param')
      configParam.classList.toggle('hidden')
    })
    // commond downlinkBtn
    const downlinkBtn = document.getElementById('downlinkBtn')
    downlinkBtn.addEventListener('click', () => {
      const cmdId = document.getElementById('commond').value
      let PHYPayload = '024A000000000000000000'
      if (cmdId === '01') {
        const deviceType = document.getElementById('deviceType').value
        const minTime = parseInt(document.getElementById('minTimeInput').value)
        const maxTime = parseInt(document.getElementById('maxTimeInput').value)
        const currentChange = parseInt(document.getElementById('currentChangeInput').value)
        console.log({ cmdId, deviceType, minTime, maxTime, currentChange })
        // checked number
        if (!checkedNumber(minTime, 65535) ||
          !checkedNumber(maxTime, 65535) ||
          !checkedNumber(currentChange, 65535)) {
            alert('Please check the parameter!')
            return
        }

        const minTimeStr = (`000${minTime.toString(16)}`).substr(-4).toUpperCase()
        const maxTimeStr = (`000${maxTime.toString(16)}`).substr(-4).toUpperCase()
        const currentChangeStr = (`000${currentChange.toString(16)}`).substr(-4).toUpperCase()
        PHYPayload = `01${deviceType}${minTimeStr}${maxTimeStr}${currentChangeStr}000000`
      }
      console.log({ PHYPayload })

      if (client) {
        const data = hexToBase64(PHYPayload)
        const topic = `application/2/device/${getValue('lora-device')}/command/down`
        const payload = {
          confirmed: true,
          fPort: 7,
          data
        }
        console.log({ topic, payload })
        client.publish(topic, JSON.stringify(payload))
      }
    })

    // clear btn
    const clearBtn = document.getElementById('clearMessages')
    clearBtn.addEventListener('click', () => {
      delList('lora-messages')
      // refresh page
      location.reload()
    })

    // devices select
    // 先从 localStorage 中 读取 value
    const devicesSelect = document.getElementById('devices')
    devicesSelect.value = getValue('lora-device')

    // config
    const configId = getConfigId(devicesSelect.value)
    if (configId) {
      document.getElementById(configId).classList.remove('hidden')
    }
    console.log({ first: devicesSelect.value })

    devicesSelect.addEventListener('change', () => {
      setValue('lora-device', devicesSelect.value)
      console.log({ onchange: devicesSelect.value })
      // refresh page
      location.reload()
    })

    // 先从 localStorage 中 读取 list
    const list = getList('lora-messages')
    for (let i = 0, len = list.length; i < len; i++) {
      const { topic, payload, time } = list[i]

      if (devicesSelect.value === "" || topic.includes(devicesSelect.value)) {
        addDevice(topic, payload, time)
      }
    }

    ws(list.length)
  } catch (error) {
    console.error(error)
  }
}

run()
