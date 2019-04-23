// pages/memberDetails/memberDetails.js
const apps = require('../../app.js')
var app = getApp();
// const swiper = require('./../../utils/swiper/swiper.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTwoCon:[],
    multipleNumrppg:0, //当前显示的位置
    multipleNumIndex:0, //默认显示的位置
    multipleNum:1, //默认显示数量
    currentItemId:'',
    multipleNums:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {}
    var url = getApp().globalData.url; //接口路径
    // console.log("data-------/---", that.data.currentTab);
    // var tid = e.currentTarget.dataset.tid;
    var category_id = that.data.currentTabTid;
    var currentTab = that.data.currentTab;
    data.category_id ="29"

    wx.request({ //请求二级分类菜单列表
      method: "get",
      url: url + '/Api/lists/module/product/key/dac509bd90a82719a3569291e12c24a6f1af4bac',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      dataType: "json",
      success: function (res) {



        var dataSource = [], data = [];

        res.data.result && res.data.result.map(item => {
          dataSource.push(item)
        })




       
          data = dataSource
        




        var multipleNumrppg = that.data.multipleNumrppg;
        that.setData({

          // currentTab: menuTwo[0].id, //默认二级分类选中菜单赋值
          menuTwoCon: data,//默认二级分类内容
          multipleNumIndex: multipleNumrppg
        });
        console.log("menuTwoCon--------->", that.data.menuTwoCon);
      }, fail: function (res) {
        // console.log("请求主分类菜单列表3", res)
      }
    })
    // const img = "";
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

  },
  coffeeClassificationChangeScroll:function(e){
    var that = this
    console.log("1111", e.detail.current);
    var multipleNumrppg = e.detail.current;
    that.setData({
      multipleNumIndex: multipleNumrppg
    });
  },
   coffeeClassificationChange:function(e){
    var that = this;
    var clickId = e.currentTarget.dataset.index;
    this.setData({
      multipleNumIndex: clickId
    })
  },
    eventHandles: function(e){
      console.log("1111----", e.detail );
  }
})