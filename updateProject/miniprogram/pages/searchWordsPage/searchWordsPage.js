var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversionFrom: "",
    conversionEnd: "",
    lfrom: "",
    lto: "",
    translateResuleText: '',
    translateText: '',
    originText: '',
    lfromLLanguage: "",
    ltoLanguage: ''
  },
  // 语言转换
  conversion: function(res) {
    var conversionCText = "";
    var conversionEText = "";
    conversionCText = this.data.conversionFrom;
    this.data.conversionFrom = this.data.conversionEnd;
    conversionEText = this.data.lfrom;
    this.data.lfrom = this.data.lto;
    this.setData({
      conversionFrom: this.data.conversionFrom,
      conversionEnd: conversionCText,
      lfrom: this.data.lfrom,
      lto: conversionEText
    })
    if (this.data.translateText != "") {
      plugin.translate({
        lfrom: this.data.lfrom,
        lto: this.data.lto,
        tts: true,
        content: this.data.translateText,
        success: res => {
          if (res.retcode == 0) {
            console.log(res)
            console.log("result", res.result)
            this.setData({
              translateResuleText: res.result,
              originText: res.origin
            })
          } else {
            console.warn("翻译失败", res)
          }
        },
        fail: function(res) {
          console.log("网络失败", res)
        }
      })
    } else {
      return;
    }
  },
  // 获取原文录音
  getVoice: function() {
    wx.stopBackgroundAudio();
    if (this.data.translateText == "") {
      plugin.textToSpeech({
        lang: this.data.lfromLLanguage,
        tts: true,
        content: this.data.originText,
        success: function(res) {
          console.log("succ tts", res.filename)
          wx.playBackgroundAudio({
            dataUrl: res.filename,
          })
        },
        fail: function(res) {
          console.log("fail tts", res)
        }
      })
    } else {
      wx.stopBackgroundAudio();
      plugin.textToSpeech({
        lang: this.data.lfrom,
        tts: true,
        content: this.data.originText,
        success: function(res) {
          console.log("succ tts", res.filename)
          wx.playBackgroundAudio({
            dataUrl: res.filename,
          })
        },
        fail: function(res) {
          console.log("fail tts", res)
        }
      })
    }

  },
  // 获得翻译录音
  getResltVoice: function(res) {
    wx.stopBackgroundAudio();
    if (this.data.translateText == "") {
      plugin.textToSpeech({
        lang: this.data.ltoLanguage,
        tts: true,
        content: this.data.translateResuleText,
        success: function(res) {
          console.log("succ tts", res.filename)
          wx.playBackgroundAudio({
            dataUrl: res.filename,
          })
        },
        fail: function(res) {
          console.log("fail tts", res)
        }
      })
    } else {
      plugin.textToSpeech({
        lang: this.data.lto,
        tts: true,
        content: this.data.translateResuleText,
        success: function(res) {
          console.log("succ tts", res.filename)
          wx.playBackgroundAudio({
            dataUrl: res.filename,
          })
        },
        fail: function(res) {
          console.log("fail tts", res)
        }
      })
    }

  },
  // 复制文本
  copyText: function() {
    wx.setClipboardData({
      data: this.data.translateResuleText,
    })
  },
  // 时时刻刻获取文本
  getInputText: function(res) {
    if (res.detail.value == "") {
      this.setData({
        translateResuleText: ""
      })
    } else {
      this.setData({
        translateText: res.detail.value
      })
      console.log(res.detail.value)
      // 开始翻译
      plugin.translate({
        lfrom: this.data.lfrom,
        lto: this.data.lto,
        tts: true,
        content: res.detail.value,
        success: res => {
          if (res.retcode == 0) {
            console.log(res)
            console.log("result", res.result)
            this.setData({
              translateResuleText: res.result,
              originText: res.origin
            })
          } else {
            console.warn("翻译失败", res)
          }
        },
        fail: function(res) {
          console.log("网络失败", res)
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      lfrom: options.lfrom,
      lto: options.lto,
      conversionFrom: options.conversionFrom,
      conversionEnd: options.conversionEnd,
    })
    // 加载缓存记录
    this.getStorage();
  },
  setStorage() {
    wx.setStorage({
      key: "searchTranslation",
      data: {
        translateResuleText: this.data.translateResuleText,
        originText: this.data.originText,
        lfromLLanguage: this.data.lfrom,
        ltoLanguage: this.data.lto
      },
      success: res => {
        console.log("缓存成功")
      },
      fail: err => {
        console.log("缓存失败")
      }
    })
  },
  getStorage() {
    wx.getStorage({
      key: 'searchTranslation',
      success: res => {
        console.log("我是缓存")
        console.log(res.data)
        this.setData({
          translateResuleText: res.data.translateResuleText,
          originText: res.data.originText,
          lfromLLanguage: res.data.lfromLLanguage,
          ltoLanguage: res.data.ltoLanguage
        })
      }
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
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.stopBackgroundAudio();
    console.log("onHide")
    //设置缓存覆盖缓存
    this.setStorage();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.stopBackgroundAudio();
    console.log("onUnload")
    //设置缓存覆盖缓存
    this.setStorage();
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
      title: '一起来来玩同声传译',
      path: 'pages/tanslation/tanslation'
    }
  }
})