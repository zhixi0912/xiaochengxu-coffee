// component/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'current': {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 'task'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function () {
    console.log("666-------",this.properties);
  },
  handleChange({ detail }) {
    console.log("detail----", detail.key);
    this.setData({
      current: detail.key
    });
  }
})
