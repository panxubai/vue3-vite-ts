// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumData:[],
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    //获取用户信息
    wx.getStorage({
      key: 'IFOpenId',
      success: function (res) {
        //console.log(res)
        that.setData({
          userInfo: res.data,
          login: true
        });
        that.ajaxData()
      }
    })
  
  },

    //请求数据
    ajaxData:function(){
      let that = this;
      wx.request({
        url: 'https://wx.sciences.ac.cn/chashoucang',
        data: {
          oppenId: that.data.userInfo.openId
        },
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res)
          that.setData({
            sumData:res.data
          })
          wx.hideLoading()
        }
      })
    },
  //点击进去详情
  detailsTap: function (e) {
    wx.navigateTo({
      url: '../details/details?sid=' + e.currentTarget.dataset.id + "&slsjk=" + e.currentTarget.dataset.slsjk
    })
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