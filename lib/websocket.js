export let websock = null
export let messageCallback = null
export let receiveCallback = null
export let errorCallback = null
export const wsUrl = 'ws://localhost:9999/ws?token='
import WebSocket from '@/lib/websocket.js'

// 接收ws后端返回的数据
export function websocketonmessage(e) {
  console.log(e)
  if (receiveCallback) {
    receiveCallback(e.data)
  }
  if (messageCallback) {
    messageCallback(e.data)
  }
}

export function setMessageCallback(successCallback) {
  messageCallback = successCallback
}

/**
 * 发起websocket连接
 * @param {Object} agentData 需要向后台传递的参数数据
 */
export function websocketSend(agentData) {
  // 加延迟是为了尽量让ws连接状态变为OPEN
  setTimeout(() => {
    // 添加状态判断，当为OPEN时，发送消息
    // if (websock.readyState === 1) {
      // websock.OPEN = 1
      // 发给后端的数据需要字符串化
      websock.webSocketSendMsg(JSON.stringify(agentData))
    // }
    // if (websock.readyState === websock.CLOSED) {
    //   // websock.CLOSED = 3
    //   console.log('websock. =3')
    //   uni.showToast({
    //   	title: 'ws连接异常，请稍候重试',
    //   	duration: 2000
    //   });
    //   errorCallback()
    // }
  }, 500)
}

export function sendLogoutMsg(fromId) {
  websocketSend({
    fromId: fromId,
    type: 4
  })
}

// 关闭ws连接
export function websocketclose(e) {
  console.log('ws连接关闭')
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  // if(e){
  //   if (e.code !== 1000) {
  //     Message.error('ws连接异常，请稍候重试')
  //     errorCallback()
  //   }
  // }
}
// 建立ws连接
export function websocketOpen(e) {
  console.log('ws连接成功')
}

// 初始化weosocket
export function initWebSocket() {
  if (typeof WebSocket === 'undefined') {
	  uni.showToast({
	  	title: 'ws连接异常，请稍候重试',
	  	duration: 2000
	  });
    return false
  }
  const requstWsUrl = wsUrl + uni.getStorageSync('token')
  // let requstWsUrl = wsUrl + getToken()
  websock = new WebSocket(requstWsUrl)

  websock.onmessage = function (e) {
    websocketonmessage(e)
  }
  websock.onopen = function () {
    console.log('open')
    websocketOpen()
  }
  websock.onerror = function () {
    console.log('error')
    uni.showToast({
    	title: 'ws连接异常，请稍候重试',
    	duration: 2000
    });
    errorCallback()
  }

  websock.onclose = function (e) {
    console.log('close')
    websocketclose(e)
  }
}

/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export function sendWebsocket(agentData, successCallback, errCallback) {
  // wsUrl = url
  initWebSocket()
  receiveCallback = successCallback
  errorCallback = errCallback
  websocketSend(agentData)
}

/**
 * 关闭websocket函数
 */
export function closeWebsocket() {
  console.log('close')
  if (websock) {
    websock.close() // 关闭websocket
    websock.onclose() // 关闭websocket
  }
}
