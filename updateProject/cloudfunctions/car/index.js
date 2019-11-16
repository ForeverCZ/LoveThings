// 云函数入口文件
const cloud = require('wx-server-sdk')

// AipImageClassifyClient是图像识别的node客户端，为使用图像识别的开发人员提供了一系列的交互方法
var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
var APP_ID = "17144007";
var API_KEY = "hGYS4Y1dk8A2Uy2LVyp43toh";
var SECRET_KEY = "m3WgKTM6ks9T9KXrEIsGl6HC9p1fKlvX";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

cloud.init()
// 如果有可选参数
var options = {};
options["top_num"] = "5";
options["baike_num"] = "5";
// 云函数入口函数
exports.main = async(event, context) => {
  var carData=await carImg();
  return {
    carData
  }
  function carImg(){
    return new Promise((reslove,reject)=>{
      // 带参数调用车辆识别
      client.carDetect(event.image, options).then(function (result) {
        reslove(result)
      }).catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
    })
  }
}