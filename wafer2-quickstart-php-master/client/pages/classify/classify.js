Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "绿色果蔬",
      },
      {
        cate_id: 2,
        cate_name: "畜牧水产",
      },
      {
        cate_id: 3,
        cate_name: "粮油米面",
      },
      {
        cate_id: 4,
        cate_name: "农副加工",
      }
    ],
    ishaveChild: [false, false, false, false],
    curNav: 1,
    curIndex: 0,
    goodsListItems: []
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: getApp().globalData.localWeb + '/storewebback/selectGoodsType.php',
      data: {
        goodsType: that.data.curNav
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.ishaveChild[that.data.curIndex] = false;
        }
        else {
          that.data.ishaveChild[that.data.curIndex] = true;
          that.setData({
            goodsListItems: res.data,
            ishaveChild: that.data.ishaveChild
          });
        }
      },
    })
  },
  //事件处理函数 
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值 
    var id = e.target.dataset.id;
    var index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index 
    this.setData({
      curNav: id,
      curIndex: index
    });
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: getApp().globalData.localWeb + '/storewebback/selectGoodsType.php',
      data: {
        goodsType: that.data.curNav
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.ishaveChild[that.data.curIndex] = false;
        }
        else {
          that.data.ishaveChild[that.data.curIndex] = true;
          that.setData({
            goodsListItems: res.data,
            ishaveChild: that.data.ishaveChild
          });
        }
      },
    })
  },
  goodsdetail: function (e) {
    var index = parseInt(e.target.dataset.index);
    console.log("fegaskfeh: "+index);
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  }
})
