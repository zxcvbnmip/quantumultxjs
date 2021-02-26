/*
bilibili remove some account modules. by onewayticket255
QX:
^https://app.bilibili.com/x/v2/space\?access_key script-response-body https://raw.githubusercontent.com/zxcvbnmip/quantumultxjs/master/bilibilispace.js
*/

//收藏排行前10，长按通知进入（iOS13以下通知中心不支持）
let url = $request.url
let regex = /vmid=(\d*)/
let vmid = regex.exec(url)
let mid = vmid[1]
let api = `https://space.bilibili.com/ajax/member/getSubmitVideos?mid=${mid}&pagesize=10&order=stow`
$httpClient.get(api, (error, response, body) => {
  if (error) {
    $done({})
  }
  else {
    console.log(body)
    body = JSON.parse(body)
    let info = ""
    body['data']['vlist'].forEach((element, index) => {
      index++
      let scheme = `bilibili://av/${element['aid']}`
      info += index + ": " + element['title'] + "\n" + scheme + "\n"
    })
    $notification.post('', '', info)
    $done({})
  }
})
