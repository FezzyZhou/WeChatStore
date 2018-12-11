var app = getApp()
//var postgoodsdata = require('../../data/goods.js');
Page({
  data: {
    datanull: false,
    goodsList: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/tenant/goodsList.php',
      data: {
        tenantId: getApp().globalData.currentUserId,
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
        //修改地址默认值成功
        that.setData({
          goodsList: res.data,
          datanull: that.data.datanull,
        });
      }
    });
  },
  onShow: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/tenant/goodsList.php',
      data: {
        tenantId: getApp().globalData.currentUserId,
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
        //修改地址默认值成功
        that.setData({
          goodsList: res.data,
          datanull: that.data.datanull,
        });
      }
    });
  },

  SelectItem: function (e) {
   // var index = parseInt(e.currentTarget.dataset.index);
   // wx.navigateTo({
   //   url: '../editGoods/editGoods?index=' + index,
   // })
  },
  deleteGoods: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认下架商品？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.localWeb + '/storewebback/tenant/deleteGoods.php',
            data: {
              goodsId: index,
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              wx.showLoading({
                title: '下架中...',
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
      url: '../tenant',
    })
  },
}) 
