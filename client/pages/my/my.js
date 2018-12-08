var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: '',
    navItems: [
      {
        name: "待付款",
        stutasTypeId: 0,
        imageurl: "/images/dingdan/Spotify.png"
      },
      {
        name: "待发货",
        stutasTypeId: 1,
        imageurl: "/images/dingdan/Messages.png"
      },
      {
        name: "已发货",
        stutasTypeId: 2,
        imageurl: "/images/dingdan/Finder.png"
      },
      {
        name: "已完成",
        stutasTypeId: 3,
        imageurl: "/images/dingdan/Reminders.png"
      }
    ],
    userListInfo: [{
      icon: '../../images/icons/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 0,
      listTypeId: 0
    },
    {
      icon: '../../images/icons/iconfont-shouhuodizhi.png',
      text: '收货地址',
      listTypeId: 1
    },
    {
      icon: '../../images/icons/iconfont-kefu.png',
      text: '联系客服',
      listTypeId: 2
    },
    {
      icon: '../../images/icons/iconfont-help.png',
      text: '退出登录',
      listTypeId: 3
    }]
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
        url: '../finishOrderList/finishOrderList',
      })
    }
    else if (index == 1) {
      wx.navigateTo({
        url: '../address/addressList/addressList',
      })
    }
    else if (index == 2) {
      wx.showModal({
        title: '电话',
        content: '10086+120',
        showCancel: false,
        success: function (res) {
        }
      })
    }
    else if (index == 3) {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    else {
      wx.showModal({
        title: '私聊！！！',
        content: '。。。',
        showCancel: false,
        success: function (res) {
        }
      })
    }
  },
})
