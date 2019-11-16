// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //选择图片
  select: function(res) {
    // console.log(res)

    // 选择图片API
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        wx.showLoading({
          title: '正在识别',
        })
        console.log(res)
        var tempFilePaths = res.tempFilePaths[0];

        // 解码图片base64
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths,
          encoding: "base64",
          success: res => {
            // console.log(res.data)
            //调用云函数传入base64
            wx.cloud.callFunction({
              name: "car",
              data: {
                image: res.data
              }
            }).then(res => {
              // console.log("云函数调用成功")
              // console.log(res)
              wx.hideLoading();
              this.setData({
                carData: res.result.carData.result
              })
              console.log(this.data.carData)
              wx.navigateTo({
                url: '../carDispay/carDispay?carData=' + JSON.stringify(this.data.carData)
              })
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
    })
  },
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

  }
})