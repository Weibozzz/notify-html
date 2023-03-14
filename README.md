# notify-html
页面检测更新提示
## 快速使用
```shell
npm i notify-html -D

```

```js
import notify from 'notify-html'

function callback (data) {
  console.log(data) // url 请求后的data
}
// 返回了定时器 ID
let timerId = notify({
  url: 'http://xxx.xxx.xxx',
  timer: 30 * 1000, // 定时器时间 ms
  callback // 请求回来的回调
})

```
