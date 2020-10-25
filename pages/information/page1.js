// pages/information/page1.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:20,
    name:'',
    classes:'',
    group:['电子组','软件组'],
    prize:'',
    rs:'',
    id:'',
    openid:'',
    picker_index:0,
    phonenum:'',
    flag:0,
    zhiwu:'',
    hobby:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.data.openid=app.globalData.openid;
    var that=this;
    //console.log(this.data.openid+"aklgjwehgioahweioghaiowehgiheg");
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/user.php',
      data: {
        openid: this.data.openid
      },
      method: 'POST',
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);
      if(res.data[0].name!=null){
       that.setData({
         flag: 1,
         name:res.data[0].name,
         id:res.data[0].license,
         classes:res.data[0].class,
         phonenum:res.data[0].phonenum,
         prize:res.data[0].text1,
         rs:res.data[0].text2,
         zhiwu:res.data[0].zhiwu,
         hobby:res.data[0].hobby
       })
       
       if(res.data[0].groups=="软件组")
       {
         that.setData({
           picker_index:1
         })
         console.log(132454);
       }
      }
      else
      {
        console.log(321);
      }
      }
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
//
  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.name != "" && e.detail.value.id != "" && e.detail.value.phonenum != "" && e.detail.value.classes !=""&& e.detail.value.prize!=""&&e.detail.value.rs!=""&&e.detail.value.hobby!=""&&e.detail.value.zhiwu!="") {
      console.log(that.data.openid);
      
      wx.request({
        url: 'https://class.dlut-elab.com/feedback/dingyuning/UserInput.php',
        method: 'POST',
        header:
        {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {

        },
        data: {
          name: e.detail.value.name,
          classes: e.detail.value.classes,
          group: that.data.group[that.data.picker_index],
          phonenum: e.detail.value.phonenum,
          prize: e.detail.value.prize,
          rs: e.detail.value.rs,
          id: e.detail.value.id,
          hobby:e.detail.value.hobby,
          zhiwu:e.detail.value.zhiwu,
          openid: that.data.openid
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            flag:1,
            name: e.detail.value.name,
            classes: e.detail.value.classes,
            picker_index: that.data.picker_index,
            phonenum: e.detail.value.phonenum,
            prize: e.detail.value.prize,
            rs: e.detail.value.rs,
            id: e.detail.value.id,
            hobby: e.detail.value.hobby,
            zhiwu: e.detail.value.zhiwu,
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          //console.log(res);
          wx.showToast({
            title: '提交失败',
            image: '/images/fail.png',
            icon: 'fail',
            duration: 2000
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '请输入完整信息',
        image: '/images/fail.png',
        icon: 'fail',
        duration: 2000
      })
    }
  },

  pickerChange: function (e) {
    var that = this;
    that.setData({
      picker_index: e.detail.value
    })
  }
})