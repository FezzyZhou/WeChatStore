//var postgoodsdata = require('../../data/goods.js');
Page({
  data: {
    currentPostId: 0,
  },

  onLoad: function (options) {
    var index = options.index;
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb+'/storewebback/selectCommentsById.php',
      data: {
        userId: getApp().globalData.currentUserId,
        goodsId: index
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {      
        that.setData({         
         // postUserComment: that.data.postUserComment,
          userComment: res.data[1],
          currentPostId: index,
        });
      }
    });
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  addcart: function (e) {
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 3000
    });
    this.setData({
      bottoncolor1: "#008841"
    });
  },
  addbuy: function (e) {
    this.setData({
      bottoncolor2: "#008841"
    });
    var id = this.data.currentPostId;
    var that = this;
    wx.showModal({
      title: '前往支付',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack(true);
        } else {
          //  wx.navigateTo({
          //    url: '../detail/detail?index=' + id,
          //  })
          that.refresh();
        }
      }
    })
  },
  refresh: function (event) {
    this.setData({
      bottoncolor2: "#292929"
    });
  },
  seeMore: function (event) {
    var index = this.data.currentPostId;
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  }
})
