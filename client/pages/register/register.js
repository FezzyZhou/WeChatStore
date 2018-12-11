Page({
  data: {
    phone: '',
    password: '',
    items: [
      { name: '1', value: '普通用户', checked: 'true' },
      { name: '2', value: '商户',  },
    ], 
    chooseValue: '1'

  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
        })
      },
    })
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
  register: function () {
    var that = this
      wx.request({
        url: getApp().globalData.localWeb + '/storewebback/register.php',
        data: {
          userImagUrl: that.data.userInfo.avatarUrl,
          userName: that.data.userInfo.nickName,
          usersAccount: that.data.phone,
          usersPassWords: that.data.password,
          chooseValue:that.data.chooseValue
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (parseInt(res.data) == "1") {
            wx.showToast({
              title: '注册成功',
              icon: 'loading',
              duration: 2000
            })
            wx.navigateBack(true);
          }
          else {
            wx.showToast({
              title: '该账号已存在！',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      });
  },
  
  back: function () {
    wx.navigateBack(true);
  },
  radioChange: function (e) {
    this.setData({
      chooseValue: e.detail.value
    })
  }

})
 
