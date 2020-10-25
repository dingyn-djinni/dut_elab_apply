var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_time: "",
    num: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllTime();
    console.log(1);
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
    wx.showLoading({
      title: '加载中',
    });
    this.getAllTime();
    wx.stopPullDownRefresh();
    wx.hideLoading();
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
  getAllTime: function () {
    wx.showLoading({
      title: '加载中',
    });
    console.log("test");
    var that = this;
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/sunjianing/GetTime.php',
      success: function (res) {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        console.log(res.data);

        that.setData({
          all_time: res.data,
        })

      },
      fail: function () {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        wx.getStorage({
          key: 'allTime',
          success: function (res) {
            that.setData({
              all_time: res.data,
            })
          },
          fail: function () {
            wx.showToast({
              title: '获取时间失败',
              image: '/images/fail1.png',
              icon: 'fail',
              duration: 2000
            });
          }
        })
      }
    })

  },
  tips: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    console.log(id);
    app.globalData.num=id;
    wx.redirectTo({
      url: '../admin/all',
    })
 
  }

})