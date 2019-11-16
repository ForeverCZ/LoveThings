// 云函数入口文件
const cloud = require('wx-server-sdk')


var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
var APP_ID = "17074544";
var API_KEY = "GbUwZhKA2CRUmKGONvnasQOD";
var SECRET_KEY = "qGB3fgnvKSdYzotefXKze0HTy1EGndZz";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
cloud.init()


// 如果有可选参数
var options = {};
options["top_num"] = "6";
options["baike_num"] = "6";

// 云函数入口函数
exports.main = async(event, context) => {
  let animal = await aiAnimal();

  console.log(animal)

  return {
    animal
  }
  function aiAnimal() {
    return new Promise((reslove, reject) => {

      // 带参数调用动物识别
      client.animalDetect(event.image, options).then(function(result) {
        reslove(result);
      }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
      });


    })
  }

}