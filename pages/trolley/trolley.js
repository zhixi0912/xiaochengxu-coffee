// pages/trolley/trolley.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'publishgoods_fill',
    count: 0, //购物车商品数量
    countData:[],
    userInfo: [],
    ranks:0,
    ranksTime:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var userInfo = wx.getStorageSync('userInfo'); //获取本地缓存中的用户信息 
    // if (userInfo) {
    //   this.setData({ userInfo: userInfo })
    // } else {
    //   wx.redirectTo({ url: '../../pages/menu/menu' })
    // }
    var that = this;
    this.selectComponent("#header").ranksTime();  //调用头部组件当前等待状态
    var userInfo = this.selectComponent("#header").userInfo(); //调用头部组件用户状态

    if (userInfo) {
      this.setData({ userInfo: userInfo })
    }
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    var countData = wx.getStorageSync('countData'); //获取本地缓存中的商品集合 
    console.log("usenc--------->", countData);
    this.setData({
      count: counts,
      countData: countData
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
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == 'browse') {
      wx.redirectTo({ url: '../../pages/find/find' })
    } else if (detail.key == 'task') {
      wx.redirectTo({ url: '../../pages/menu/menu' })
    } else if (detail.key == 'createtask') {
      wx.redirectTo({ url: '../../pages/order/order' })
    } else if (detail.key == 'mine') {
      wx.redirectTo({ url: '../../pages/user/user' })
    }
  },
  delShopping:function(e){
    console.log("11---", e.currentTarget.dataset.id)
    var that = this;
    var addId = e.currentTarget.dataset.id;
    var count = that.data.count;
    if (count == 0){
      return false
    }else{
      count--
    }
    var countData = that.data.countData;
    console.log("countData----", countData);
    countData && countData.map((item, index) => {
      if (item.id == addId) {
        console.log("key----", index);
        // break;
        countData.splice(index, 1);
        return;
        // countData.push(item)
      }

    });
    console.log("countData----", countData);
    this.setData({
      // flag: true,
      count: count,
      countData: countData
    })
    wx.setStorage({
      key: 'count',
      data: count,
      success: function (res) {
        console.log("商品数量存入缓存成功", res)

      }, fail: function (res) {
        console.log("商品数量存入缓存失败", res)
      }
    })
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    console.log("usenc--------->", counts);
    wx.setStorage({
      key: 'countData',
      data: countData,
      success: function (res) {
        console.log("商品集合存入缓存成功", res)

      }, fail: function (res) {
        console.log("商品集合存入缓存失败", res)
      }
    })
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    console.log("usenc--------->", counts, countData);
  },
  handleClick:function(){
    var that = this;
    var countData = that.data.countData;
    
    console.log("确认下单：", countData);
  },
  handleClickTo:function(){
    wx.redirectTo({
      url: '../../pages/menu/menu',
    })
  },
  ranksTime:function(){
    var that = this;
    var ranks = that.data.ranks;
    var ranksTime = that.data.ranksTime;
    ranksTime = ranksTime * ranks;
    that.setData({
      ranksTime: ranksTime
    })
  }
})