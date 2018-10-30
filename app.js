//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 获取openid
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6c720a41c7cc7142&secret=ee0245e597fafe72f8efa591b1f1f554&js_code=' + res.code,
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "post",
          success: function (res) {
            wx.setStorageSync('openid', res.data.openid);
            wx.setStorageSync('session_key', res.data.session_key);
          }
        });
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})