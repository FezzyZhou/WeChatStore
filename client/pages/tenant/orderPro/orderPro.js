var app = getApp()
Page({
  data: {
    datanull: false,
    cartsList: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/tenant/selectOrders.php',
      data: {
        indexPost: 2,
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
      url: getApp().globalData.localWeb + '/storewebback/tenant/selectOrders.php',
      data: {
        indexPost: 2,
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
  sureOrder: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("ordersID=" + index);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认发货？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.localWeb + '/storewebback/orderManage/alterOrdersStatus.php',
            data: {
              ordersId: index,
              ordersStatus: 3,
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              wx.showLoading({
                title: '已发货',
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
