// 云函数入口文件
const cloud = require('wx-server-sdk')

// AipImageClassifyClient是图像识别的node客户端，为使用图像识别的开发人员提供了一系列的交互方法

var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
var APP_ID = "17142390";
var API_KEY = "IC5lKGU37z86j6qEIQ0Xexfk";
var SECRET_KEY = "aC94RfMKRGM0lANdrEBD3NetHTXw8paX";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
cloud.init()

// 如果有可选参数
var options = {};
options["top_num"] = "5";
options["filter_threshold"] = "0.9";
options["baike_num"] = "5";

// 云函数入口函数
exports.main = async(event, context) => {
  let vegetables = await aiVegetables()
  console.log(vegetables);
  return {
    vegetables
  }


  function aiVegetables() {
    return new Promise((resolve, reject) => {
      client.dishDetect(event.image, options).then(function(result) {
        resolve(result)
      }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
      });
    })
  }
}