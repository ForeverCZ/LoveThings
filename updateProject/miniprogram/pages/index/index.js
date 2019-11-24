// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [{
        img: "../../img/item1.png",
        color1: " #ccffcc",
        color2: " #00cc00",
        color3: " #00e600",
        text1: "花草识别",
        text2: "拍照识别花草树木",
        show: true,
        page: "../flower/flower"
      }, {
        img: "../../img/item2.png",
        color1: " #fff2e5",
        color2: "#ff99cc",
        color3: "#ffb3b3",
        text1: "动物识别",
        text2: "拍照识别小动物",
        show: true,
        page: "../animal/animal"
      },
      {
        img: "../../img/item3.png",
        color1: " #e5f5ff",
        color2: "#33adff",
        color3: "#80ccff",
        text1: "菜品识别",
        text2: "拍照识别各种美味",
        show: true,
        page: "../vegetables/vegetables"
      },
      {
        img: "../../img/item4.png",
        color1: " #ffeecc",
        color2: "#ffbb33",
        color3: "#ffcc66",
        text1: "车型识别",
        text2: "拍照识别各种车型",
        show: true,
        page: "../car/car"
      },
      {
        img: "../../img/item5.png",
        color1: "#ddffcc",
        color2: "#44cc00",
        color3: "#00e600",
        text1: "垃圾识别",
        text2: "提倡垃圾分类",
        show: true,
        page: "../garbage/garbage"
      },
      {
        img: "../../img/item6.png",
        color1: "#ffe5e5",
        color2: "#ff6666",
        color3: "#ff9999",
        text1: "文字识别",
        text2: "拍照识别各种文字",
        show: true,
        page: "../text/text"
      }, {
        img: "../../img/item7.png",
        color1: "#ffe6cc",
        color2: "#ffa64d",
        color3: "#ffbf80",
        text1: "同声传译",
        text2: "边听边翻译",
        show: true,
        page: "../tanslation/tanslation"
      }
    ]
  },
  //客服消息
  handleContact: function(event) {
    console.log(event)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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