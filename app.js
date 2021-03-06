//app.js
App({
  globalData: {
   data:'',  
   openid:'',
   name:'',
   num:'',
   openid2:'',
   text1:'',
   text2:'',
   tap:0,
   time:''
     },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that =this;

    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: 'https://class.dlut-elab.com/feedback/dingyuning/ask.php', //接口地址
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res.data)
            that.globalData.openid=res.data.openid;
            console.log(that.globalData.openid);
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              //console.log(res.userInfo);
              this.globalData.userId=res.userInfo.nickName;
              //console.log(this.globalData.userId);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  globalData: {
    userInfo: null
  }
    
}
   
})