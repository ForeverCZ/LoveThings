const md5 = require('../../public/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ["../../img/hblj1.jpg", "../../img/hblj2.jpg",
      "../../img/hblj3.jpg", "../../img/hblj4.jpg", "../../img/hblj5.jpg"
    ],
    garbage_info: [],
    searchText: ''
  },

  // 获取文本的值

  getText: function(event) {
    // console.log(event.detail.value)
    this.setData({
      searchText: event.detail.value
    })
  },

  // 开始查询

  searchResult: function() {
    wx.showLoading({
      title: '正在帮你查询',
    })
    let time = new Date().getTime();
    let AppKey = "8fba45b93f2d70e610f1c68e0a32dde6";
    let SecretKey = "8d7ac2440a0393f524a19edd98c989cf";
    let sign = md5.hexMD5(SecretKey + time);
    wx.request({
      method: 'post',
      url: 'https://aiapi.jd.com/jdai/garbageTextSearch?appkey=' + AppKey + "&timestamp=" + time + "&sign=" + sign,
      data: {
        text: this.data.searchText,
        cityId: "310000"
      },
      success: res => {
        wx.hideLoading();
        // console.log(res.data.result.garbage_info);
        this.setData({
          garbage_info: res.data.result.garbage_info
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    return {
      title: '让我们一起保护环境吧!',
      path: 'pages/garbage/garbage'
    }
  }
})