Page({
  data: {
    goodsListItems: [],
    nodata: false
  },
  onLoad: function (options) {
    var that = this;
    var index = parseInt(options.index);
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: getApp().globalData.localWeb + '/storewebback/selectGoodsType.php',
      data: {
        goodsType: index
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.nodata = true;
        }
        else {
          that.data.nodata = false;
        }
          that.setData({
            goodsListItems: res.data,
            nodata:that.data.nodata
          });
        }
    })
  },
  goodsdetail: function (e) {
    var index = parseInt(e.target.dataset.index);
    console.log("fegaskfeh: " + index);
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  },
  back: function (e) {
    wx.reLaunch({
      url: '../index/index',
    })
  },
})
