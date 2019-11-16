// pages/user/user.js
const db = wx.cloud.database()
const userInfo = db.collection("flowerUserInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:true,
    btnuser:true,
    userList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo.get().then(res=>{
      console.log(res)
      if(res.data.length==0)
      {
        this.setData({
          user: true,
          btnuser: false
        })
      }
      else{
        this.setData({
          userList:res.data,
          user: false,
          btnuser: true
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  // 点击授权登录

  getUserInfo:function(event){
    console.log(event.detail.userInfo);
    var data = event.detail.userInfo
    // 存储数据到数据库
    userInfo.add({
      data: data
    }).then(res=>{
      console.log(res)
      this.onLoad();
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})