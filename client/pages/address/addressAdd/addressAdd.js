//var postgoodsdata = require('../../../data/address.js');
Page({
  data: {
    addressItem: {
      realname: "",
      mobile: "",
      province: "",
      city: "",
      region: "",
      town: "",
      detail: ""
    },
    addresslist: []
  },
  onLoad: function (options) {

  },
  inputrealname: function (e) {
    this.data.addressItem.realname = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  inputmobile: function (e) {
    this.data.addressItem.mobile = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  inputprovince: function (e) {
    this.data.addressItem.province = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  inputcity: function (e) {
    this.data.addressItem.city = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  inputregion: function (e) {
    this.data.addressItem.region = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  inputtown: function (e) {
    this.data.addressItem.town = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  inputdetail: function (e) {
    this.data.addressItem.detail = e.detail.value;
    this.setData({
      addressItem: this.data.addressItem,
    })
  },
  sureAddress: function (options) {
    if (this.data.addressItem.realname && this.data.addressItem.mobile && this.data.addressItem.province && this.data.addressItem.city && this.data.addressItem.region && this.data.addressItem.town && this.data.addressItem.detail) {
      //插入数据库操作
      //此处默认用户id=1，需要注册操作后才能修改
      var that = this;
      wx.request({
        url: getApp().globalData.localWeb +'/storewebback/addressManage/insertAddress.php',
        data: {
          userId: getApp().globalData.currentUserId,
          realname: that.data.addressItem.realname,
          mobile: that.data.addressItem.mobile,
          province: that.data.addressItem.province,
          city: that.data.addressItem.city,
          region: that.data.addressItem.region,
          town: that.data.addressItem.town,
          detail: that.data.addressItem.detail,
          isDefault: 0
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data);
          //修改地址默认值成功
          that.setData({
          });
        }
      });
      wx.showLoading({
        title: '保存中...',
      })
      setTimeout(function () {
        wx.hideLoading();
        wx.navigateBack(true);
      }, 1000)
    }
    else {
      wx.showModal({
        title: '提示',
        content: '信息不完整，请重新输入！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  noEdit: function (options) {
    wx.navigateBack(true);
  },

})