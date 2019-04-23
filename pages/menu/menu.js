// pages/menu/menu.js

const apps = require('../../app.js')
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userInfo:[],
    menuOne:[], //主分类菜单
    handleCurrent: '', //预设主分类菜单默认值
    containerOfflineState:true,
    containerBox:false,
    menuTwo:[], //二级分类菜单
    menuTwoTemporary: [],
    currentTab: '', //预设二级分类菜单默认值
    menuTwoNavNum:1,
    coffeeImg: ["../../component/images/coffee/11.png", "../../component/images/coffee/22.png", "../../component/images/coffee/33.png", "../../component/images/coffee/44.png", "../../component/images/coffee/55.png", "../../component/images/coffee/66.png", "../../component/images/coffee/77.png"],//咖啡二级菜单
    activeState: '',
    currentTabTid: '',
    currentIndex:0, //弹窗轮播图指定位置
    multipleNum:1, //咖啡加糖类型同屏数量 
    coffeeCurrentIndex:0,
    menuTwoCon:[],//商品展示列表
    menuTwoCon1:[],
    menuTwoCon2: [],
    menuTwoIndex:0,
    coffeeNavIndexs:0,//比率咖啡当前滑块
    coffeeNavIndex: 0, //比率咖啡【清咖/奶咖】默认显示的位置
    multipleNumrppg: 0, //比率咖啡【风味】当前显示的位置
    multipleNumIndex: 0, //比率咖啡【风味】默认显示的位置
    // coffeeClassificationIndex:0,
    coffeeMilkIndex: 0,//比率咖啡【奶】默认值
    coffeeBeanIndex: '0',//比率咖啡【咖啡豆】默认值
    multipleNum: 1, //比率咖啡默认显示数量
    cf_is_hot: '0',//比率咖啡【冷热】最小值
    minValue: 0, //比率咖啡【咖啡浓度】最小值
    coffeeSliderStep:2,
    coffeeValue: 30,//比率咖啡【咖啡浓度】当前值
    maxValue: 100,//比率咖啡【咖啡浓度】最大值
    milkValue: 80,//比率咖啡【牛奶】当前值
    milk2Value: 20,//比率咖啡【奶泡】当前值
    milkMinValue: 80,//比率咖啡【牛奶】最小值
    milkMaxValue: 90,//比率咖啡【牛奶】最大值
    sweetValue: '50',//比率咖啡【甜度】当前值
    waterValue: '10',//比率咖啡【水】当前值
    alcoholValue: '10',//比率咖啡【酒精】当前值
    currentItemId: '',
    grantBoxState: false,//授权窗口状态
    is_hot: '0',
    is_bean: '0',
    is_milk: '0',
    is_sweet: '0',
    currentHot: '热',
    fruit:[
      {
        id: 0,
        name: '热',
      },
      {
        id: 1,
        name: '冷',
      }
    ],
    current: 'task',
    currentIndex:'120',
    count:0, //购物车商品数量
    countData:[],
    // indicatorDots:true,
   
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    flag: true,
    swiperIndex:'',
    circular: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    this.selectComponent("#header").ranksTime();  //调用头部组件当前等待状态
    var userInfo = this.selectComponent("#header").userInfo(); //调用头部组件用户状态
    
    if (userInfo){
      this.setData({ userInfo:userInfo,grantBoxState: true })
    }
    // console.log("userInfo--111------->", userInfo)
    // wx.redirectTo({ url: '../../pages/memberDetails/memberDetails' })
    
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });


    that.menuFetchCategory(); //加载页面时查询主分类菜单
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    var countData = wx.getStorageSync('countData'); //获取本地缓存中的商品集合 
    // console.log("usenc--------->", counts,countData);
    this.setData({
      count: counts,
      countData: countData || []
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
 
  getUserInfoBtn: function(e){
    var userInfo = e.detail.userInfo;
    // console.log("1111---》", e.detail.userInfo);
    if (userInfo){
      // console.log("获得用户信息成功")
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
        success: function (res) {
          console.log("用户信息存入缓存成功", res)

        }, fail: function (res) {
          console.log("用户信息存入缓存失败", res)
        }
      })
      this.setData({
        grantBoxState: true,
        userInfo: userInfo
      });
    }else{
      console.log("获得用户信息失败")
    }
  },
  login:function(){
    var that = this;
    // 查看是否授权
    var openId = (wx.getStorageSync('openId'))
    if (openId) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    }else{
      
      wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            
            wx.getUserInfo({
              success: function(res) {
                console.log("获得授权！", res)
                
              }, fail: function (res){
                console.log("拒绝授权！", res)
              }
          })
          }
        } 
      })
    }
    
  },
  hotChange({ detail = {} }) {
    this.setData({
      currentHot: detail.value
    });
  },
  // 点击标题切换当前页时改变样式
  // swichNavs: function (e) {
  //   var that = this
  //   var id = e.currentTarget.dataset.id;
  //   var tid = e.currentTarget.dataset.tid;
  //   var currentTab = this.data.currentTab;

  //   if (tid == currentTab){
  //     return false;
  //   } else {
  //     this.setData({
  //       currentTab: tid,
  //       currentTabTid: id
  //     })
  //   }
  //   this.shopListFetchCategory() 
  // },
  show: function (e) {
    // console.log("currentIndex----1-----", this.data.currentIndex)
    var that =this;
    var menuTwoCon = that.data.menuTwoCon
    var clickId = e.currentTarget.dataset.id
    var currentIndex;
    menuTwoCon && menuTwoCon.map((item,index)=>{
      if (clickId == item.id){
        currentIndex = index
      }
    })
    this.setData({ 
      flag: false,
      currentIndex: currentIndex,
      // showId: e.currentTarget.dataset.id
    })
  },
  hide: function () {
    this.setData({ 
      flag: true,
      currentIndex:0
     })
  },
  swichNav: function (e){  //二级菜单点击选择
    var that = this;
    var id = e.currentTarget.dataset.id;
    var tid = e.currentTarget.dataset.tid;
    var clickId = e.currentTarget.dataset.id;
    var swpIndex = e.currentTarget.dataset.index;
    
    // console.log("id+tid+clickId", id, tid, clickId);
    console.log("swpIndex",swpIndex);
    this.setData({
      currentTab: tid,
      currentTabTid: id,
      menuTwoIndex: swpIndex
    })
    this.shopListFetchCategory() 
  },
  swichNavScroll({ detail }) {//二级菜单滑动选择
    var that = this;
    var clickId = detail.current;
    var menuTwo = that.data.menuTwo;
    // console.log("clickId----------->", clickId);
    // console.log("menuTwo----------->", menuTwo);
    var scrollId = menuTwo[clickId].id;
    var scrollTid = menuTwo[clickId].tid;
    // menuTwo[clickId]
    // console.log("menuTwo[clickId]----------->", scrollId, scrollTid);
    // console.log("swpIndex", swpIndex);
    this.setData({
      currentTab: scrollTid,
      currentTabTid: scrollId,
      // swpIndex:0
    })
    // console.log("menuTwoIndex----------->", that.data.menuTwoIndex);
    this.shopListFetchCategory() 
  },
  swichNavScroll2:function(e){
    // console.log("swichNavScroll2----------->", e);
  },
  swichNavScroll3: function (e) {
    // console.log("swichNavScroll3----------->", );
  },
  handleChangeScroll({ detail }){  //主菜单切换查询
    var that = this;
    var clickId = detail.key;
    
    
    that.setData({
      handleCurrent: clickId
    });
    that.menuTwoList(clickId)
    // this.shopListFetchCategory(clickId)  //查询出主菜单后查询二级分类菜单
    // console.log("menuTwoTemporary-------", menuTwoTemporary);
    
  },
  
  menuTwoList: function (clickId){
    var that = this;
    var menuTwo = []
    var currentTab = '', currentTabTid='';
    // console.log("clickId----------", clickId)
    var menuTwoTemporary = that.data.menuTwoTemporary;
    // console.log("menuTwoTemporary----------", menuTwoTemporary)
    menuTwoTemporary && menuTwoTemporary.map(item => {
      if (clickId == item.fid) {
        item.tid = item.id+'x'
        menuTwo.push(item)
        // console.log("1111111111", item)
        currentTab = menuTwo[0].tid;
        currentTabTid = menuTwo[0].id;
      } else if (clickId == '27') { //蛋糕
        // console.log("1111111111")
        var arry = [
          { category_name: "普通蛋糕", describe: "普通蛋糕", en_name: "iCake", fid: "0", id: "27", is_del: "0", original_picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-06-29/5954c1aea8ece.png", picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-06-29/5954c1aea8ece.png", tid: '27x' },
          { category_name: "艺术蛋糕", describe: "艺术蛋糕", en_name: "iCake", fid: "0", id: "27", is_del: "0", original_picurl: "https://coffee.ioart.cn./Public/admin/upload/2018-04-17/5ad59a4e91b1f.png", picurl: "https://coffee.ioart.cn./Public/admin/upload/2018-04-17/5ad59a4e91b1f.png", tid: '27c' }
        ]

        menuTwo = arry
        currentTab = menuTwo[0].tid;
        currentTabTid = menuTwo[0].id;
        
        return;
      } else if (clickId == '26') { //咖啡
        // console.log("22222222222")
        var arry = [
          { category_name: "普通咖啡", describe: "普通咖啡", en_name: "iCoffee", fid: "0", id: "26", is_del: "0", original_picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-07-03/595a27a0cdc59.png", picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-07-03/595a27a0cdc59.png", tid: '26v' },
          { category_name: "艺术咖啡", describe: "艺术咖啡", en_name: "iCoffee", fid: "0", id: "26", is_del: "0", original_picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-07-03/595a27a0cdc59.png", picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-07-03/595a27a0cdc59.png", tid: '26b' },
          { category_name: "比率咖啡", describe: "比率咖啡", en_name: "iCoffee", fid: "0", id: "26", is_del: "0", original_picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-07-03/595a27a0cdc59.png", picurl: "https://coffee.ioart.cn./Public/admin/upload/2017-07-03/595a27a0cdc59.png", tid: '26n' }
        ]
        menuTwo = arry
        currentTab = menuTwo[0].tid;
        currentTabTid = menuTwo[0].id;
        
        menuTwo && menuTwo.map((item,index)=>{
          var coffeeImg = that.data.coffeeImg
          item.picurl = coffeeImg[index] ? coffeeImg[index] : item.image
        })
        
        return;
      }
      // (item.fid || item.fid == clickId) ? menuTwo.push(item):[]; currentTab

    });
    // console.log("menuTwo--二级菜单------", menuTwo)
    // console.log("currentTab--二级菜单------", currentTab)
    that.setData({
      menuTwo: menuTwo,
      currentTab: currentTab,
      currentTabTid: currentTabTid
    });
    console.log("menuTwo---", menuTwo);
    var two=2 //因没有二级菜单接口，所有菜单数据都在一个接口，为了区别是在一级还是在二级时候查询，需要在点击一级时重置默认二级选中，否则不重置
    
    this.shopListFetchCategory(two)  //查询出主菜单后查询二级分类菜单
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key,
      // menuTwo: menuTwo
    });
    if (detail.key =='browse'){
      wx.redirectTo({ url: '../../pages/find/find'})
    } else if (detail.key == 'publishgoods_fill') {
      wx.redirectTo({ url: '../../pages/trolley/trolley' })
    } else if (detail.key == 'createtask') {
      wx.redirectTo({ url: '../../pages/order/order' })
    } else if (detail.key == 'mine') {
      wx.redirectTo({ url: '../../pages/user/user' })
    }
  },
  swiperChange(e) {

    const that = this;
    // console.log('111---', e.detail.current);

    that.setData({
      swiperIndex: e.detail.current,
    })

  },
  menuFetchCategory:function(){
    var that = this;
    var data = {}
    var url = getApp().globalData.url; //接口路径
    var orderby = "no";
    var is_del = "0";
        data.orderby = orderby;
        data.is_del = is_del;
    wx.request({ //请求主分类菜单列表
      method: "get",
      url: url + '/Api/lists/module/productCategory/key/dac509bd90a82719a3569291e12c24a6f1af4bac',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      dataType: "json",
      success: function (res) {

        // console.log("请求主分类菜单列表1", res.data.result)
        var dataSource = [], data = [], handleCurrent=''
               
        res.data.result && res.data.result.map(item => {
          if ((item.status == 0 || item.state == 0) && item.is_del == 0) {
            data.push(item);
            (!item.fid || item.fid == 0) && dataSource.push(item);
          }
        });
        // console.log("请求主分类菜单列表2",  dataSource)
        handleCurrent = dataSource[1].id, 
        that.setData({
          menuOne: dataSource, //主分类菜单赋值
          handleCurrent: handleCurrent,  //默认选中菜单赋值
          menuTwoTemporary: data,
          
        });

        // console.log("data---", data);
        var clickId = handleCurrent;
        var category_id = that.data.handleCurrent;
        that.menuTwoList(clickId);





        // console.log("menuOne---", that.data.menuOne);
        // console.log("menuTwo--2-", that.data.menuTwo);
        // that.shopListFetchCategory()  //查询出主菜单后查询二级分类菜单

      }, fail: function (res) {
        // console.log("请求主分类菜单列表3", res)
      }
    })
  },
  shopListFetchCategory: function (two) {
    
    var that = this;
    var data = {}
    var two = two
    var url = getApp().globalData.url; //接口路径
    // console.log("data-------/---", that.data.currentTab);
    // var tid = e.currentTarget.dataset.tid;
    var category_id = that.data.currentTabTid;
    var currentTab = that.data.currentTab;
    if (currentTab == '27x' || currentTab == '27c'){
      data.category_id = category_id
    } else if (currentTab == '26v' || currentTab == '26b' || currentTab == '26n'){
      data.category_id = category_id
    }else{
      data.category_id = category_id;
    }
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
    


        
        if (currentTab == '27x' ) {  //普通蛋糕
          dataSource && dataSource.map((item, index) => {
            if (item.id != '119'){
              // var coffeeImg = that.data.coffeeImg
              // console.log("普通咖啡----", coffeeImg[index]);
              item.is_hot = ''; //温度
              item.is_bean = ''; //咖啡豆
              item.is_milk = ''; //奶
              item.is_sweet = ''; //甜度
              data.push(item)
            }
          })
        } else if (currentTab == '27c' ) {  //艺术蛋糕
          dataSource && dataSource.map(item => {
            if (item.id == '119') {  //coffeeImg
              item.is_hot = ''; //温度
              item.is_bean = ''; //咖啡豆
              item.is_milk = ''; //奶
              item.is_sweet = ''; //甜度
              item.image =  "https://" + item.image
              data.push(item)
            }
          })


          
        } else if (currentTab == '26v') {  //普通咖啡
          dataSource && dataSource.map((item,index) => {
            if (item.id != '125') {
              // item.image = that.data.coffeeImg[index].nav_image
              item.is_hot = '0'; //温度
              item.is_bean = '0'; //咖啡豆
              item.is_milk = '0'; //奶
              item.is_sweet = '0'; //甜度
              var coffeeImg = that.data.coffeeImg
              
              item.image = coffeeImg[index] ? coffeeImg[index] : "https://"+item.image
              // console.log("普通咖啡----", item.image);
              data.push(item)
            }
          })


          
        } else if (currentTab == '26b') {  //艺术咖啡
          dataSource && dataSource.map(item => {
            if (item.id == '125') {
              item.is_hot = '0'; //温度
              item.is_bean = '0'; //咖啡豆
              item.is_milk = '0'; //奶
              item.is_sweet = '0'; //甜度
              item.image = "https://" + item.image
              data.push(item)
            }
          })

          
        } else if (currentTab == '26n') { //比率咖啡
          dataSource && dataSource.map(item => {
            if (item.id != '125') {
              // item.image = "https://" + item.image
              // data.push(item)
            }
          })


        }else {
          dataSource && dataSource.map(item => {
            item.is_hot = ''; //温度
            item.is_bean = ''; //咖啡豆
            item.is_milk = ''; //奶
            item.is_sweet = ''; //甜度
            // item.image = "https://" + item.image
            data.push(item)
          })
          
        }


        // console.log("data-----------》", data)

        if(two){
          console.log("2-->",two)
          that.setData({
            // current="{{menuTwoIndex}}"
            // currentTab: menuTwo[0].id, //默认二级分类选中菜单赋值
            menuTwoCon: data,//默认二级分类内容
            swpIndex:0,
            menuTwoIndex:0
          });
        }else{
          console.log("1-->", two)
          that.setData({
            menuTwoCon: data,//默认二级分类内容
          });
        }
        

      }, fail: function (res) {
        // console.log("请求主分类菜单列表3", res)
      }
    })
  },
  addShopping:function(e){
    
    var that = this;
    var addId = e.currentTarget.dataset.id;
    var count = that.data.count;
        count++
    
    var countData = that.data.countData;
    var shoppingList = that.data.menuTwoCon;
    var currentTab = that.data.currentTab;


    var menuTwo = that.data.menuTwo
    // console.log("addShopping---", addId, shoppingList, currentTab)
    console.log("menuTwo---", menuTwo)
    if (shoppingList.length==0){
      console.log("1--->", currentTab)
      menuTwo && menuTwo.map(item => {
        if (item.tid == addId) {
          countData.push(item)
        }

      });

    }else{
      console.log("2--->", currentTab)
      shoppingList && shoppingList.map(item => {
        if (item.id == addId) {
          countData.push(item)
        }

      });
    }
    

    this.setData({
      // flag: true,
      count: count,
      countData: countData
    })
    wx.setStorage({
      key: 'count',
      data: count,
      success: function (res) {
        // console.log("商品数量存入缓存成功", res)

      }, fail: function (res) {
        console.log("商品数量存入缓存失败", res)
      }
    })
    wx.setStorage({
      key: 'countData',
      data: countData,
      success: function (res) {
        // console.log("商品集合存入缓存成功", res)

      }, fail: function (res) {
        console.log("商品集合存入缓存失败", res)
      }
    })
    var counts = wx.getStorageSync('count'); //获取本地缓存中的商品数量 
    // console.log("usenc--------->", counts, countData);
  },
  hotClick:function(e){
    // console.log("ppppp",e)
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var is_hot = that.data.is_hot;
    if (clickId == '1' && is_hot=='0'){
      that.setData({ is_hot: clickId})
    } else if (clickId == '0' && is_hot == '1'){
      that.setData({ is_hot: clickId })
    }
  },
  beanClick: function (e) {
    // console.log("ppppp",e)
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var is_bean = that.data.is_bean;
    if (clickId == '1' && is_bean == '0') {
      that.setData({ is_bean: clickId })
    } else if (clickId == '0' && is_bean == '1') {
      that.setData({ is_bean: clickId })
    }
  },
  milkClick: function (e) {
    // console.log("ppppp",e)
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var is_milk = that.data.is_milk;
    if (clickId == '1' && is_milk == '0') {
      that.setData({ is_milk: clickId })
    } else if (clickId == '0' && is_milk == '1') {
      that.setData({ is_milk: clickId })
    }
  },
  sweetClick: function (e) {
    // console.log("ppppp",e)
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var is_sweet = that.data.is_sweet;
    if (clickId == '2' && is_sweet!='2') {
      that.setData({ is_sweet: clickId })
     } else
      if (clickId == '1' && is_sweet != '1') {
        that.setData({ is_sweet: clickId })
      } else if (clickId == '0' && is_sweet != '0') {
        that.setData({ is_sweet: clickId })
    }
  },
  coffeeNav: function (e) { //比率咖啡【清咖/奶咖】滑动事件
    var that = this
    console.log("1111", e.detail.current);
    var multipleNumrppg = e.detail.current;
    that.setData({
      coffeeNavIndex: multipleNumrppg
    });
  },
  coffeeNavItem: function (e) { //比率咖啡【清咖/奶咖】点击事件
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var swpIndex = e.currentTarget.dataset.index
    // console.log("id+tid+clickId",  swpIndex);

    this.setData({
      coffeeNavIndex: clickId,
      coffeeNavIndexs:swpIndex
    })
  },


  coffeeClassificationChangeScroll: function (e) { //比率咖啡【风味】滑动事件
    var that = this
    // console.log("1111", e.detail.current);
    var multipleNumrppg = e.detail.current;
    that.setData({

      // currentTab: menuTwo[0].id, //默认二级分类选中菜单赋值
      // menuTwoCon: data,//默认二级分类内容
      multipleNumIndex: multipleNumrppg
    });
  },
  coffeeClassificationChange: function (e) { //比率咖啡【风味】点击事件
    var that = this;
    var clickId  = e.currentTarget.dataset.id;
    var swpIndex = e.currentTarget.dataset.index
    this.setData({
      multipleNumIndex: clickId,
      multipleNumIndex: swpIndex
    })
  },
  coffeeMilk: function (e) { //比率咖啡【奶】滑动事件
    var that = this
    
    var multipleNumrppg = e.detail.current;
    

    that.setData({
      coffeeMilkIndex: multipleNumrppg,
    });
  },
  coffeeMilkItem: function (e) { //比率咖啡【奶】点击事件
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var swpIndex = e.currentTarget.dataset.index
    this.setData({
      coffeeMilkIndex: clickId,
      coffeeMilkIndex: swpIndex
    })
  },
  coffeeBean: function (e) { //比率咖啡【咖啡豆】滑动事件
    var that = this
    // console.log("1111", e.detail.current);
    var multipleNumrppg = e.detail.current;
    that.setData({
      coffeeBeanIndex: multipleNumrppg
    });
  },
  coffeeBeanItem: function (e) { //比率咖啡【咖啡豆】点击事件
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var swpIndex = e.currentTarget.dataset.index
    this.setData({
      coffeeBeanIndex: clickId,
      coffeeBeanIndex: swpIndex
    })
  },
  cfHotClick: function (e) {
    // console.log("ppppp",e)
    var that = this;
    var clickId = e.currentTarget.dataset.id;
    var cf_is_hot = that.data.cf_is_hot;
    if (clickId == '1' && cf_is_hot == '0') {
      that.setData({ cf_is_hot: clickId })
    } else if (clickId == '0' && cf_is_hot == '1') {
      that.setData({ cf_is_hot: clickId })
    }
  },
  coffeeSliderchange: function (e){ //比率咖啡【咖啡浓度】滑动事件
    var that = this;
    var coffeeValue = e.detail.value
    console.log("coffeeSliderchange----->", coffeeValue)
    that.setData({ coffeeValue: coffeeValue })
  },
  coffeeSliderchangeEnd: function (e) { //比率咖啡【咖啡浓度】滑动完成后事件
    var that = this;
    var coffeeValue = e.detail.value
    console.log("coffeeSliderchangeEnd----->", coffeeValue)
  },
  milkSliderchange: function (e) {  //比率咖啡【牛奶/奶泡】滑动事件
    var that = this; 
    var milkValue = e.detail.value
    var num = 80;
    console.log("milkSliderchange----->", milkValue)
    var milk2Value = 20
    milk2Value = milk2Value - (milkValue - 80) 
    
    that.setData({ milkValue: milkValue, milk2Value: milk2Value })
  },
  sweetSliderchange: function (e) { //比率咖啡【甜度】滑动事件
    var that = this;
    var sweetValue = e.detail.value
    // console.log("eee----->", sweetValue)
    that.setData({ sweetValue: sweetValue })
  },
  waterSliderchange: function (e) { //比率咖啡【水】滑动事件
    var that = this;
    var waterValue = e.detail.value
    // console.log("eee----->", waterValue)
    that.setData({ waterValue: waterValue })
  },
})