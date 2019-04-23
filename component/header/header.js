// component/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // userInfoName: {
    //   type: String
    // },
    // userInfoImg: {
    //   type: String
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:[],
    ranks: 0,
    ranksTime: 10
  },

  /**
   * 组件的方法列表
   */
  methods: {
    userInfo:function(){
      var that = this;
      var userInfo = wx.getStorageSync('userInfo'); //获取本地缓存中的商品数量 
      // var myUserInfo = {
      //   val: userInfo
      // }
      // this.triggerEvent('userInfo', myUserInfo);
      
      if (userInfo) {
        this.setData({ userInfo: userInfo, })
      } 
      // else {
      //   wx.redirectTo({ url: '../../pages/menu/menu' })
      // }
      return userInfo;
      // console.log("userInfo-----///---->", userInfo);
    },
    ranksTime: function () {
      var that = this;
      var ranks = that.data.ranks;
      ranks = parseInt(10 * Math.random())
      // console.log("11111-----", ranks)
      var ranksTime = that.data.ranksTime;
      ranksTime = ranksTime * ranks;
      
      that.setData({
        ranks: ranks,
        ranksTime: ranksTime
      })
    }
  },
  
})
