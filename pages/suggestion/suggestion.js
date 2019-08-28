// pages/suggestion/suggestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    mainIpt:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取用户信息
    wx.getStorage({
      key: 'IFOpenId',
      success: function (res) {
        //console.log(res)
        that.setData({
          userInfo: res.data,
        });
      }
    })
  },
  binIpt:function(e){
    this.setData({
      mainIpt: e.detail.value
    })
  },
//
ajaxData:function(){
  let that = this;
  if (that.data.mainIpt == ""){
    wx.showToast({
      title: '内容不能为空',
      icon: 'none',
      duration: 1500
    })
  }else{
  wx.request({
    url: 'https://wx.sciences.ac.cn/insertJy',
    data: {
      oppenId: that.data.userInfo.openId,
      message: that.data.mainIpt,
    },
    method: "POST",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success: function (res) {
      console.log(res)
      if (res.data.status == 200) {
        wx.showToast({
          title: '提交成功，感谢您的建议',
          icon: 'none',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({ delta: 1 });
        }, 1500)
      }
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