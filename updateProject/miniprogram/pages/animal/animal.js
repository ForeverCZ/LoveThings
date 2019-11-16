// pages/index/index.js
const db = wx.cloud.database();
const dbtable = db.collection("flowerUserInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baikedata: '',
    botanyimg: [],
    introd: false,
    animition: false,
    tempFilePath: '',
    infomation: false,
    btnOpen: true,
    loadMsg: false,
    avatarUrl: "",
    nickName: "",
    title:"出门旅游看到不认识的动物"
  },
  // 点击了分享按钮
  getUserInfo: function(res) {
    var data = res.detail.userInfo;
    var self = this;
    console.log("点击到了分享按钮")
    console.log(res)
    //检查是否授权
    wx.getSetting({
      success(res) {
        //已经授权
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: '正在生成海报',
          })
          dbtable.get().then(res => {
            if (res.data.length == 0) {
              //授权成功
              //往数据库添加数据
              dbtable.add({
                data: data
              }).then(res => {
                console.log("往数据库添加成功")
                console.log(res)
                //把头像昵称 取出来

                //跳转分享页面
                dbtable.get().then(res => {
                  
                  //从数据库取出头像昵称
                  self.setData({
                    nickName: res.data[0].nickName,
                    avatarUrl: res.data[0].avatarUrl
                  })
                  console.log(res)
                  wx.hideLoading()
                  self.shre();
                })

              }).catch(err => {
                console.log(err)
              })
            } else {
              //把头像昵称 取出来

              //跳转分享页面
              dbtable.get().then(res => {
                wx.hideLoading()
                //从数据库取出头像昵称
                self.setData({
                  nickName: res.data[0].nickName,
                  avatarUrl: res.data[0].avatarUrl
                })
                console.log(res)
                self.shre();
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          wx.showToast({
            title: '未授权前往登陆',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  // 选择本地图片
  faceImage: function() {
    this.setData({
      infomation: false,
      loadMsg: false,
      botanyimg: ''
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // console.log(res);
        var tempFilePath = res.tempFilePaths[0];


        //解码图片base64
        //专用解码接口wx.getFileSystemManager().readFileSync
        var imgbase = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        console.log("解码图片");
        console.log(imgbase);
        //调用云函数
        this.flowerCloud(imgbase);
        this.setData({
          tempFilePath: tempFilePath,
          animition: true,
          infomation: true,
          btnOpen: false
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  //调用后端云函数
  flowerCloud: function(imgbase) {
    let self = this;
    wx.cloud.callFunction({
      name: "animal",
      data: {
        image: imgbase
      }
    }).then(res => {
      console.log("调用云函数后返回的原始数据")
      console.log(res)
      console.log(res.result.animal.result)
      let botanyimg = res.result.animal.result;

      //map()返回一个新数组  取小数点
      let botanydata = botanyimg.map(item => {
        let name = item.name;
        let score = parseFloat(item.score).toFixed(3);
        let baike = item.baike_info;
        return {
          name,
          score,
          baike
        }
      })
      console.log(botanydata)
      this.setData({
        animition: false,
        botanyimg: botanydata,
        btnOpen: true,

      })

    }).catch(err => {
      console.log(err)
      // 请求出现错误
      console.log("222")
      self.setData({
        loadMsg: true,
        animition: false,
        btnOpen: true
      })
    })
  },


  // 百度百科展示
  baike: function(e) {
    // console.log(e)
    this.setData({
      introd: true,
      baikedata: e.currentTarget.dataset.testid
    })
  },


  //取消按钮
  introdbaike: function() {
    this.setData({
      introd: false
    })
  },

  // 跳转到海报绘制页
  shre: function() {
    let aiimg = this.data.tempFilePath;
    let aidata = this.data.botanyimg[0].name;
    console.log(aidata)
    wx.navigateTo({
      url: '../post/post?aiimg=' + aiimg + "&aidata=" + aidata + "&avatarUrl=" + this.data.avatarUrl + "&nickName=" + this.data.nickName +"&title="+this.data.title
    })

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