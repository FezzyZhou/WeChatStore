//var postgoodsdata = require('../../../data/address.js');
Page({
  data: {
    addressItem: []
  },
  onLoad: function (options) {
    var index = parseInt(options.index);
    var that = this;
    that.data.addressItem= [];
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/addressManage/detailAddress.php',
      data: {
        addressId: index
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          addressItem: res.data[0],
        });
      }
    });
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
      var that = this;
      //此处默认userid=1
      wx.request({
        url: getApp().globalData.localWeb + '/storewebback/addressManage/alertAddress.php',
        data: {
          addressId: that.data.addressItem.addressId,
          userId: that.data.addressItem.userId,
          realname: that.data.addressItem.realname,
          mobile: that.data.addressItem.mobile,
          province: that.data.addressItem.province,
          city: that.data.addressItem.city,
          region: that.data.addressItem.region,
          town: that.data.addressItem.town,
          detail: that.data.addressItem.detail,
          isDefault: that.data.addressItem.isDefault
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
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
      }, 2000)
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
  deleteAddress: function (options) {
    var that = this;
    console.log(that.data.addressItem.addressId);
    wx.showModal({
      title: '确定删除？',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: getApp().globalData.localWeb + '/storewebback/addressManage/deleteAddress.php',
            data: {
              addressId: that.data.addressItem.addressId,
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              //修改地址默认值成功
              console.log("res.data:"+res.data);
              that.setData({
                
              });
            }
          });

          wx.showLoading({
            title: '删除中...',
          })
          setTimeout(function () {
            wx.hideLoading();
            wx.navigateBack(true);
          }, 1000)
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  noEdit: function (options) {
    wx.navigateBack(true);
  },

})