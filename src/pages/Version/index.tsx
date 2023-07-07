import { Connection } from "../../components"

const Version = () => {
  return <>
    <p>This app is using Chrome (v${window?.versions?.chrome()}), Node.js (v${window?.versions?.node()}), and Electron (v${window.versions?.electron()})</p>
    <Connection/>
  </>
}
export default Version