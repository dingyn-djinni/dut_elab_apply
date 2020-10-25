// pages/admin/all.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    if (app.globalData.tap == 0) {
      app.globalData.tap = 1;
      wx.redirectTo({
        url: '../admin/admin',
      })
    }
    else {
      app.globalData.tap = 0;
    }
    var that = this;

    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/all.php',
      method: 'POST',
      data: {
        num:app.globalData.num

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
  tips: function (e) {
    var id = e.target.dataset.id;
    app.globalData.openid2 = id;
    console.log(app.globalData.open1d2);
    wx.redirectTo({
      url: '../admin/allinf',
    })

  }
})