var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversionFrom: "英语",
    conversionEnd: "中文",
    lfrom: "en_US",
    lto: "zh_CN",
    result_top_result: "",
    result_bottom_result: "",
    lfromLLanguage: "",
    ltoLanguage: '',
    pressClass1: false,
    pressClass2: false
  },
  // 修改文本
  modificationText: function() {
    // wx.showToast({
    //   title: '暂不开放',
    //   icon: "none",
    //   success: res => {

    //   }
    // })
    wx.navigateTo({
      url: '../modifyTranslation/modifyTranslation?lfromLLanguage=' + this.data.lfromLLanguage + "&ltoLanguage=" + this.data.ltoLanguage + "&result_top_result=" + this.data.result_top_result,
      success: res => {
        console.log(res)
      }
    })
  },
  // 开始录音中文
  startSpeakChinese: function() {
    this.setData({
      lfromLLanguage: "zh_CN",
      ltoLanguage: 'en_US',
      pressClass1: true
    })
    this.streamRecord();
  },
  // 结束录音中文
  endSpeakChinese: function() {
    this.setData({
      pressClass1: false
    })
    this.endRecord();
  },
  // 开始录音英文
  startSpeakEnglish: function() {
    this.setData({
      lfromLLanguage: "en_US",
      ltoLanguage: 'zh_CN',
      pressClass2: true
    })
    this.streamRecord();
  },
  // 结束录音英文
  endtSpeakEnglish: function() {
    this.setData({
      pressClass2: false
    })
    this.endRecord();
  },
  // 获得翻译录音
  getResltVoice: function(res) {
    wx.stopBackgroundAudio();
    plugin.textToSpeech({
      lang: this.data.ltoLanguage,
      tts: true,
      content: this.data.result_bottom_result,
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
  },
  // 开始录音动作
  streamRecord() {
    var that = this;
    wx.stopBackgroundAudio();
    manager.start({
      duration: 60000,
      lang: that.data.lfromLLanguage
    })
    manager.onStart = function(res) {
      console.log("成功开始录音识别", res)
    }
    //根据你的变动监听识别
    manager.onRecognize = function(res) {

      console.log("current result inirecolde", res.result);
      that.setData({
        result_top_result: res.result
      })
    }
  },
  // 结束录音动作
  endRecord: function() {
    var that = this;
    manager.stop();
    manager.onStop = function(res) {
      var result = res.result;
      if (result == "" || result == null) {
        wx.showToast({
          title: '请说话',
          icon: "none"
        })
      } else {
        console.log("recorlde file path", res.tempFilePath)
        console.log("最终识别结果result", res.result)
        that.setData({
          result_top_result: res.result
        })
        console.log("current result onStop set current", that.data.result_top_result)
        that.translateTextFunction();
      }
    }

  },
  // 开始翻译
  translateTextFunction: function() {
    var that = this;
    console.log("translates", this.data.result_top_result);
    plugin.translate({
      lfrom: that.data.lfromLLanguage,
      lto: that.data.ltoLanguage,
      tts: true,
      content: this.data.result_top_result,
      success: function(res) {
        if (res.retcode == 0) {
          console.log("翻译结果是result", res.result)
          that.setData({
            result_bottom_result: res.result
          })
        } else {
          console.warn("翻译失败", res)
        }
        wx.playBackgroundAudio({
          dataUrl: res.filename,
        })
      },
      fail: function(res) {
        console.log("网络失败", res)
      }
    })
  },
  // 转置翻译
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
  },
  // 搜索单词
  toSearch: function() {
    wx.navigateTo({
      url: '../searchWordsPage/searchWordsPage?lfrom=' + this.data.lfrom + "&lto=" + this.data.lto + "&conversionFrom=" + this.data.conversionFrom + "&conversionEnd=" + this.data.conversionEnd,
      success: res => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad")
    console.log(options)
    if (JSON.stringify(options) === '{}') {
      this.getStorage();
      console.log("不是修改数据的")
    } else {
      this.setData({
        result_top_result: options.result_top_result,
        result_bottom_result: options.result_bottom_result,
        ltoLanguage: options.ltoLanguage,
        lfromLLanguage: options.lfromLLanguage
      })
    }
  },
  // 添加缓存
  setStorage() {
    wx.setStorage({
      key: "simultaneousInterpretation",
      data: {
        result_top_result: this.data.result_top_result,
        result_bottom_result: this.data.result_bottom_result,
        lfromLLanguage: this.data.lfromLLanguage,
        ltoLanguage: this.data.ltoLanguage
      },
      success: res => {
        console.log("缓存成功")
      },
      fail: err => {
        console.log("缓存失败")
      }
    })
  },
  // 获取缓存
  getStorage() {
    wx.getStorage({
      key: 'simultaneousInterpretation',
      success: res => {
        console.log("我是缓存")
        console.log(res.data)
        this.setData({
          result_top_result: res.data.result_top_result,
          result_bottom_result: res.data.result_bottom_result,
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
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setStorage();
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.setStorage();
    console.log("onUnload")
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