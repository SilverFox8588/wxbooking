//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图
    imgUrls: [
      '../../images/11.jpg',
      '../../images/22.jpg',
      '../../images/33.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    
  },
  golist: function (e) {
    wx.navigateTo({
      url: '../list/list?index=' + e.currentTarget.id
    })
  },
})
