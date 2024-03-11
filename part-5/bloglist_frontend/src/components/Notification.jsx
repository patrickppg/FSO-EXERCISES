function Notification({notification}) {
  if (!notification.message) return null
  
  return (
    <div className={`notification--${notification.status}`}>
      <div>{notification.message}</div>
    </div>
  )
  }
  
  export default Notification