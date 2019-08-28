// pages/details/details.js
var Wxcharts = require('../../utils/wxcharts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    colleat:false,//收藏
    commentShow:true,//有评论为true
    inputShow:false,//输入评论
    userInfo: {},//获取用户姓名和头像
    datailData: [],//qita数据
    options:{},
    mainInput:"",//评论内容
    subscriber:false,//根据订阅显示遮罩层
    emailIpt:"",
    listFW: [],
  },
//点击订阅按钮
  dingyueTap:function(){
    if (this.data.login) {
      this.setData({
        subscriber:true
      })
    }
  },
  emailIpt:function(e){
    this.setData({
      emailIpt: e.detail.value
    })
  },
  chahaoTap:function(){
    this.setData({
      subscriber: false
    })
  },
  yesTapEma:function(){
    let that = this;
    if(that.data.emailIpt == ""){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500
      })
    } else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.data.emailIpt))){
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none',
        duration: 1500
      })
    }else{
    wx.request({
      url: 'https://wx.sciences.ac.cn/insertdy',
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
      data: {
        openId: that.data.userInfo.openId,
        email: that.data.emailIpt,
        slsjk: that.data.options.slsjk,
        id: that.data.datailData.xinxi.id
      },
      success: function (res) {
        //console.log(res.data.status)
        if (res.data.status == 200){
          wx.showToast({
            title: '订阅成功',
            icon: 'none',
            duration: 1500
          })
        }
        that.setData({
          subscriber: false
        })
      }
    })
    }
  },
  move: function () { },
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
      options: options,
    });
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
      
        //that.tapRentin()
    })
    this.ajaxData(options)
  },
  //请求详情页数据
  ajaxData(options){
    let that = this;
     wx.request({
       url: 'https://wx.sciences.ac.cn/detail',
       method: "POST",
       header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
       data: {
         slsjk: options.slsjk,
         sid: options.sid
       },
       success: function (res) {
         console.log(res.data)
         if (res.data.xinxi.fanwei != null){
           let str = res.data.xinxi.fanwei;
           let a = str.split(',');
           that.setData({
             listFW: a
           });
         }
         that.setData({
           datailData: res.data
         });
         wx.hideLoading()
         that.canvasFun(res.data.xinxi)

         if(that.data.login){
           that.collectNot()
         }
         
       }
     })
   
   },
  //请求判断是否收藏
  collectNot:function(){
    let that = this;
    //console.log(that.data.datailData.xinxi)
    wx.request({
      url: 'https://wx.sciences.ac.cn/pdsc',
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
      data: {
        openId: that.data.userInfo.openId,
        slsjk: that.data.options.slsjk,       
        sid: that.data.datailData.xinxi.id,
      },
      success: function (res) {
       // console.log(res)
        if (res.data.dz == 203){
          that.setData({
            colleat: true
          });
        }
      }
    })
  },


  //渲染柱形图
  canvasFun:function(res){
    new Wxcharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['2014', '2015', '2016', '2017', '2018'],
      series: [{
        name: '影响因子趋势图',
        data: [res.ayxyz, res.byxyz, res.cyxyz, res.dyxyz, res.eyxyz],
        color: '#00b65f'
      }],
      yAxis: {
        format: function (val) {
          return val;
        }
      },
      width: 320,
      height: 200,
      dataLabel: true
    });
  },
  //点击空白消失
  inputTap:function(){
  
    this.setData({
      inputShow: false
    })
  },
  //输入值
  mainInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      mainInput: e.detail.value
    })
  },
  //点击发布评论了
  fabule:function(){
    let that = this;
    if (this.data.mainInput == ""){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
      }else{
      wx.request({
        url: 'https://wx.sciences.ac.cn/insertcomment',
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
        data: {
          slsjk: that.data.options.slsjk,
          openId: that.data.userInfo.openId,
          sid: that.data.datailData.xinxi.id,
          message: that.data.mainInput
        },
        success: function (res) {
         // console.log(res.data)
          wx.showToast({
            title: '评论成功待审核',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            inputShow: false
          })
        }
      })
      }
  },
  //点击评论
  commentTap:function(){
    console.log(222)
    if(this.data.login){
      this.setData({
        inputShow: true
      })
    }
   
  },
  //点击回到首页
  homeTap:function(){
    wx.reLaunch({
      url: '../index/index'
    })
  },
  //点击跳转填空页面
  subTap:function(){
    if (this.data.login) {
      wx.navigateTo({
        url: '../submission/submission'
      })
    }
   
  },
  //点击收藏
  colleatTap:function(){
    let that = this;
   // console.log(12321, this.data.login, this.data.datailData)
    if (this.data.login) {     
      wx.request({
        url:'https://wx.sciences.ac.cn/shoucang',
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },   //必填
        data: {
          slsjk: that.data.options.slsjk,
          openId: that.data.userInfo.openId,
          ssciId: that.data.datailData.xinxi.id
        },
        success: function (res) {
          //console.log(res.data)
          if (res.data.status == 200){
            that.setData({
              colleat: true
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }else{
            that.setData({
              colleat: false
            })
            wx.showToast({
              title: "已取消收藏",
              icon: 'none',
              duration: 1500
            })
          }
         
          

        }
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
                that.collectNot()
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