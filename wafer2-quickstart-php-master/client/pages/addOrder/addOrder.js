//var postgoodsdata = require('../../../data/address.js');
Page({
  data: {
    addresslist: [],
    currentId: 0,
    postData: [],
    selsectCount: 0,
    pageType: 1
  },
  onLoad: function (option) {
    //需要传入userID，此处默认为1
    var index = parseInt(option.index);
    this.data.pageType = parseInt(option.pageType);
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/addressManage/selectAddress.php',
      data: {
        userId: getApp().globalData.currentUserId,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          addresslist: res.data,
        });
      }
    });
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/selectCommentsById.php',
      data: {
        goodsId: index
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          postData: res.data[0],
        });
      }
    });
  },
  onShow: function (option) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/addressManage/selectAddress.php',
      data: {
        userId: getApp().globalData.currentUserId,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          addresslist: res.data,
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
            //realname: that.data.addresslist[i].realname,
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
            //realname: that.data.addresslist[i].realname,
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
      url: '../address/addressEdit/addressEdit?index=' + index,
    })
  },
  inputOrderCount: function (e) {
    this.data.selsectCount = parseInt(e.detail.value);
    this.setData({
      selsectCount: this.data.selsectCount,
    })
  },
  addOrder: function (e) {
    var that = this;
    //此处默认用户为1
    if (that.data.selsectCount > 0 && that.data.selsectCount <= that.data.postData.goodsKucun && that.data.addresslist.length != 0) {
      var i, index;
      for (i = 0; i < that.data.addresslist.length; i++) {
        if (that.data.addresslist[i].isDefault == 1) {
          index = i; break;
        }
      }
      wx.request({
        url: getApp().globalData.localWeb + '/storewebback/orderManage/orderAdd.php',
        data: {
          userId: getApp().globalData.currentUserId,
          goodsId: that.data.postData.goodsId,
          goodsSelectCount: that.data.selsectCount,
          realname: that.data.addresslist[index].realname,
          mobile: that.data.addresslist[index].mobile,
          addressIfo: that.data.addresslist[index].province + that.data.addresslist[index].city + that.data.addresslist[index].region + that.data.addresslist[index].town + that.data.addresslist[index].detail,
          ordersStatus: that.data.pageType
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          //修改地址默认值成功
          that.setData({
          });
        }
      });
      if (that.data.pageType == 1) {
        wx.showLoading({
          title: '已加入购物车',
        })
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateBack(true);
        }, 2000)
      }
      else {
        wx.showLoading({
          title: '购买成功!',
        })
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateBack(true);
        }, 2000)
      }
    }
    else if (that.data.selsectCount > 0 && that.data.selsectCount <= that.data.postData.goodsKucun && that.data.addresslist.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择收货地址！',
        showCancel: false,
        success: function (res) {
        }
      })
    }
    else {
      var i = 0;
      var flag = false;
      for (i = 0; i < that.data.addresslist.length; i++) {
        if (that.data.addresslist[i].isDefault == 1) {
          flag = true; break;
        }
      }
      if (flag) {
        wx.showModal({
          title: '提示',
          content: '请重新输入商品数量！',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      else {
        wx.showModal({
          title: '提示',
          content: '请选择地址！',
          showCancel: false,
          success: function (res) {
          }
        })
      }

    }
  },
  addAddress: function (e) {
    wx.navigateTo({
      url: '../address/addressAdd/addressAdd',
    })
  },
})