export async function getNavBleDevice() {
  console.log("🚀 - file: service.tsx:5 - navigator:", navigator)

  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  })
  return device
}
// 配备请求
export function pairingRequest() {
  window.electronAPI.bluetoothPairingRequest((event: any, details: any) => {
    const response = {} as any
    switch (details.pairingKind) {
      case 'confirm': {
        response.confirmed = window.confirm(`Do you want to connect to device ${details.deviceId}?`)
        break
      }
      case 'confirmPin': {
        response.confirmed = window.confirm(`Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`)
        break
      }
      case 'providePin': {
        const pin = window.prompt(`Please provide a pin for ${details.deviceId}.`)
        if (pin) {
          response.pin = pin
          response.confirmed = true
        } else {
          response.confirmed = false
        }
      }
    }

    window.electronAPI.bluetoothPairingResponse(response)
  })
}

export function cancelRequest() {
  window.electronAPI.cancelBluetoothRequest()
}




