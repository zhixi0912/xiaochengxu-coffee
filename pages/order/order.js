// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'createtask',
    topCurrent: 'tab1',
    targetTime: 0,
    clearTimer: false,
    count: 0, //购物车商品数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      targetTime: new Date().getTime() + 6430000,
    });
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    this.setData({
      count: counts
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
    this.setData({
      clearTimer: true
    });
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
  toLinkTrolley:function(){
    wx.redirectTo({ url: '../../pages/trolley/trolley' })
  },
  handleChange({ detail }) {
    console.log("111")
    this.setData({
      current: detail.key
    });
    if (detail.key == 'browse') {
      wx.redirectTo({ url: '../../pages/find/find' })
    } else if (detail.key == 'publishgoods_fill') {
      wx.redirectTo({ url: '../../pages/trolley/trolley' })
    } else if (detail.key == 'task') {
      wx.redirectTo({ url: '../../pages/menu/menu' })
    } else if (detail.key == 'mine') {
      wx.redirectTo({ url: '../../pages/user/user' })
    }
  },
  topChange({ detail }) {
    console.log("6666", detail.key)
    this.setData({
      topCurrent: detail.key
    });
  },
})