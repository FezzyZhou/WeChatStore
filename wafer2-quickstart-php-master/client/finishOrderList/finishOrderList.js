var app = getApp()
//var postgoodsdata = require('../../data/goods.js');
Page({
  data: {
    datanull: false,
    cartsList: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/finishiOrderList.php',
      data: {
        indexPost: 5,
        //此处默认用户1
        userId: getApp().globalData.currentUserId
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
      url: getApp().globalData.localWeb + '/storewebback/orderManage/finishiOrderList.php',
      data: {
        indexPost: 5,
        userId: getApp().globalData.currentUserId
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
        var i;
        that.data.cartsList = res.data;

        //修改地址默认值成功
        that.setData({
          cartsList: that.data.cartsList,
          datanull: that.data.datanull,
        });
      }
    });
  },
  SelectItem: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  },
  seeComment: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("index" + index);
    wx.navigateTo({
      url: '../commentLsit/commentLsit?index=' + index,
    })
  },
  deleteOrder: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("ordersID=" + index);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除订单信息？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.localWeb + '/storewebback/orderManage/alterOrdersStatus.php',
            data: {
              ordersId: index,
              ordersStatus: 6,
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              wx.showLoading({
                title: '删除中...',
              })
              setTimeout(function () {
                wx.hideLoading();
                //  wx.navigateBack(true);
                // wx.navigateTo({
                //   url: '../finishOrderList/finishOrderList',
                //   })
                that.onShow();
              }, 1000)

            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  back: function (e) {
    wx.reLaunch({
      url: '../my/my',
    })
  },
}) 
