var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlength: 175,
    modifyText: "",
    surplusTextNumber: 0,
    lfromLLanguage: "",
    ltoLanguage: '',
    result_bottom_result: '',
    toTop:null
  },

  // 当键盘输入时，触发 input 事件，
  inputchange: function(res) {
    console.log(res.detail.value)
    this.setData({
      surplusTextNumber: res.detail.value.length,
      modifyText: res.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接受传过来的参数
    console.log(options)
    this.setData({
      lfromLLanguage: options.lfromLLanguage,
      ltoLanguage: options.ltoLanguage,
      modifyText: options.result_top_result,
    })
    // 获取传过来内容的数量
    this.getTextLength();
  },
  // 获取文本框字体数量并赋值
  getTextLength() {
    this.setData({
      surplusTextNumber: this.data.modifyText.length
    })
  },
  // 清空数据
  deleteResult: function() {
    this.setData({
      modifyText: ""
    })
    this.getTextLength();
  },
  translateTextFunction: function() {
    var that = this;
    plugin.translate({
      lfrom: that.data.lfromLLanguage,
      lto: that.data.ltoLanguage,
      tts: true,
      content: this.data.modifyText,
      success: res => {
        if (res.retcode == 0) {
          console.log("翻译结果是result", res.result)
          that.setData({
            result_bottom_result: res.result
          })
          wx.navigateTo({
            url: '../tanslation/tanslation?result_top_result=' + that.data.modifyText + "&lfromLLanguage=" + that.data.lfromLLanguage + "&ltoLanguage=" + that.data.ltoLanguage + "&result_bottom_result=" + that.data.result_bottom_result
          })
        } else {
          console.warn("翻译失败", res)
        }
      },
      fail: function(res) {
        console.log("网络失败", res)
      }
    })
  },
  // 输入完成
  confirm: function(res) {
    console.log(res.detail.value)
    this.setData({
      modifyText: res.detail.value
    })
    if (res.detail.value == "") {
      return;
    } else {
      this.translateTextFunction();
    }

  },
  //聚焦事件
  bindfocus: function() {
    console.log("页面聚焦")
    this.setData({
      toTop:true
    })
  },
  //失去聚焦
  bindblur: function() {
    console.log("页面失去聚焦")
    this.setData({
      toTop: false
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