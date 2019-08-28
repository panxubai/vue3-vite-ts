// pages/move/move.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptShow: false,//是否显示输入框 true显示
    photoShow: true,//是否点赞 true没有
    sumData:[],
    userInfo:{},
    mainInput:"",//用户输入
    ids:""
  },

  //点击显示输入框
  butTap: function () {
    this.setData({
      iptShow: true
    })
  },
  //输入框消失
  showNo: function () {
    this.setData({
      iptShow: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    this.setData({
      ids: options.id,
    })
    //获取用户信息
    let that = this;
    wx.getStorage({
      key: 'IFOpenId',
      success: function (res) {
        that.setData({
          userInfo: res.data,
        });

      }
    })
    that.ajaxData()
  },
  //请求详情页数据
  ajaxData() {
    let that = this;
    wx.request({
      url: 'https://wx.sciences.ac.cn/tlzhanshib',
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
      data: {
        id: that.data.ids
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          sumData: res.data
        });
        wx.hideLoading()


      }
    })
  },
  //输入值
  mainInput: function (e) {
    this.setData({
      mainInput: e.detail.value
    })
  },
  //点击发布
  fabuTap: function () {
    if (this.data.mainInput == "") {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '正在加载...',
        icon: 'loading',
        mask: true,
      })
      let that = this;
      wx.request({
        url: 'https://wx.sciences.ac.cn/tlinsertb',
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
        data: {
          id:that.data.ids,
          openId: that.data.userInfo.openId,
          message: that.data.mainInput
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            iptShow: false
          });
          wx.hideLoading()
          that.ajaxData()
          wx.showToast({
            title: '评论成功',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})