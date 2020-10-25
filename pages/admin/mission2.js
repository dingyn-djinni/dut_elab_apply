var app = getApp()
// pages/admin/mission2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.num = app.globalData.num;

    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/mission2.php',
      method: 'POST',
      data: {
        num: this.data.num,
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
  tips:function(e){
    var id = e.target.dataset.id;
    app.globalData.openid2 = id;
    console.log(app.globalData.open1d2);
    wx.navigateTo({
      url: '../admin/mission3',
    })

  }
})