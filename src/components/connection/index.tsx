export const Connection = () => {
  return <>
    connection status: {navigator.onLine ? 'online' : 'offline'}
  </>
}
export default Connection