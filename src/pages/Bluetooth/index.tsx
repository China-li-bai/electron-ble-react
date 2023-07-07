import { useEffect, useState } from "react"
import { getNavBleDevice } from "./service"

export function Bluetooth() {
  const [device, setDevice] = useState<any>({})
  const testBle = async () => {
    const ble = await getNavBleDevice()
    console.log("🚀 - file: index.tsx:8 - ble:", ble)
    setDevice(ble)
  }
  return <>
    <button onClick={testBle}>Test Bluetooth</button>
    <button id="cancel">Cancel Bluetooth Request</button>

    <p>Currently selected bluetooth device:
      <strong>device name ：{device?.name}</strong>
      <strong>device id ：{device?.id}</strong>
    </p>
  </>
}