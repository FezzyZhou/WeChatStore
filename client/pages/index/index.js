//获取应用实例
var app = getApp();
//var postgoodsdata = require('../../data/goods.js');
var goodsList;
Page({
  data: {
    searchWords: "",
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 100,
    circular: true,
    indicatorColor: "white",
    indicatorActiveColor: "#008841",
    loadingHidden: false,  // loading
    searchWords: '',
    placeholder: '',
    navItems: [
      {
        name: "绿色果蔬",
        typeId: 1,
        imageurl: "/images/shuiguo.png"
      },
      {
        name: "畜牧水产",
        typeId: 2,
        imageurl: "/images/shuichan.png"
      },
      {
        name: "粮油米面",
        typeId: 3,
        imageurl: "/images/liangyou.png"
      },
      {
        name: "农副加工",
        typeId: 4,
        imageurl: "/images/nongfu.png"
      }
    ],
    swipergoods: []
  },

  onLoad: function (option) {
    var that = this;
    console.log("hhh: " + getApp().globalData.localWeb);
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: getApp().globalData.localWeb + '/storewebback/selectGoodsList.php',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.data.goodsListItems = res.data;
        if (that.data.goodsListItems.length == 0) {
          that.data.swipergoods = ["http://localhost:8080/storewebback/images/error.jpg"];
        }
        if (that.data.goodsListItems.length > 3) {
          that.data.swipergoods = [that.data.goodsListItems[0], that.data.goodsListItems[1], that.data.goodsListItems[2]];
        }
        else {
          that.data.swipergoods = that.data.goodsListItems;
        }
        that.setData({
          swipergoods: that.data.swipergoods,
          goodsListItems: res.data
        });
      },

    })
    //this.setData({
    //swipergoods: [postgoodsdata.goodsItems[0], postgoodsdata.goodsItems[1], postgoodsdata.goodsItems[2], postgoodsdata.goodsItems[3]],
    // goodsListItems: postgoodsdata.goodsItems
    // });
  },
  //通过提供的JSON.stingify方法,将对象转换成字符串后传递
  catchTapCategory: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  },
  // 文本输入框
  inputSearch: function (e) {
    this.setData({
      searchWords: e.detail.value
    });
  },
  doSearch: function () {
    wx.navigateTo({
      url: '../search/search?searchWords=' + this.data.searchWords
    });
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
  },
  swipergoods: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);

    wx.navigateTo({
      url: '../detail/detail?index=' + index,
    })
  },
  dirToClassify: function (e) {
    var index = parseInt(e.target.dataset.index);
    wx.navigateTo({
      url: '../classifyList/classifyList?index=' + index,
    })
  }
})
