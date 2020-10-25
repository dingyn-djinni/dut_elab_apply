var app=getApp()
var util=require("../../utils/util.js")
// pages/admin/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    id:'',
    changci:0,
    result:'',
    openid:'',
    times:'',
    date:'',
    time:'',
    nowtime:'',
    endtime:'',
    starttime:'',
    bianhao:0
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doo();
    
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
    this.doo();

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
  doo:function()
  {
    var that=this;
    var name=wx.getStorageSync("name");
    var id = wx.getStorageSync("id");
    var changci = wx.getStorageSync("changci");
    var bianhao = wx.getStorageSync("bianhao");
    var group = wx.getStorageSync("group");
    var date = wx.getStorageSync("date");
    var time = wx.getStorageSync("time");
    var result = wx.getStorageSync("ans");
    if(name){
      this.setData({name: name});
    }
    if (id) {
      this.setData({ id: id });
    }
    if (changci) {
      this.setData({ changci: changci });
    }
    if (bianhao) {
      this.setData({ bianhao: bianhao });
    }
    if (group) {
      this.setData({ group: group });
    }
    if (time) {
      this.setData({ time: time });
    }
    if (date) {
      this.setData({ date: date });
    }
    if (result) {
      this.setData({ result: result });
    }
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
          if (res.data[i].kind == 3) {
            let olddata = res.data[i].date + ' ' + res.data[i].time;
            console.log(res.data[i].date + res.data[i].time);
            olddata = olddata.replace(/-/g, '/');
            console.log(olddata);
            var endtime = util.formatTime(new Date(olddata));
            that.setData({
              endtime: endtime
            })
          }
          if (res.data[i].kind == 2) {
            let olddata = res.data[i].date + ' ' + res.data[i].time;
            console.log(res.data[i].date + res.data[i].time);
            olddata = olddata.replace(/-/g, '/');
            console.log(olddata);
            var endtime = util.formatTime(new Date(olddata));
            that.setData({
              starttime: endtime
            })
          }
        }
      }
    })
    this.data.openid = app.globalData.openid;
    console.log(this.data.openid);
    var that = this;
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/result.php',
      method: 'POST',
      data: {
        openid: this.data.openid,
      },
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        that.data.time = res.data[0].time;
        that.setData({
          name: res.data[0].name,
          id: res.data[0].license,
          changci: res.data[0].time,
          group: res.data[0].groups,
          bianhao: res.data[0].bianhao,
          date: res.data[1].date,
          time: res.data[1].time,
        })
        wx.setStorageSync("name",res.data[0].name);
        wx.setStorageSync("id", res.data[0].license);
        wx.setStorageSync("changci", res.data[0].time);
        wx.setStorageSync("group", res.data[0].groups);
        wx.setStorageSync("bianhao", res.data[0].bianhao);
        wx.setStorageSync("date", res.data[1].date);
        wx.setStorageSync("time", res.data[1].time);
    
        if (res.data[0].result == 1) {
          that.setData({
            ans: "通过"
          })
        }
        if (res.data[0].result == 2) {
          that.setData({
            ans: "未通过"
          })
        }
        if (res.data[0].result == 0) {
          that.setData({
            ans: "未审核"
          })
        }
        wx.setStorageSync("result", that.data.ans);
        app.globalData.time = res.data[0].time;
      }
    })
    /*wx.request({
      url: 'https://class.dlut-elab.com/feedback/dingyuning/result2.php',
      method: 'POST',
      data: {
        num: app.globalData.time,
      },
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          date:res.data[0].date,
          time:res.data[0].time
        }

      }
    })*/
    /*if (app.globalData.tap == 0) {

      app.globalData.tap = 1;
      wx.redirectTo({
        url: '../admin/result',
      })
    }
    else {
      app.globalData.tap = 0;
    }*/

  },
  dateToTimestamp(dateStr) {
    if (!dateStr) {
      return ''
    }
    let newDataStr = dateStr.replace(/\.|\-/g, '/')
    let date = new Date(newDataStr);
    let timestamp = date.getTime();
    return timestamp
  }
})