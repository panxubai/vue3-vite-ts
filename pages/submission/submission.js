// pages/submission/submission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    nameIpt:"",
    ipenIpt: "",
    eamilIpt: "",
    danweiIpt: "",
    yanjiuIpt: "",
    moveIpt: "",
  },
  //点击提交
  subTap: function () {
    if (this.data.nameIpt == "" ||  this.data.eamilIpt == "" || this.data.yanjiuIpt == "") {
      wx.showToast({
        title: '请把必填信息填写完整',
        icon: 'none',
        duration: 1500
      })
    } 
    // else if (!(/^1[3456789]\d{9}$/.test(this.data.ipenIpt))){
    //   wx.showToast({
    //     title: '请填写正确的手机号',
    //     icon: 'none',
    //     duration: 1500
    //   })
    // } 
    else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.eamilIpt))) {
      wx.showToast({
        title: '请填写正确的邮箱',
        icon: 'none',
        duration: 1500
      })
    }else{
      let that = this;
      wx.showLoading({
        title: '正在加载...',
        icon: 'loading',
        mask: true,
      })
      wx.request({
        url: 'https://wx.sciences.ac.cn/insertTG',
        data: {
          oppenId: that.data.userInfo.openId,
          name: that.data.nameIpt,
          tel: that.data.ipenIpt == "" ? 'null' : that.data.ipenIpt,
          email: that.data.eamilIpt,
          school: that.data.danweiIpt == "" ? 'null' : that.data.danweiIpt,
          professional: that.data.yanjiuIpt,
          message: that.data.moveIpt == "" ? 'null' : that.data.moveIpt,
        },
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data.status)
          if (res.data.status == 200){
            wx.showToast({
              title: '提交成功，谢谢',
              icon: 'none',
              duration: 1500
            })
            setTimeout(function () {
              wx.navigateBack({ delta: 1});
            }, 1500)
          } 
        }
      })
    }
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
  //
  nameIpt:function(e){
    this.setData({
      nameIpt: e.detail.value
    })
  },
  ipenIpt: function (e) {
    this.setData({
      ipenIpt: e.detail.value
    })
  },
  eamilIpt: function (e) {
    this.setData({
      eamilIpt: e.detail.value
    })
  },
  danweiIpt: function (e) {
    this.setData({
      danweiIpt: e.detail.value
    })
  },
  yanjiuIpt: function (e) {
    this.setData({
      yanjiuIpt: e.detail.value
    })
  },
  moveIpt: function (e) {
    this.setData({
      moveIpt: e.detail.value
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