// pages/order/balance/balance.js
Page({

  data: {
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber:0,
    fid: '',
    openId: '',
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cutMonney: wx.getStorageSync('sumMonney')>=20?3:0,
      cupNumber: wx.getStorageSync('cupNumber'),
    })
    
  },

  formSubmit: function (e) {
    console.log(e.detail);
    var fmId = e.detail.formId;
    var that = this;
    var openId = wx.getStorageSync('openid');

    that.setData({
      fid: fmId,
      openId: openId
    });

    //请求后台服务，发送模板消息
    wx.request({
      url: 'https://ue-jin.cn/api/WxTest',
      data: { OpenId: openId, FormId: fmId, ProductDesc: '您的订餐', Price: (that.data.sumMonney - that.data.cutMonney)},
      method: 'POST',
      success:function(re){
        console.log(re);
        that.setData({
          result: re,
          fid: fmId,
          openId: openId
        });
      }
    });
  },

  gopay:function(){
    // wx.navigateTo({
    //   url: '../detail/detail'
    // })
    this.pay();
  },

  /**
   * 支付函数
   * @param  {[type]} _payInfo [description]
   * @return {[type]}          [description]
   */
  pay: function (_payInfo, success, fail) {
    var payInfo = {
      body: '88',
      total_fee: 0,
      order_sn: ''
    }
    Object.assign(payInfo, _payInfo);
    if (payInfo.body.length == 0) {
      wx.showToast({
        title: '支付信息描述错误'
      })
      return false;
    }
    if (payInfo.total_fee == 0) {
      wx.showToast({
        title: '支付金额不能0'
      })
      return false;
    }
    if (payInfo.order_sn.length == 0) {
      wx.showToast({
        title: '订单号不能为空'
      })
      return false;
    }
    var This = this;
    This.getOpenid(function (openid) {
      payInfo.openid = openid;
      This.request({
        url: 'api/pay/prepay',
        data: payInfo,
        success: function (res) {
          var data = res.data;
          console.log(data);
          if (!data.status) {
            wx.showToast({
              title: data['errmsg']
            })
            return false;
          }
          This.request({
            url: 'api/pay/pay',
            data: { prepay_id: data.data.data.prepay_id },
            success: function (_payResult) {
              var payResult = _payResult.data;
              console.log(payResult);
              wx.requestPayment({
                'timeStamp': payResult.timeStamp.toString(),
                'nonceStr': payResult.nonceStr,
                'package': payResult.package,
                'signType': payResult.signType,
                'paySign': payResult.paySign,
                'success': function (succ) {
                  success && success(succ);
                },
                'fail': function (err) {
                  fail && fail(err);
                },
                'complete': function (comp) {

                }
              })
            }
          })
        }
      })
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