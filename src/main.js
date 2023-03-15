function http(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
    xhr.send(null);
  });
}
function notify ({
                   url = '/',
                   timer = 30 * 1000,
                   callback = () => {},
                   storageKey = 'notify_version_txt'
                 }) {
  let timerId
  const requestFn = () => {
    http(url).then(data => {
      let newVersion = '';
      data.replace(/.*data-version-time\='?"?(\d+).*/,(a, v) => {
        newVersion = v
      })
      const version = localStorage.getItem(storageKey)
      if (!version) {
        localStorage.setItem(storageKey, data)
        return
      }
      if (version && newVersion !== version) {
        callback(data, newVersion)
        localStorage.setItem(storageKey, newVersion)
      }
    })
  }
  const intervalFn = () => {
    timerId = setInterval(() => {
      requestFn()
    }, timer)
  }
  intervalFn()
  const eventFn = () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      requestFn()
    }
    intervalFn()
  }
  window.addEventListener('focus', eventFn)
  window.addEventListener('visibilitychange', () => {
    !document.hidden && eventFn()
  })
  return timerId;
}
module.exports = notify
