// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,//false没有登陆true 登陆
    userInfo:{},//存头像id等信息
    list: [{ title: "收藏", img: "../../img/shoucang.jpg" }, { title: "评论", img: "../../img/pinglun.jpg" }, { title: "通知", img: "../../img/tongzhi.jpg" }, { title: "交流", img: "../../img/me_discuss.png" }]//, { title: "发布", img: "../../img/fabu.jpg" }
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
            login:true
          });
      }
    })
  },
//点击跳转页面
  clickTap:function(e){
    console.log(e.currentTarget.dataset.index)
    if(!this.data.login){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }else{
      if (e.currentTarget.dataset.index == 0) { //收藏
        wx.navigateTo({
          url: '../collect/collect'
        })
      } else if (e.currentTarget.dataset.index == 1) { //评论
        wx.navigateTo({
          url: '../comment/comment'
        })

      } else if (e.currentTarget.dataset.index == 2) { //通知
        wx.navigateTo({
          url: '../notice/notice'
        })
      } else { //交流
        wx.navigateTo({
          url: '../discuss/discuss'
        })
      }
    }

  },
  //跳转我也不知道哪里
  submisTap:function(){
    if (!this.data.login) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../submission/submission'
      })
    }
  },
  //点击跳转建议
  suggestTap:function(){
    if (!this.data.login) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../suggestion/suggestion'
      })
    }
   

  }, 
  //点击登陆
  bindGetUserInfo: function (e) {
   // console.log(e)

    let that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showLoading({
        title: '正在登陆...',
        icon: 'loading',
        mask: true,
      })
      wx.login({
        success: function (res) {
          // console.log(res)
          if (res.code) {
            //发起网络请求 从后台获取openid
            wx.request({
              url: 'https://wx.sciences.ac.cn/decodeUserInfo',
              method: 'post',
              data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
              //  console.log(res)
                that.setData({
                  userInfo: res.data.userInfo,
                  login: true
                })
                
                // console.log(res)
                wx.setStorage({
                  key: "IFOpenId",
                  data: res.data.userInfo
                });
                wx.hideLoading()
                wx.showToast({
                  title: '登陆成功',
                  icon: 'none',
                  duration: 2000
                })

              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '登陆才能享受更多服务哦~',
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
     // console.log(e.detail)

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