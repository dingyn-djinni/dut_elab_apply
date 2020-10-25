var app=getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_time: "",
    openid:'',
    starttime:'',
    nowtime: '',
    endtime: '',
    stutime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var nowtime=util.formatTime(new Date());
    console.log(nowtime);
    /*var nowtime = util.formatTime(new Date());
    this.setData({
      nowtime: nowtime
    })*/
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/GetstartendTime.php',
      header: {

        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success:function(res)
      {
        console.log(res.data);
        var aaa=res.data[4];
        aaa = aaa.replace(/-/g, '/');
        console.log(aaa);
        var nowtime = util.formatTime(new Date(aaa));
        that.setData({
          nowtime:nowtime
        })
        console.log(that.data.nowtime);
        for(var i=0;i<res.data.length;++i)
        {
          if(res.data[i].kind==0)
          {
            let olddata = res.data[i].date+' '+res.data[i].time;
            console.log(res.data[i].date+res.data[i].time);
            olddata = olddata.replace(/-/g, '/');
            console.log(olddata);
            var endtime = util.formatTime(new Date(olddata));
            console.log(endtime);
            that.setData({
              endtime:endtime
            })
          }
          if (res.data[i].kind == 1) {
            let olddata = res.data[i].date + ' ' + res.data[i].time;
            console.log(res.data[i].date + res.data[i].time);
            olddata = olddata.replace(/-/g, '/');
            console.log(olddata);
            var starttime = util.formatTime(new Date(olddata));
            that.setData({
              starttime: starttime
            })
          }
        }
        if (that.data.nowtime <= that.data.endtime) {
          console.log(646494484);
        }
        console.log(that.data.endtime);
        console.log(that.data.starttime);
        if (  that.data.nowtime >= that.data.starttime){
          console.log(12356898787);
        }
      }
    })
    this.getAllTime();
    console.log(1);
    var openid=app.globalData.openid;
    this.setData({openid: openid})
    wx.request({

      url: 'https://class.dlut-elab.com/feedback/dingyuning/GetStuTime.php',

      header: {

        "Content-Type": "application/x-www-form-urlencoded"

      },

      method: "POST",

      data: { openid: that.data.openid },
      success:function(res)
      {
        if(res.data[0].time!=0)
        {
          console.log(res.data[0].time);
          that.setData({
            stutime:res.data[0].time
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
    var that=this;
    wx.showLoading({
      title: '加载中',
    });
    this.getAllTime();
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/GetstartendTime.php',
      header: {

        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        res.data[4] = res.data[4].replace(/-/g, '/');
        var nowtime = util.formatTime(new Date(res.data[4]));
        that.setData({
          nowtime: nowtime
        })
        for (var i = 0; i < res.data.length; ++i) {
          if (res.data[i].kind == 0) {
            let olddata = res.data[i].date + ' ' + res.data[i].time;
            console.log(res.data[i].date + res.data[i].time);
            olddata = olddata.replace(/-/g, '/');
            console.log(olddata);
            var endtime = util.formatTime(new Date(olddata));
            that.setData({
              endtime: endtime
            })
          }
          if (res.data[i].kind == 1) {
            let olddata = res.data[i].date + ' ' + res.data[i].time;
            console.log(res.data[i].date + res.data[i].time);
            olddata = olddata.replace(/-/g, '/');
            console.log(olddata);
            var starttime = util.formatTime(new Date(olddata));
            that.setData({
              starttime: starttime
            })
          }
        }
      }
    })
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
          url: 'https://class.dlut-elab.com/feedback/dingyuning/GetTime.php',
          success: function (res) {
            wx.stopPullDownRefresh();
            wx.hideLoading();
            console.log(res.data);
            wx.setStorage({
              key: 'allTime',
              data: res.data
            });
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
                  image: '/images/fail.png',
                  icon: 'fail',
                  duration: 2000
                });
              }
            })
          }
        })
      
  }  ,
  tips:function(e)
  {
      
          var id = e.currentTarget.dataset.id;
          var that = this;
          console.log(id);
          this.getAllTime();
          for (var i = 0; i < that.data.all_time.length; i++) {
            if (that.data.all_time[i].num == id) {
              if (that.data.all_time[i].last > 0) {
                console.log(that.data.all_time[i].last + 'akhsgehwihg' + '    ' + i);
                wx.request({

                  url: 'https://class.dlut-elab.com/feedback/dingyuning/GetStuTime.php',

                  header: {

                    "Content-Type": "application/x-www-form-urlencoded"

                  },

                  method: "POST",

                  data: { openid: that.data.openid },
                  success: function (res) {
                    console.log(res.data[0].time);
                    if (res.data[0].time != 0) {
                      var abc = res.data[0].time;
                      console.log(abc);
                      wx.showModal({
                        title: '提示',
                        content: '已选择场次，是否更改',
                        success(res) {
                          if (res.confirm) {
                            console.log('用户点击确定');
                            wx.request({
                              url: 'https://class.dlut-elab.com/feedback/dingyuning/ChangeTime.php',

                              header: {

                                "Content-Type": "application/x-www-form-urlencoded"

                              },

                              method: "POST",

                              data: {
                                openid: that.data.openid,
                                num: id,
                                oldnum: abc

                              },
                              success: function (res) {
                                console.log(res.data);
                                if (res.data < -1) {
                                  wx.showToast({
                                    title: '剩余量为零',
                                    image: '/images/fail.png',
                                  })
                                }
                                if (res.data == -1) {
                                  wx.showToast({
                                    title: '请先报名',
                                    image: '/images/fail.png',
                                  })
                                }
                                if(res.data>-1) {
                                  that.setData({
                                    stutime: id
                                  })
                                  wx.showModal({
                                    content: '提交成功',
                                    showCancel: false
                                  })
                                  that.getAllTime();
                                }
                              },
                              fail: function () {
                                wx.showToast({
                                  title: '提交失败',
                                  image: '/images/fail.png',
                                })
                              }
                            })

                          }
                          else if (res.cancel) {
                            console.log('用户点击取消');
                          }
                        },
                        fail: function () {
                          wx.showToast({
                            title: '提交失败',
                            image: '/images/fail.png',
                          })
                        }
                      })


                    } else {
                      wx.request({
                        url: 'https://class.dlut-elab.com/feedback/dingyuning/ChooseTime.php',

                        header: {

                          "Content-Type": "application/x-www-form-urlencoded"

                        },

                        method: "POST",

                        data: {
                          openid: that.data.openid,
                          num: id
                        },
                        success: function (res) {
                          console.log(res.data);
                          if (res.data < -1) {
                            wx.showToast({
                              title: '剩余量为零',
                              image: '/images/fail.png',
                            })
                          }
                          if (res.data == -1) {
                            wx.showToast({
                              title: '请先报名',
                              image: '/images/fail.png',
                            })
                          }
                          if(res.data>-1) {
                            that.setData({
                              stutime: id
                            })
                            wx.showModal({
                              content: '提交成功',
                              showCancel: false
                            })
                            that.getAllTime();
                          }
                        }
                      })

                    }

                  },
                  fail: function () {
                    wx.showToast({
                      title: '提交失败',
                      image: '/images/fail.png',
                    })
                  }

                })
              }
              else {
                wx.showModal({
                  content: '本场余量不足！！'
                })
              }
              break;
            }
          }


        },
  dateToTimestamp(dateStr) {
    if (!dateStr) {
      return ''
    }
    let newDataStr = dateStr.replace(/\.|\-/g, '/')
    //let date = new Date(newDataStr);
    //let timestamp = date.getTime();
    return newDataStr;
  }
  })
    
