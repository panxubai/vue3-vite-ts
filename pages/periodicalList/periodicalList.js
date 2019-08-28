// pages/periodicalList/periodicalList.js
var animation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page:1,
    shows:false,
    options: {},
    sumData:[],
    zusj:false,
    xialaQuestHow:true,//下拉不同的接口
    animationScreenMenu: {},
    biaoArr:['SCI','SSCI'], 
    yinziArr: ['全部', '<1', '1-3', '3-5', '5-10', '>10'], 
    quArr: ['全部', '1区', '2区', '3区', '4区'],
    xuekeArrTitle: ['全部', 'Agricultural Sciences', 'Chemistry', 'Biology & Biochemistry', 'Pharmacology & Toxicology', 'Clinical Medicine', 'Computer Science', 'Physics', 'Economics & Business', 'Environment/ecology'],
    xuekeArrSum: ['全部', 'Agricultural Sciences', 'Chemistry', 'Biology & Biochemistry', 'Pharmacology & Toxicology', 'Clinical Medicine', 'Computer Science', 'Physics', 'Economics & Business', 'Environment/ecology', 'Geosciences', 'Immunology', 'Materials Science', 'Mathematics', 'Molecular Biology & Genetics', 'Microbiology', 'Space Science', 'Multidisciplinary', 'Plant & Animal Science', 'Social Sciences, General', 'Psychiatry/psychology', 'Neuroscience & Behavior', 'Engineering'],
    biaoIndex:0,
    yinziIndex:0,
    quIndex: 0,
    xuekeTitleIndex: 0,
    screenMenuIsShow:false,//是否显示筛选
    moveXuekeShow:true,//显示更多学科
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    this.ajaxxq()

    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    this.animation = animation;
  },
  //筛选动画
  startScreenAnimation: function (isShow) {
    //console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.right(0).step()
    } else {
      that.animation.right(-800 + 'rpx').step()
    }
    that.setData({
      animationScreenMenu: that.animation.export(),
      screenMenuIsShow: isShow,
    })
    console.log(that.data.animationScreenMenu)
  },

//列表数据 
  ajaxxq: function (){
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    let that = this;
    wx.request({
      url: 'https://wx.sciences.ac.cn/seach',
      data: {
        'page': this.data.page,
        'slsjk': this.data.options.liIndex,
        'ciduan': this.data.options.liTitle,
        'message': this.data.options.searchEnd,
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
         // console.log(res)

        if (that.data.page == 1){
          if (res.data.zb.length == 0) {
            that.setData({
              zusj: true
            })
          } else {   
              that.setData({
                sumData: res.data.zb
              })
          }
          }else{
          if (res.data.zb.length == 0) {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 2000
            })
          } else {
          let arr = that.data.sumData
          for (let i = 0; i < res.data.zb.length;i++){
            arr.push(res.data.zb[i])
          }
              that.setData({
                sumData: arr
              })
          }
          }
       
         wx.hideLoading()
      }
      
    })
    
  },
  //点击进去详情
  detailsTap:function(e){
    wx.navigateTo({
      url: '../details/details?sid=' + e.currentTarget.dataset.id + "&slsjk=" + this.data.options.liIndex
    })
  },
  //点击筛选
  shaixuanTap:function(){
    this.startScreenAnimation(true)
  },
  //点击遮罩层
  maskTapScreen: function () {
    this.startScreenAnimation(false)
    this.setData({
      moveXuekeShow:true,
      xuekeTitleIndex:0
    })
  },
  moveXuekeTap:function(){
        this.setData({
          moveXuekeShow:false
        })
  },
  //选择表
  biaotap:function(e){
    this.setData({
      biaoIndex: e.currentTarget.dataset.index
    })
  },
  //选择区
  qutap: function (e) {
    this.setData({
      quIndex: e.currentTarget.dataset.index
    })
  },
  //选择因子
  yinzitap: function (e) {
    this.setData({
      yinziIndex: e.currentTarget.dataset.index
    })
  },
  //选择学科
  xueketap: function (e) {
    this.setData({
      xuekeTitleIndex: e.currentTarget.dataset.index
    })
  },
  //点击重置
  chongzhiTap:function(){
    this.setData({
      yinziIndex: 0,
      quIndex: 0,
      xuekeTitleIndex: 0,
      moveXuekeShow:true
    })
  },
  //点击确定
  quedingTap:function(){
    this.startScreenAnimation(false)
    this.setData({
      page:1,
      xialaQuestHow:false,
      zusj: false,
      sumData: []
    })
    this.shaixunAjax()
  },
  //筛选的数据
  shaixunAjax:function(){
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true,
    })
    let that = this;
    wx.request({
      url: 'https://wx.sciences.ac.cn/shaixuan',
      data: {
        page:this.data.page,
        sksjk: this.data.biaoArr[this.data.biaoIndex],
        eyxyz: this.data.biaoIndex != 1?String.fromCharCode(0x60 + this.data.yinziIndex + 1):'unll',
        zkyfqdl: String.fromCharCode(0x60 + this.data.quIndex + 1),
        yjxk: String.fromCharCode(0x60 + this.data.xuekeTitleIndex + 1),
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)

        if (that.data.page == 1) {
          if (res.data.zb.length == 0) {
            that.setData({
              zusj: true
            })
          } else {
            that.setData({
              sumData: res.data.zb
            })
          }
        } else {
          if (res.data.zb.length == 0) {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 2000
            })
          } else {
            let arr = that.data.sumData
            for (let i = 0; i < res.data.zb.length; i++) {
              arr.push(res.data.zb[i])
            }
            that.setData({
              sumData: arr
            })
          }
        }

        wx.hideLoading()
      }

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
    let page = this.data.page+1
    this.setData({
      page: page
    })
    if (this.data.xialaQuestHow){
      this.ajaxxq()
    }else{
      this.shaixunAjax()
    }
    
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})