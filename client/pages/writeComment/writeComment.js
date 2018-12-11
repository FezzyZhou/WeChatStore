var app = getApp()
var count = 0;
Page({
  data: {
    evaContent: '',
    score: 10,//评分
    flag: true,
    ordersId: 0
  },
  onLoad: function (options) {
    var index = parseInt(options.index);
    this.data.ordersId = parseInt(options.ordersId);
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/selectCommentsById.php',
      data: {
        goodsId: index
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          postData: res.data[0],
          currentPostId: index,
          ordersId: that.data.ordersId
        });
      }
    });
  },
  charChange: function (e) {
    this.setData({
      evaContent: e.detail.value,
      flag: false
    })
  },
  sliderchange: function (e) {
    //获取滑动后的值
    this.setData({
      score: e.detail.value
    })
  },
  addComment: function (e) {
    var that = this;
    if (that.data.flag) {
      wx.showModal({
        title: '提示',
        content: '请写评价！',
        showCancel: false,
        success: function (res) {
          //
        }
      })
    }
    else {
      //此处默认user为1
      wx.request({
        url: getApp().globalData.localWeb + '/storewebback/orderManage/insertComment.php',
        data: {
          userId: getApp().globalData.currentUserId,
          goodsId: that.data.postData.goodsId,
          ordersScore: that.data.score,
          userWords: that.data.evaContent,
          ordersId: that.data.ordersId
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          that.setData({
          });
        }
      });
      wx.showLoading({
        title: '处理中...',
      })
      setTimeout(function () {
        wx.hideLoading();
       // wx.navigateBack(true);
        wx.navigateTo({
         url: '../orderIfo/orderIfo?index=' + 3,
        })
      }, 2000)
    }
  },
})
