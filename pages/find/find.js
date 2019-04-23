// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'browse',
    count: 0, //购物车商品数量
    autoplay:true,
    // userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    this.setData({
      count: counts
    })
    // var that = this;
    // var userInfo = wx.getStorageSync('userInfo'); //获取本地缓存中的商品数量 
    // if (userInfo) {
    //   this.setData({ userInfo: userInfo, })
    // } else {
    //   wx.redirectTo({ url: '../../pages/menu/menu' })
    // }
    // console.log("userInfo--------->", userInfo);
    var that = this;
    this.selectComponent("#header").ranksTime();  //调用头部组件当前等待状态
    var userInfo = this.selectComponent("#header").userInfo(); //调用头部组件用户状态

    if (userInfo) {
      this.setData({ userInfo: userInfo })
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

  },
  handleChange({ detail }) {
    console.log("111")
    this.setData({
      current: detail.key
    });
    if (detail.key == 'task') {
      wx.navigateTo({ url: '../../pages/menu/menu' })
    } else if (detail.key == 'publishgoods_fill') {
      wx.navigateTo({ url: '../../pages/find/find' })
    } else if (detail.key == 'createtask') {
      wx.navigateTo({ url: '../../pages/order/order' })
    } else if (detail.key == 'mine') {
      wx.navigateTo({ url: '../../pages/find/find' })
    }
  }
})

