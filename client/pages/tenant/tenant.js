var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: '',
    userListInfo: [{
      icon: '../../images/icons/iconfont-dingdan.png',
      text: '待处理订单',
      isunread: true,
      unreadNum: 0,
      listTypeId: 0
    },
      {
        icon: '../../images/icons/iconfont-dingdan.png',
        text: '已完成订单',
        isunread: true,
        unreadNum: 0,
        listTypeId: 1
      },
    {
      icon: '../../images/icons/iconfont-shouhuodizhi.png',
      text: '上传商品',
      listTypeId: 2
    },
    {
      icon: '../../images/icons/iconfont-kefu.png',
      text: '我的商品',
      listTypeId: 3
    },
    {
      icon: '../../images/icons/iconfont-help.png',
      text: '退出登录',
      listTypeId: 4
    }],
    income: 0
  },

  onLoad: function () {
   
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  goodsStutas: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../orderIfo/orderIfo?index=' + index,
    })
  },

  listTypeId: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    if (index == 0) {
      wx.navigateTo({
        url: 'orderPro/orderPro',
      })
    }
    else if (index == 1) {
      wx.navigateTo({
        url: 'finishOrders/finishOrders',
      })
    }
    else if (index == 2) {
      wx.navigateTo({
        url: 'uploadGoods/uploadGoods',
      })
    }
    else if (index == 4) {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    else {
      wx.navigateTo({
        url: 'tenantGoodsList/tenantGoodsList',
      })
    }
  },
})