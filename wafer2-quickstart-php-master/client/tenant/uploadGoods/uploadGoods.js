Page({
  data: {
    goodsItem: {
      goodsName: "",
      goodsPrice: "",
      goodsLocation: "",
      goodsTransfee: "",
      goodsImageUrl: "../../../images/timg.jpg",
      goodsIntroducetext: "",
      goodsKucun: "",
      goodsType: 1,
     // tenantId:0,
      ifUnder: 0,
      goodsScore: 10,
      goodsSale: 0
    },
    typeText: ""
  },
  onLoad: function (options) {
    var that = this;
    that.data.goodsItem.tenantId = getApp().globalData.currentUserId;
    that.setData({
      goodsItem: that.data.goodsItem,
    })
  },
  chooseImage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      //itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera')
          }
        }
      }
    })
  },
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.data.goodsItem.goodsImageUrl = res.tempFilePaths[0]
        that.setData({
          goodsItem: that.data.goodsItem,
        })
      }
    })
  },
  upload: function (url, filePath) {
    var that=this;
    if (this.data.goodsItem.goodsName && this.data.goodsItem.goodsPrice && this.data.goodsItem.goodsLocation && this.data.goodsItem.goodsTransfee && this.data.goodsItem.goodsImageUrl && this.data.goodsItem.goodsIntroducetext && this.data.goodsItem.goodsKucun && this.data.goodsItem.goodsType ){
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
        wx.uploadFile({
          url: getApp().globalData.localWeb + '/storewebback/test.php',
          filePath: that.data.goodsItem.goodsImageUrl,
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          formData: {
            'goodsName': that.data.goodsItem.goodsName,
            'goodsPrice': that.data.goodsItem.goodsPrice,
            'goodsLocation': that.data.goodsItem.goodsLocation,
            'goodsTransfee': that.data.goodsItem.goodsTransfee,
            'goodsIntroducetext': that.data.goodsItem.goodsIntroducetext,
            'goodsKucun': that.data.goodsItem.goodsKucun,
            'goodsType': that.data.goodsItem.goodsType,
            'tenantId': that.data.goodsItem.tenantId,
            'ifUnder': that.data.goodsItem.ifUnder,
            'goodsScore': that.data.goodsItem.goodsScore,
            'goodsSale': that.data.goodsItem.goodsSale,
          },
          success: function (res) {
            //console.log(res.data);
            wx.navigateBack(true);
          },
          fail: function (e) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast();  //隐藏Toast
          }
        })
    }
   else{
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
  inputgoodsName: function (e) {
    this.data.goodsItem.goodsName = e.detail.value;
    this.setData({
      goodsItem: this.data.goodsItem,
    })
  },
  inputgoodsPrice: function (e) {
    this.data.goodsItem.goodsPrice = e.detail.value;
    this.setData({
      goodsItem: this.data.goodsItem,
    })
  },
  inputgoodsLocation: function (e) {
    this.data.goodsItem.goodsLocation = e.detail.value;
    this.setData({
      goodsItem: this.data.goodsItem,
    })
  },
  inputgoodsTransfee: function (e) {
    this.data.goodsItem.goodsTransfee = e.detail.value;
    this.setData({
      goodsItem: this.data.goodsItem,
    })
  },
  inputgoodsKucun: function (e) {
    this.data.goodsItem.goodsKucun = e.detail.value;
    this.setData({
      goodsItem: this.data.goodsItem,
    })
  },
  inputgoodsIntroducetext: function (e) {
    this.data.goodsItem.goodsIntroducetext = e.detail.value;
    this.setData({
      goodsItem: this.data.goodsItem,
    })
  },
  inputgoodsType: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['绿色果蔬', '畜牧水产', '粮油米面', '农副加工'],
      //itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          that.data.goodsItem.goodsType = res.tapIndex + 1;
          if (res.tapIndex == 0) {
            that.data.typeText = '绿色果蔬';
          }
          else if (res.tapIndex == 1) {
            that.data.typeText = '畜牧水产';
          }
          else if (res.tapIndex == 2) {
            that.data.typeText = '粮油米面';
          }
          else {
            that.data.typeText = '农副加工';
          }
          that.setData({
            goodsItem: that.data.goodsItem,
            typeText: that.data.typeText
          })
        }
      }
    })
  },
  noEdit: function (options) {
    wx.navigateBack(true);
  },

})