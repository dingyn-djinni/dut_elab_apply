// pages/admin/allinf.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid2: '',
    text1: '',
    text2: '',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.tap == 0) {
      app.globalData.tap = 1;
      wx.redirectTo({
        url: '../admin/reasons',
      })
    }
    else {
      app.globalData.tap = 0;
    }
    var that = this
    this.data.openid2 = app.globalData.openid2;
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/allinf.php',
      method: 'POST',
      data: {
        openid2: this.data.openid2
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
  accept: function () {
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/accept.php',
      method: 'POST',
      data: {
        openid2: this.data.openid2
      },
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);


      }
    })
    wx.showModal({
      title: '提交成功',
      content: '通过',
    })

  },
  dead: function () {
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/dead.php',
      method: 'POST',
      data: {
        openid2: this.data.openid2
      },
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {


      }
    })
    wx.showModal({
      title: '提交成功',
      content: '枪毙',
    })
  },
  back: function () {
    wx.redirectTo({
      url: '../admin/allinf',
    })
  }


})