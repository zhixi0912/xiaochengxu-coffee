// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'mine',
    currents:'0',
    count: 0, //购物车商品数量
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo'); //获取本地缓存中的商品数量 
    if (userInfo) {
      this.setData({ userInfo: userInfo })
    }else{
      wx.redirectTo({ url: '../../pages/menu/menu' })
    }
   

    console.log("userInfo--------->", userInfo);
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
  handleChanges({ detail }){
    this.setData({
      currents: detail.key
    });
  },
  toLinkMenu:function(){
    wx.redirectTo({ url: '../../pages/menu/menu' })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == 'browse') {
      wx.redirectTo({ url: '../../pages/find/find' })
    } else if (detail.key == 'publishgoods_fill') {
      wx.redirectTo({ url: '../../pages/trolley/trolley' })
    } else if (detail.key == 'createtask') {
      wx.redirectTo({ url: '../../pages/order/order' })
    } else if (detail.key == 'task') {
      wx.redirectTo({ url: '../../pages/menu/menu' })
    }
  }
})