// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postUrlImg: '',
    // showing: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    // self.setData({
    //   url: options.avatarUrl
    // })
    // console.log("传递的数据")
    // console.log(options)
    // wx.showLoading({
    //   title: '正在生成',
    // });


    //promise.all并发请求
    //首先进去当前页面渠道三张图片来准备绘制
    // 请求背景图片
    let poster1 = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: '../../img/poatera.png',
        success: function(res) {
          resolve(res)
        }
      })
    });

    // 请求识别的图片
    let poster2 = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: options.aiimg,
        success: function(res) {
          resolve(res)
        }
      })
    });

    // 请求小程序码
    let poster3 = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: '../../img/asw.jpg',
        success: function(res) {
          resolve(res)
        }
      })
    })
    //请求用户头像
    let poster4 = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: options.avatarUrl,
        success: function(res) {
          resolve(res)
        }
      })
    })

    // 并发请求
    Promise.all([poster1, poster2, poster3, poster4]).then(res => {
      console.log("渠道图片的地址")
      console.log(res)
      //渠道图片的地址
      var postimg = res[0].path;
      var flowing = res[1].path;
      var codeimg = res[2].path;
      var userImage = res[3].path;
      var img_width = res[1].width;
      var img_height = res[1].height;


      // 另一种定义方法
      // var postimg = res[0].path,
      //   flowing = res[1].path,
      //   codeimg = res[2].path;

      // 请求三张图片成 功后在这里开始绘制海报
      let weight = 300
      let height = 500
      // 取到花的图片的原始宽高
      const ctx = wx.createCanvasContext("sharImg")

      // 对图片进行裁剪
      var can_left, //左偏移
        can_top, //上偏移
        can_width, //裁剪宽度
        can_height, //裁剪高度
        can_height = img_width * (200 / 300)
      if (can_height > img_height) {
        can_height = img_height;
        can_width = can_height * (300 / 200);
        can_left = (img_width - can_width) / 2;
        can_top = 0;
      } else {
        can_left = 0;
        can_top = (img_height - can_height) / 2;
        can_width = img_width;
      }



      // 绘制图片
      ctx.drawImage("../../" + postimg, 0, 0, weight, height);
      // 绘制花
      ctx.drawImage(flowing, can_left, can_top, can_width, can_height, 0, 0, weight, 200);
      // 绘制用户头像
      // console.log("绘制用户头像")
      ctx.save();
      // ctx.beginPath();
      ctx.arc((weight / 2), 365, 45, 0, Math.PI * 2, false);
      ctx.clip(); //裁剪
      ctx.drawImage(userImage, (weight / 2 - 45), 320, 90, 90);
      ctx.restore();
      console.log("绘制小程序码")
      // 绘制小程序吗
      ctx.drawImage("../../" + codeimg, (weight - 65), 435, 65, 65);

      // 绘制文字
      ctx.setTextAlign("center");
      ctx.setFillStyle("rgb(253,252,251)");
      ctx.setFontSize(15);
      ctx.fillText(options.title, weight / 2, 240);
      ctx.fillText("小程序扫一扫就知道", weight / 2, 280);
      ctx.fillText("我是" + options.nickName, weight / 2, 450);
      ctx.fillText(options.aidata, weight / 2, 190);

      // 开始绘制
      ctx.draw(false, setTimeout(() => {
        // console.log("绘制图片中");
        self.showimg();
      }, 1000))
      // 生成图片

    }).catch(err => {
      console.log(err)
    })
  },
  showimg: function() {
    wx.canvasToTempFilePath({
      canvasId: 'sharImg',
      success: res => {
        // console.log("图片生成功")
        // console.log(res)
        // wx.hideLoading();
        this.setData({
          postUrlImg: res.tempFilePath,
          // showing: false
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 保存到本地相册
  save: function() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.postUrlImg,
      success: res => {
        console.log(res)
        wx.showModal({
          title: '海报保存成功',
          content: '快去分享给小伙伴吧^v^',
          showCancel: false,
          confirmText: "知道了"
        })

      },
      fail: err => {
        console.log(err)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      hidePost: true
    })
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
      title: "拍照就能识别是什么花和植物你也来试试",
      path: 'pages/index/index'
    }
  }
})