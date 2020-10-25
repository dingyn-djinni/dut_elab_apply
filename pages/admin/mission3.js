var app = getApp()
// pages/admin/mission3.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    openid2:'',
    text3: '', 
    num:'',
    array: ['建议枪毙', '表现很差', '表现一般', '没什么印象','表现不错','表现很好','保荐通过'],
    yj:'',
    text1:'',
    text2:''

  }, 
  bindTextAreaBlur0: function (e) {

  },

  bindTextAreaBlur1: function (e) {

  },

  bindTextAreaBlur2: function (e) {
    this.data.text3 = e.detail.value;
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.data.yj=e.detail.value;
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

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
    if (app.globalData.tap == 0) {
      app.globalData.tap = 1;
      wx.redirectTo({
        url: '../admin/mission3',
      })
    }
    else {
      app.globalData.tap = 0;
    }
    var that=this;
    this.data.openid = app.globalData.openid;
    this.data.openid2 = app.globalData.openid2;
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/mission3.php',
      data: {
        openid: this.data.openid2
      },
      method: 'POST',
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
         text1: res.data[0].text1,
         text2: res.data[0].text2
        })
      }
    })

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
  finish:function(e){
    
    if (!this.data.yj)
    {
      wx.showModal({
        content: '请打分'
      })
      wx.redirectTo({
        url: '../admin/mission3',
      })

    }
    console.log(this.data.yj);
   if(this.data.yj==0)
   {
     this.data.num=-5;
   }
    if (this.data.yj == 1) {
      this.data.num = -2;
    }
    if (this.data.yj == 2) {
      this.data.num = -1;
    }
    if (this.data.yj == 3) {
      this.data.num = 0;
    }
    if (this.data.yj == 4) {
      this.data.num = 1;
    }
    if (this.data.yj == 5) {
      this.data.num = 2;
    }
    if (this.data.yj == 6) {
      this.data.num = 5;
    }
    console.log(this.data.num)
    var that =this;

    if(this.data.num==-5)
    {
      if(this.data.text3){
        wx.request({
          url: 'https://class.dlut-elab.com/feedback/dingyuning/mission3_2.php',
          data: {
            openid: this.data.openid2,
            score: this.data.num
          },
          method: 'POST',
          header:
          {
            "Content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            wx.showModal({
              content: '打分成功',
            })

          }
        })

      }
      else{
        wx.showModal({
          content: '请输入打分理由'
        })
        
        
      }
    }
    else if (this.data.num == 5) {
      if (this.data.text3) {
        wx.request({
          url: 'https://class.dlut-elab.com/feedback/dingyuning/mission3_2.php',
          data: {
            openid: this.data.openid2,
            score: this.data.num
          },
          method: 'POST',
          header:
          {
            "Content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            wx.showModal({
              content: '打分成功',
            })

          }
        })

      }
      else {
        wx.showModal({
          content: '请输入打分理由'
        })


      }
    }
    else{
      wx.request({
        url: 'https://class.dlut-elab.com/feedback/dingyuning/mission3_2.php',
        data: {
          openid: this.data.openid2,
          score: this.data.num
        },
        method: 'POST',
        header:
        {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data);
          wx.showModal({
            content: '打分成功',
          })

        }
      })
    }
    if(this.data.text3)
    {
      wx.request({
        url: 'https://class.dlut-elab.com/feedback/dingyuning/mission3_1.php',
        data: {
          openid: this.data.openid,
          openid2:this.data.openid2,
          score: this.data.num,
          reason:this.data.text3,
          name:app.globalData.name
        },
        method: 'POST',
        header:
        {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {

        }
      })

    }
  


  },
  back: function () {
    wx.redirectTo({
      url: '../admin/mission2',
    })
  }
})