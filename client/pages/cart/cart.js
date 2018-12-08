var app = getApp();
//var postgoodsdata = require('../../data/goods.js');
Page({
  data: {
    selectedAllStatus: false,
    totalMoney: 0,
    isSelect: [],
    minusStatuses: [],
    cartsList: [],
  },

  onLoad: function (option) {
    var that = this;
    that.data.isSelect = [];
    that.data.minusStatuses = [];
    that.data.cartsList = [];
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/cartList.php',
      data: {
        indexPost: 1,
        userId: getApp().globalData.currentUserId
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
        var i;
        that.data.cartsList = res.data;
        for (i = 0; i < res.data.length; i++) {
          that.data.isSelect[that.data.cartsList[i].ordersId] = false;
          if (that.data.cartsList[i].goodsSelectCount > 1) {
            that.data.minusStatuses[that.data.cartsList[i].ordersId] = 'normal';
          }
          else {
            that.data.minusStatuses[that.data.cartsList[i].ordersId] = 'disabled';
          }
        }
        //修改地址默认值成功
        that.setData({
          cartsList: that.data.cartsList,
          datanull: that.data.datanull,
          minusStatuses: that.data.minusStatuses
        });
      }
    });
  },
  onShow: function (option) {
    var that = this;
    that.data.isSelect = [];
    that.data.minusStatuses = [];
    that.data.cartsList = [];
    that.data.selectedAllStatus = false;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/cartList.php',
      data: {
        //传入订单状态
        indexPost: 1,
        //此处默认用户1
        userId: getApp().globalData.currentUserId
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
        var i;
        that.data.cartsList = res.data;
        for (i = 0; i < res.data.length; i++) {
          that.data.isSelect[that.data.cartsList[i].ordersId] = false;
          if (that.data.cartsList[i].goodsSelectCount > 1) {
            that.data.minusStatuses[that.data.cartsList[i].ordersId] = 'normal';
          }
          else {
            that.data.minusStatuses[that.data.cartsList[i].ordersId] = 'disabled';
          }
        }
        //修改地址默认值成功
        that.setData({
          cartsList: that.data.cartsList,
          datanull: that.data.datanull,
          minusStatuses: that.data.minusStatuses
        });
      }
    });
  },

  //勾选事件处理函数  
  bindCheckbox: function (e) {
    // 获取item项的id，和数组的下标值  
    var AllMoney = 0, i = 0, total = 0;
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    that.data.isSelect[that.data.cartsList[index].ordersId] = !that.data.isSelect[that.data.cartsList[index].ordersId];;
    for (i = 0; i < this.data.cartsList.length; i++) {
      AllMoney = AllMoney + this.data.cartsList[i].goodsPrice * this.data.cartsList[i].goodsSelectCount;
      if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
        total = total + this.data.cartsList[i].goodsPrice * this.data.cartsList[i].goodsSelectCount;
      }
    }
    //判断是否全选
    if (AllMoney == total) {
      this.data.selectedAllStatus = true;
    }
    else {
      this.data.selectedAllStatus = false;
    }
    this.setData({
      cartsList: this.data.cartsList,
      totalMoney: total,
      selectedAllStatus: this.data.selectedAllStatus,
      isSelect: that.data.isSelect
    })
  },

  //全选
  bindSelectAll: function (e) {
    //处理全选逻辑
    var i = 0;
    var that = this;
    this.data.totalMoney = 0;
    if (!this.data.selectedAllStatus) {
      for (i = 0; i < this.data.cartsList.length; i++) {
        that.data.isSelect[that.data.cartsList[i].ordersId] = true;
        this.data.totalMoney = this.data.totalMoney + this.data.cartsList[i].goodsPrice * this.data.cartsList[i].goodsSelectCount;
      }
    }
    else {
      for (i = 0; i < this.data.cartsList.length; i++) {
        that.data.isSelect[that.data.cartsList[i].ordersId] = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      selectedAllStatus: !this.data.selectedAllStatus,
      cartsList: this.data.cartsList,
      totalMoney: this.data.totalMoney,
      isSelect: that.data.isSelect
    })
  },

  // 去结算
  bindCheckout() {
    //数据库处理
    var that = this;
    var i;
    //数据库处理
    var flag = false;
    for (i = 0; i < this.data.cartsList.length; i++) {
      if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
        flag = true;
        that.data.cartsList[i].ordersStatus = 2;
        wx.request({
          url: getApp().globalData.localWeb + '/storewebback/orderManage/cartPay.php',
          data: {
            ordersId: that.data.cartsList[i].ordersId,
            goodsId: that.data.cartsList[i].goodsId,
            goodsSelectCount: that.data.cartsList[i].goodsSelectCount,
            ordersStatus: 2
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
    }
    if (flag) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      });
      that.onShow();
      wx.navigateBack(true);
    }
    else {
      wx.showModal({
        title: '提示',
        content: '未选择商品',
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

  //减
  bindMinus: function (e) {
    var that = this;
    var total = 0, i = 0;
    var index = parseInt(e.currentTarget.dataset.index);
    for (i = 0; i < this.data.cartsList.length; i++) {
      if (this.data.cartsList[i].ordersId == index) { index = i; break; }
    }
    var num = this.data.cartsList[index].goodsSelectCount;
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    that.data.minusStatuses[that.data.cartsList[index].ordersId] = num <= 1 ? 'disabled' : 'normal';
    this.data.cartsList[index].goodsSelectCount = num;
    // 将数值与状态写回

    for (i = 0; i < this.data.cartsList.length; i++) {
      if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
        total = total + this.data.cartsList[i].goodsPrice * this.data.cartsList[i].goodsSelectCount;
      }
    }
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/cartUpload.php',
      data: {
        ordersId: that.data.cartsList[index].ordersId,
        goodsSelectCount: that.data.cartsList[index].goodsSelectCount,
        ordersStatus: that.data.cartsList[index].ordersStatus,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //修改地址默认值成功
        that.setData({
        });
      }
    });

    this.setData({
      cartsList: this.data.cartsList,
      totalMoney: total,
      isSelect: that.data.isSelect,
      minusStatuses: that.data.minusStatuses
    });
    // update database
  },

  //加号
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    //此处index为ordersId
    var that = this;
    var total = 0, i = 0;
    for (i = 0; i < this.data.cartsList.length; i++) {
      if (this.data.cartsList[i].ordersId == index) { index = i; break; }
    }
    var num = this.data.cartsList[index].goodsSelectCount;
    // 自增
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    that.data.minusStatuses[that.data.cartsList[index].ordersId] = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    this.data.cartsList[index].goodsSelectCount = num;
    // 按钮可用状态
    for (i = 0; i < this.data.cartsList.length; i++) {
      if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
        total = total + this.data.cartsList[i].goodsPrice * this.data.cartsList[i].goodsSelectCount;
      }
    }
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/cartUpload.php',
      data: {
        ordersId: that.data.cartsList[index].ordersId,
        goodsSelectCount: that.data.cartsList[index].goodsSelectCount,
        ordersStatus: that.data.cartsList[index].ordersStatus,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //修改地址默认值成功
        that.setData({
        });
      }
    });
    this.setData({
      cartsList: this.data.cartsList,
      totalMoney: total,
      minusStatuses: that.data.minusStatuses,
      isSelect: that.data.isSelect
    });
  },

  //获取输入框的值
  bindManual: function (e) {
    var that = this;
    var total = 0, i = 0;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = e.detail.value;
    for (i = 0; i < this.data.cartsList.length; i++) {
      if (this.data.cartsList[i].ordersId == index) { index = i; break; }
    }
    this.data.cartsList[index].goodsSelectCount = num;

    for (i = 0; i < this.data.cartsList.length; i++) {
      if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
        total = total + this.data.cartsList[i].goodsPrice * this.data.cartsList[i].goodsSelectCount;
      }
    }
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/orderManage/cartUpload.php',
      data: {
        ordersId: that.data.cartsList[index].ordersId,
        goodsSelectCount: that.data.cartsList[index].goodsSelectCount,
        ordersStatus: that.data.cartsList[index].ordersStatus,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //修改地址默认值成功
        that.setData({
        });
      }
    });
    this.setData({
      cartsList: this.data.cartsList,
      totalMoney: total,
      isSelect: that.data.isSelect
    });
  },
  bindDelete: function (e) {
    var that = this;
    var i;

    var flag = false;
    for (i = 0; i < this.data.cartsList.length; i++) {
      if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
        flag = true;
        //数据库处理
        for (i = 0; i < this.data.cartsList.length; i++) {
          if (that.data.isSelect[that.data.cartsList[i].ordersId]) {
            wx.request({
              url: getApp().globalData.localWeb + '/storewebback/orderManage/cartDelete.php',
              data: {
                ordersId: that.data.cartsList[i].ordersId,
              },
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                //修改地址默认值成功
                that.setData({
                  cartsList: that.data.cartsList,
                });
              }
            });
          }
        }
      }
    }
    if (flag) {
      wx.showLoading({
        title: '删除中...',
      })
      setTimeout(function () {
        wx.hideLoading();
        wx.navigateBack(true);
      }, 2000)
    }
    else {
      wx.showModal({
        title: '提示',
        content: '未选择商品',
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

  SelectItem: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  }

})