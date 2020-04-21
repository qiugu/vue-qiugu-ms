const responseBody = {
  code: 100,
  result: {},
  msg: '',
  timeStamp: Date.now()
}

export function getPostParams (body) {
  return JSON.parse('{"' + decodeURIComponent(body)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export function response (code, data, msg) {
  responseBody.code = code
  responseBody.result = data
  responseBody.msg = msg
  return responseBody
}
