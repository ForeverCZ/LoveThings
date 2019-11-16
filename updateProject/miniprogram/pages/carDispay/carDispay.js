// pages/carDispay/carDispay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carData: []
  },

  /**
   * 生命周期函数--监听页面加载
  //  */
  // 只要是涉及地址里加参数传参或者作为参数往服务器传参时只要不是基本数据类型和字符串，都要转化为字符串也就是间接转化为json数据 在取数据时再解析为javascript对象数据
  onLoad: function(options) {
    console.log(JSON.parse(options.carData))
    let imgdata = JSON.parse(options.carData);

    // 用map方法获得一个新的数组
    let carData = imgdata.map(item => {
      let name = item.name;
      let score = item.score.toFixed(3);
      let year = item.year;
      return {
        name,
        score,
        year
      }
    })
    this.setData({
      carData: carData
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