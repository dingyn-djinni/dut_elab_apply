Page({
  data: {
    multiIndex: [0, 0, 0],
    date: '',
    time: '',
    capacity:'',
    num:0,
    name1:'',
    name2:'',
    name3:'',
    name4:'',
    name5:'',
    name6:'',
    name7:''
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    this.data.capacity = e.detail.value;

  },
  bindTextAreaBlur2: function (e) {
    this.data.num = e.detail.value;

  },
  bindTextAreaBlur3: function (e) {
    this.data.name1 = e.detail.value;

  },
  bindTextAreaBlur4: function (e) {
    this.data.name2 = e.detail.value;

  },
  bindTextAreaBlur5: function (e) {
    this.data.name3 = e.detail.value;

  },
  bindTextAreaBlur6: function (e) {
    this.data.name4 = e.detail.value;

  },
  bindTextAreaBlur7: function (e) {
    this.data.name5 = e.detail.value;

  },
  bindTextAreaBlur8: function (e) {
    this.data.name6 = e.detail.value;

  },
  bindTextAreaBlur9: function (e) {
    this.data.name7 = e.detail.value;

  },
  add: function () {


    var that = this;
     //console.log(that.data.num);
      wx.request({
        url: 'https://class.dlut-elab.com/feedback/sunjianing/AddTime.php',
        data: {
          date:that.data.date,
          time:that.data.time,
          capacity:that.data.capacity,
          num:that.data.num,
          name1: that.data.name1,
          name2: that.data.name2,
          name3: that.data.name3,
          name4: that.data.name4,
          name5: that.data.name5,
          name6: that.data.name6,
          name7: that.data.name7
        },
        method: 'POST',
        header:
        {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data);
          if(res.data!=-1)
          {
            wx.showModal({
              content: '提交成功',
              showCancel:false
            })
          }
          else
          {
            wx.showModal({
              content: '数据有误！！'
            })
          }
        }
      })
      
  },
  check:function()
  {
      wx.redirectTo({
        url: '../admin/timetable',
      })
  }
})