// 云函数入口文件
const cloud = require('wx-server-sdk')

var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "17785099";
var API_KEY = "mr8tpB3hVPmrdmi9oGY27F7f";
var SECRET_KEY = "EP590u6qi5DtDbYercoZuXeWjLPF2Rb3";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

cloud.init()

// 如果有可选参数
var options = {};
options["recognize_granularity"] = "big";
options["language_type"] = "CHN_ENG";
options["detect_direction"] = "true";
options["detect_language"] = "true";
options["vertexes_location"] = "true";
options["probability"] = "true";
// 云函数入口函数
exports.main = async(event, context) => {
  let text = await aiText();
  console.log(text)
  return {
    text
  }

  function aiText() {
    return new Promise((resolve, reject) => {
      // 带参数调用通用文字识别, 图片参数为本地图片event.image的图片必须是base64
      client.general(event.image, options).then(result => {
        resolve(result)
      }).catch(err => {
        // 如果发生网络错误
        console.log(err);
      });
    })
  }
}