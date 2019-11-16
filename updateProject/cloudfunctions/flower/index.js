// 云函数入口文件
const cloud = require('wx-server-sdk')


var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
cloud.init()


// 设置APPID/AK/SK
var APP_ID = "17071630";
var API_KEY = "hG1EXHGkP39lt4fYGVxXpNVq";
var SECRET_KEY = "5Oo6IEn70GeXf0CdCx088bNTHGcYpUUd";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

//如果有可选参数
var options = {};
options["baike_num"] = "5";
// 云函数入口函数
exports.main = async(event, context) => {
  let flower = await aiFlower()
  console.log(flower);
  return {
    flower
  }

  //调用函数
  //event.image的图片必须是base64
  function aiFlower() {
    return new Promise((resolve, reject) => {
      client.plantDetect(event.image, options).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
      })
    })
  }
}