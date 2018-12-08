var app = getApp();
Page({
  data: {
    phone: '',
    password: '',
    resId: 0,
    items: [
      { name: '1', value: '普通用户', checked: 'true' },
      { name: '2', value: '商户', },
    ],
    chooseValue: '1'
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
      url: getApp().globalData.localWeb + '/storewebback/login.php',
      data: {
        usersAccount: that.data.phone,
        usersPassWords: that.data.password,
        chooseValue: that.data.chooseValue
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //修改地址默认值成功
        that.data.resId = parseInt(res.data);
        console.log("huasfaevo:  "+that.data.resId);
        if (that.data.resId == -1) {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'loading',
            duration: 2000
          })
        }
        else if (that.data.resId == -2) {
          wx.showToast({
            title: '请注册',
            icon: 'loading',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          app.globalData.currentUserId = that.data.resId;
          that.setData({
            resId: that.data.resId
          });
          if (that.data.chooseValue=="1"){
            wx.reLaunch({
              url: '../index/index',
            })
          }
         else{
            wx.reLaunch({
              url: '../tenant/tenant',
            })
         }
        }
        
      }
    });
  
  },
  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  radioChange: function (e) {
    this.setData({
      chooseValue: e.detail.value
    })
  }
})
