// pages/discuss/discuss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptShow:false,//是否显示输入框 true显示
    photoShow: true,//是否点赞 true没有
    userInfo: {},//获取用户姓名和头像
    sumData:[],
    mainInput:"",//输入评论
  },
  //点击显示输入框
  butTap:function(){
    this.setData({
      iptShow:true
    })
  },
  //输入框消失
  showNo: function () {
    this.setData({
      iptShow: false
    })
  },
  //点击进入详情
  moveTap: function (e) {
    wx.navigateTo({
      url: '../move/move?id=' + e.currentTarget.dataset.id
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
    //获取用户信息
    let that = this;
    wx.getStorage({
      key: 'IFOpenId',
      success: function (res) {
        that.setData({
          userInfo: res.data,
          login: true
        });

      }

      
    })
    that.ajaxData()
  },
  //请求详情页数据
  ajaxData() {
    let that = this;
    wx.request({
      url: 'https://wx.sciences.ac.cn/tlzhanshi',
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
      data: {
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
  //点赞
  dianzanTap:function(){
    console.log(2312)
  },

//输入值
mainInput:function(e){
  this.setData({
    mainInput: e.detail.value
  })
},
//点击发布
  fabuTap:function(){
    if (this.data.mainInput == ""){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    }else{
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    let that = this;
    wx.request({
      url: 'https://wx.sciences.ac.cn/tlinsert',
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
      data: {
        openId:that.data.userInfo.openId,
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