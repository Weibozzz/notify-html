# notify-html
页面检测更新提示
## 原理
页面聚焦或者tab标签切换，轮训查询源文件字符串，和本地存储比较，如果不一致会有回调通知
## 快速使用
```shell
npm i notify-html -D

```

```js
import notify from 'notify-html'
/**
 * 回调处理函数
 * @param data {string} 请求回来的原数据
 * @param newVersion 如果配置 data-version-time 会有值
 */
function callback (data, newVersion) {
  console.log(data, newVersion) // url 请求后的 data
}
// 返回了定时器 ID, 页面卸载的时候可以 clearInterval(timerId)
let timerId = notify({
  url: 'http://xxx.xxx.xxx',// 可为空 默认为 /
  timer: 30 * 1000, // 可为空 默认定时器时间 30s 单位 ms
  callback, // 请求回来的回调
  storageKey: '' // 可为空 存储 localStorage 的 key
})

```
### 配置 data-version-time
在入口 html 文件任意处标签加上属性 data-version-time='打包的时间戳或者版本号' 即可

buildTime 为 webpack 的全局变量
```html
<body data-version-time="<%= buildTime %>">
</body>
```
