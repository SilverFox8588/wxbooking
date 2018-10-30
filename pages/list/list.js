// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    showModalStatus: false,
    currentType: 0,
    currentIndex: 0,
    sizeIndex: 0,
    sugarIndex: 0,
    temIndex: 0,
    size: ['常规', '测试1', '测试2', '测试3'],
    cartList: [],
    sumMonney: 0,
    cupNumber:0,
    showCart: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    console.log(sysinfo)
    // wx.showLoading({
    //   title: '努力加载中',
    // })
    var listData = [{ name: '人气热卖', foods: [{ image_url: '../../images/hb01.png', name: '9.9元香辣鸡腿堡', price: 9.9 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }] }, { name: '超值套餐', foods: [{ image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }] }, { name: '下午茶', foods: [{ image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }] }, { name: '汉堡/卷', foods: [{ image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }] }, { name: '允指原味鸡', foods: [{ image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }, { image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }] }, { name: '小食/配餐', foods: [{ image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }, { image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }] }, { name: '超值全家桶', foods: [{ image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }, { image_url: '../../images/all01.png', name: '58元双堡套餐', price: 58.0 }, { image_url: '../../images/ch01.png', name: '19.9元黄金鸡块20块', price: 19.9 }, { price: 0 }, { price: 0 }, { price: 0}] }];
    
    that.setData({
      activeIndex: options.index,
      toView: 'a' + options.index,
      listData: listData,//res.data,
      loading: true
    });

    //可以在这里请求api数据
    // wx.request({
    //   url: 'https://yourwebapi/list',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     wx.hideLoading();
    //     console.log(res)
    //     that.setData({
    //       listData: listData,//res.data,
    //       loading: true
    //     })
    //   }
    // })
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
    })
    console.log(this.data.toView);
  },
  scroll: function (e) {
    console.log(e)
    var dis = e.detail.scrollTop
    if (dis > 0 && dis < 182) {
      this.setData({
        activeIndex: 0,
      })
    }
    if (dis >= 182 && dis < 364) {
      this.setData({
        activeIndex: 1,
      })
    }
    if (dis >= 364 && dis < 546) {
      this.setData({
        activeIndex: 2,
      })
    }
    if (dis >= 546 && dis < 728) {
      this.setData({
        activeIndex: 3,
      })
    }
    if (dis >= 728 && dis < 1072) {
      this.setData({
        activeIndex: 4,
      })
    }
    if (dis >= 1072 && dis < 1416) {
      this.setData({
        activeIndex: 5,
      })
    }
    if (dis >= 1416) {
      this.setData({
        activeIndex: 6,
      })
    }
  },

  selectInfo: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      showModalStatus: !this.data.showModalStatus,
      currentType: type,
      currentIndex: index,
      sizeIndex: 0,
      sugarIndex: 0,
      temIndex: 0
    });
  },

  chooseSE: function (e) {
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      this.setData({
        sizeIndex: index
      });
    }
    if (type == 1) {
      this.setData({
        sugarIndex: index
      });
    }
    if (type == 2) {
      this.setData({
        temIndex: index
      });
    }
  },

  addToCart: function () {
    var a = this.data
    var addItem = {
      "name": a.listData[a.currentType].foods[a.currentIndex].name,
      "price": a.listData[a.currentType].foods[a.currentIndex].price,
      "detail": a.size[a.sizeIndex],
      "number": 1,
      "sum": a.listData[a.currentType].foods[a.currentIndex].price,
    }
    var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].price;
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1
    });
    console.log(this.data.cartList)
  },
  cancelCart:function(){
    this.setData({
      showModalStatus: false
    });
  },

  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0,
      cupNumber: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;

    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber+1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;

    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber-1
    });
  },
  goBalance: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('cupNumber', this.data.cupNumber);
      wx.navigateTo({
        url: '../order/balance/balance'
      })
    }
  },

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