export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
  bluetoothPairingRequest: Function
  bluetoothPairingResponse: Function
  cancelBluetoothRequest: Function
}
export interface IBluetooth{
  bluetooth:any
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
    versions:any
    [x:string]:any
  }
  interface Navigator {
    bluetooth: any
    [x:string]:any
  }
  interface navigator {
    bluetooth: any
    [x:string]:any
  }
}
