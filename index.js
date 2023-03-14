'use strict';

function http(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.send(null);
  });
}
function notify ({
                   url,
                   timer = 30 * 1000,
                   callback = () => {}
                 }) {
  let timerId;
  if (!url) {
    console.error('notify-html err', 'url 不存在');
    return;
  }
  const requestFn = () => {
    http(url).then(data => {
      callback(data);
    });
  };
  const intervalFn = () => {
    timerId = setInterval(() => {
      requestFn();
    }, timer);
  };
  intervalFn();
  const eventFn = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      requestFn();
    }
    intervalFn();
  };
  window.addEventListener('focus', eventFn);
  window.addEventListener('visibilitychange', () => {
    !document.hidden && eventFn();
  });
  return timerId;
}
module.exports = notify;
