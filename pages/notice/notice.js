// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumData:[] 
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
    this.ajaxData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //请求数据
  ajaxData: function () {
    let that = this;
    wx.request({
      url: 'https://wx.sciences.ac.cn/notice',
      data: {
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        that.setData({
          sumData: res.data
        })
        wx.hideLoading()
      }
    })
  },
  //进详情
  jinquTap:function(e){
    wx.navigateTo({
      url: '../noticeDel/noticeDel?id=' + e.currentTarget.dataset.id
     })
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