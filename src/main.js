function notify ({
                   url,
                   timer = 30 * 1000,
                   callback = () => {}
                 }) {
  if (!url) {
    console.error('notify-html err', 'url 不存在');
    return;
  }
  let timerId = setInterval(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        callback(xhr.responseText)
      }
    }
    xhr.send(null);
  }, timer)
  return timerId;
}
module.exports = notify
