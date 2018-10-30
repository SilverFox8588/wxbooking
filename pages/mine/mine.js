// pages/mine/mine.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    userInfo: {}
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    
    this.setData({
      userInfo: e.detail.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
   
  },
  
  bitphone:function(){
    wx.makePhoneCall({
      phoneNumber: '13679128518' 
    })
  }
  
})