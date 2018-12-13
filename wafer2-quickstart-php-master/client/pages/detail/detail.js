//var postgoodsdata = require('../../data/goods.js');
//var localWeb=getApp().globalData.localWeb;
Page({
  data: {
    bottoncolor1: "#008841",
    bottoncolor2: "#008841",
    currentPostId: 0,
    titleText: "全部评论",
    postUserComment: [],
    currentComment: [],
  },

  onLoad: function (options) {
    //this.data.currentPostId = index;
    //    this.data.postData = postgoodsdata.goodsItems[index];
    //   if (this.data.postData.userComment.length == 0) {
    //     this.data.titleText = "暂无评论";
    //    }
    //   if (this.data.postData.userComment.length > 3) {
    //      this.data.postUserComment = [this.data.postData.userComment[0], this.data.postData.userComment[1], this.data.postData.userComment[3]];
    //    }
    //   else{
    //     this.data.postUserComment = this.data.postData.userComment;
    //   }
    //   this.setData({
    //     postData: postgoodsdata.goodsItems[index],
    //    currentPostId: this.data.currentPostId,
    //     titleText: this.data.titleText,
    //    postUserComment: this.data.postUserComment
    //   })
    //需要传入userId，goodsId，此处默认userId=1
    var index = parseInt(options.index);
    var that = this;
    wx.request({
      url: getApp().globalData.localWeb + '/storewebback/selectCommentsById.php',
      data: {
        userId: getApp().globalData.currentUserId,
        goodsId: index
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.data.currentPostId = index;
        that.data.currentComment = res.data[1];
        if (that.data.currentComment.length == 0) {
          that.data.titleText = "暂无评论";
        }
        if (that.data.currentComment.length > 3) {
          that.data.postUserComment = [that.data.currentComment[0], that.data.currentComment[1], that.data.currentComment[3]];
        }
        else {
          that.data.postUserComment = that.data.currentComment;
        }
        that.setData({
          titleText: that.data.titleText,
          postUserComment: that.data.postUserComment,
          postData: res.data[0],
          currentComment: res.data[1],
          currentPostId: index,
        });
      }
    });
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  addcart: function (e) {
    var index = parseInt(this.data.currentPostId);
    wx.navigateTo({
      url: '../addOrder/addOrder?index=' + index + '&pageType=' +1,
    })
    this.setData({
      // bottoncolor1: "#008841"
    });
  },

  addbuy: function (e) {
    this.setData({
      //  bottoncolor2: "#008841"
    });
    var id = this.data.currentPostId;
    var that = this;
    wx.showModal({
      title: '前往支付',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '跳转中...',
          })
          setTimeout(function () {
            wx.hideLoading();
            var index = parseInt(that.data.currentPostId);
            wx.navigateTo({
              url: '../addOrder/addOrder?index=' + index + '&pageType=' +2,
            })
          }, 1000)
        } else {
          //  wx.navigateTo({
          //    url: '../detail/detail?index=' + id,
          //  })
          //     that.refresh();
        }
      }
    })
  },

  /// refresh: function (event) {
  //  this.setData({
  //     bottoncolor2: "#292929"
  ///   });
  //  },

  seeMore: function (event) {
    var index = this.data.currentPostId;
    wx.navigateTo({
      url: '../commentLsit/commentLsit?index=' + index ,
    })
  },


})
