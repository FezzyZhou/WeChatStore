var app = getApp()
Page({
  data: {
    datanull: false,
    cartsList: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/tenant/finishOrders.php',
      data: {
        indexPost: 5,
        tenantId: getApp().globalData.currentUserId
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.datanull = true;
        }
        else {
          that.data.datanull = false;
        }
        that.data.cartsList = res.data;

        //修改地址默认值成功
        that.setData({
          cartsList: that.data.cartsList,
          datanull: that.data.datanull,
        });
      }
    });
  },
  onShow: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/tenant/finishOrders.php',
      data: {
        indexPost: 5,
        tenantId: getApp().globalData.currentUserId
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.datanull = true;
        }
        else {
          that.data.datanull = false;
        }
        that.data.cartsList = res.data;

        //修改地址默认值成功
        that.setData({
          cartsList: that.data.cartsList,
          datanull: that.data.datanull,
        });
      }
    });
  },
  
 
  back: function (e) {
    wx.reLaunch({
      url: '../tenant',
    })
  },
}) 
