//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sunLi: ["SCI", "SSCI"],
    listTitle: ["中文标题", "期刊名称", "ISSN"],
    liIndex:0,
    liTitle: 0,
    searchEnd:"",//输入框的值
    placeholder:"请输入您要查找的中文标题",
    showNo:false,
  },

  onLoad: function () {
   
  },
  //点击选中综合
  selectionTap:function(e){
    if (e.currentTarget.dataset.index != this.data.liIndex){
      this.setData({
            liIndex: e.currentTarget.dataset.index
          })
      }
  },
  //显示选择
  showTap:function(){
    if (this.data.showNo){
      this.setData({
        showNo: false
      })
    }else{
      this.setData({
        showNo: true
      })
    }

  },
  //点击选择标题
  selecTap: function (e) {
    if (e.currentTarget.dataset.index != this.data.liTitle) {
      this.setData({
        liTitle: e.currentTarget.dataset.index,
        placeholder: "请输入您要查找的" + this.data.listTitle[e.currentTarget.dataset.index],
        showNo: false
      })
    }else{
      this.setData({
        showNo: false
      })
    }
  },
  //输入值
  searchEnd:function(e){
   // console.log(e.detail.value)
    this.setData({ 
      searchEnd: e.detail.value
    })
  },
  //点击搜索
  serechTap:function(){
    console.log()
    if (this.data.searchEnd != ""){
      wx.navigateTo({
        url: '../periodicalList/periodicalList?searchEnd=' + this.data.searchEnd + "&liIndex=" + this.data.sunLi[this.data.liIndex] + "&liTitle=" + this.data.listTitle[this.data.liTitle]
      })
    }else{
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
})
