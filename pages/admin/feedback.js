

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    name: '',
    phoneNumber: '',
    description: '',
    contact: ['手机号', 'qq'],
    picker_index: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data;
        //console.log(openid);
        that.setData({
          openid: openid
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

  formSubmit: function (e) {
    var that = this;
    var openid = that.data.openid;
    if (e.detail.value.description != "" && e.detail.value.name != "" && e.detail.value.phoneNumber != "") {
      var phoneNumber = e.detail.value.phoneNumber;
      if (that.data.picker_index == 0) {
        phoneNumber = '手机号:' + phoneNumber;
      }
      else if (that.data.picker_index == 1) {
        phoneNumber = 'QQ号:' + phoneNumber;
      }
      wx.request({
        url: 'https://class.dlut-elab.com/feedback/dingyuning/feedback.php',
        data: {
          name: e.detail.value.name,
          phoneNumber: phoneNumber,
          description: e.detail.value.description,
          openid: openid
        },

        success: function (res) {
          console.log(res.data);
          wx.showToast({
            title: '感谢您的反馈',
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