//var postgoodsdata = require('../../../data/address.js');
Page({
  data: {
    addresslist: [],
    currentId: 0,
    datanull: false,
  },
  onLoad: function (option) {
    //需要传入userID，此处默认为1
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/addressManage/selectAddress.php',
      data: {
        userId: getApp().globalData.currentUserId,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.datanull = true;
        }
        else {
          that.data.datanull = false;
        }
        that.setData({
          addresslist: res.data,
          datanull: that.data.datanull,
        });
      }
    });
  },
  onShow: function (options) {
    //需要传入userID，此处默认为1
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/addressManage/selectAddress.php',
      data: {
        userId: getApp().globalData.currentUserId,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.length == 0) {
          that.data.datanull = true;
        }
        else {
          that.data.datanull = false;
        }
        that.setData({
          addresslist: res.data,
          datanull: that.data.datanull,
        });
      }
    });
  },
  setDefault: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);

    var i;
    for (i = 0; i < that.data.addresslist.length; i++) {
      if (that.data.addresslist[i].addressId == index) {
        that.data.addresslist[i].isDefault = 1;

        wx.request({
          url: getApp().globalData.localWeb + '/storewebback/addressManage/alertAddress.php',
          data: {
            addressId: that.data.addresslist[i].addressId,
            userId: that.data.addresslist[i].userId,
            realname: that.data.addresslist[i].realname,
            mobile: that.data.addresslist[i].mobile,
            province: that.data.addresslist[i].province,
            city: that.data.addresslist[i].city,
            region: that.data.addresslist[i].region,
            town: that.data.addresslist[i].town,
            detail: that.data.addresslist[i].detail,
            isDefault: 1
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            //修改地址默认值成功
            that.setData({
            });
          }
        });

      }
      else {
        that.data.addresslist[i].isDefault = 0;
        wx.request({
          url: getApp().globalData.localWeb + '/storewebback/addressManage/alertAddress.php',
          data: {
            addressId: that.data.addresslist[i].addressId,
            userId: that.data.addresslist[i].userId,
            realname: that.data.addresslist[i].realname,
            mobile: that.data.addresslist[i].mobile,
            province: that.data.addresslist[i].province,
            city: that.data.addresslist[i].city,
            region: that.data.addresslist[i].region,
            town: that.data.addresslist[i].town,
            detail: that.data.addresslist[i].detail,
            isDefault: 0
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            that.setData({
            });
          }
        });
      }
    }
    that.setData({
      addresslist: that.data.addresslist,
    });


  },

  editAddress: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../addressEdit/addressEdit?index=' + index,
    })
  },
  addAddress: function (e) {
    wx.navigateTo({
      url: '../addressAdd/addressAdd',
    })
  },
})