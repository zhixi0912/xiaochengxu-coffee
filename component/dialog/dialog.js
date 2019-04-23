// component/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      '../../component/images/timg.jpg',
      '../../component/images/timg.jpg',
      '../../component/images/timg.jpg',
      '../../component/images/timg.jpg',
      '../../component/images/timg.jpg',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 800,
    flag: true,
  },
  show: function () {
    this.setData({ flag: false })
  },
  hide: function () {
    this.setData({ flag: true })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
