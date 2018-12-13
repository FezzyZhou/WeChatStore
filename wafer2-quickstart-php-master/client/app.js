//app.js
App({
  data: {
    phone: '',
    password: '',
    resId: 0
  },

  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      })
    }
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/finishiOrderList.php',
      data: {
        indexPost: 5,
        //此处默认用户1
        userId: 1
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //修改地址默认值成功
        that.setData({
          cartsList: that.data.cartsList,
          datanull: that.data.datanull,
        });
      }
    });
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面 
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  register: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面 
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    localWeb: "https://storeweb.butterfly.mopaasapp.com",
    //localWeb: "http://localhost:8080",
    currentUserId: 0
  }
})