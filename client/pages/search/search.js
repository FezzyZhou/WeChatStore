var app = getApp()
//var postgoodsdata = require('../../data/goods.js');
Page({
  data: {
    datanull: false,
    goodsList: [],
    searchWords: ""
  },
  onLoad: function (options) {
    var that = this;
    that.data.searchWords = options.searchWords;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/search.php',
      data: {
        searchWords: that.data.searchWords,
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
        //修改地址默认值成功
        that.setData({
          goodsList: res.data,
          datanull: that.data.datanull,
          searchText: that.data.searchText
        });
      }
    });
  },
  onShow: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/search.php',
      data: {
        searchWords: that.data.searchWords,
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
        //修改地址默认值成功
        that.setData({
          goodsList: res.data,
          datanull: that.data.datanull,
          searchWords: that.data.searchWords
        });
      }
    });
  },
  // 文本输入框
  inputSearch: function (e) {
    this.setData({
      searchWords: e.detail.value
    });
  },
  SelectItem: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  },
  doSearch: function (e) {
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/search.php',
      data: {
        searchWords: that.data.searchWords,
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
        //修改地址默认值成功
        that.setData({
          goodsList: res.data,
          datanull: that.data.datanull,
          searchWords: that.data.searchWords
        });
        that.onShow();
      }
    });
  },
  back: function (e) {
    wx.reLaunch({
      url: '../index/index',
    })
  },
}) 
