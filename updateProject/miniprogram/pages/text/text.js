const md5 = require('../../public/md5.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resulttext: '',
    resultData: [],
    topImage: "../../img/textTopImage.jpg",
    photo: "../../img/textPhoto.svg",
    sharFriend: "../../img/textShare.svg"
  },
  // 拍照或者选择图片
  startPhoto: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log("拍照或选图临时图片地址：", res.tempFilePaths[0])
        wx.showLoading({
          title: '识别中',
        })

        // 转化为base64编码
        let imgBase64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        console.log("base64:", imgBase64);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
  },
  // 开始拍照识别
  photorecognition: function() {
    let that = this;
    wx.chooseImage({
      count: '1',
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '识别中',
        })
        // console.log(res.tempFilePaths[0]);
        // 转化为base64
        var imgbase = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        // console.log(imgbase)
        let AppKey = "8fba45b93f2d70e610f1c68e0a32dde6";
        let SecretKey = "8d7ac2440a0393f524a19edd98c989cf";
        let timestamp = new Date().getTime();
        let sign = md5.hexMD5(SecretKey + timestamp);
        wx.request({
          method: 'post',
          url: 'https://aiapi.jd.com/jdai/ocr_universal_v2?appkey=' + AppKey + "&timestamp=" + timestamp + "&sign=" + sign,
          data: {
            // imageUrl: res.tempFilePaths[0],
            imageBase64Str: imgbase
          },
          success: res => {
            wx.hideLoading();
            // console.log(res.data.result.resultData)
            that.setData({
              resultData: res.data.result.resultData
            })
            var dataString = "";
            for (var data in that.data.resultData) {
              dataString += that.data.resultData[data].text
              if (data < that.data.resultData.length - 1) {
                dataString += "\n";
              }
            }
            that.setData({
              resulttext: dataString
            })
          }
        })
      },
    })
  },
  // 复制文本
  copy: function() {
    wx.setClipboardData({
      data: this.data.resulttext,
      success(res) {
        console.log(res)
      }
    })
  },
  // // 修改文本
  // modificationResult: function(event) {
  //   // console.log(event.detail.value)
  //   this.setData({
  //     resulttext: event.detail.value
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '拍照识别文字',
      path: 'pages/text/text'
    }
  }
})