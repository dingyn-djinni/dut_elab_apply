// pages/admin/allinf.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid2: '',
    text1:'',
    text2:'',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.tap==0){
      app.globalData.tap=1;
      wx.redirectTo({
        url: '../admin/allinf',
      })
    }
    else{
      app.globalData.tap=0;
    }
    var that =this
    this.data.openid2 = app.globalData.openid2;
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/checkinf.php',
      method: 'POST',
      data: {
        openid2: this.data.openid2,
      },
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          all_time: res.data,
        })
        that.setData({
          name: res.data[0].name,
          license: res.data[0].license,
          groups: res.data[0].groups,
          aver: res.data[0].aver,
          text1: res.data[0].text1,
          text2: res.data[0].text2,
        })
        if (res.data[0].result == 1) {
          that.setData({
            result: "通过"
          })
        }
        if (res.data[0].result == 2) {
          that.setData({
            result: "未通过"
          })
        }
        if (res.data[0].result == 0) {
          that.setData({
            result: "未审核"
          })
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

  },

  back:function(){
    wx.redirectTo({
      url: '../admin/all',
    })
  },
  check:function(){
    wx.redirectTo({
      url: '../admin/reasons',
    })
  }
   

})