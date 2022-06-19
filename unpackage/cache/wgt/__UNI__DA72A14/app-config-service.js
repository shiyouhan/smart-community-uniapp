
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/prologue/prologue","pages/index/index","pages/park-map/park-map","pages/community/community","pages/my/my","pages/property/property","pages/setting/setting","pages/password-edit/password-edit","pages/user-edit/user-edit","pages/feedback/feedback","pages/about/about","pages/user-privacy/user-privacy","pages/xiangqing/xiangqing","pages/fabu/fabu","pages/integral/integral","pages/coupon/coupon","pages/user-agreement/user-agreement","pages/handover-cell/handover-cell","pages/family/family","pages/member-edit/member-edit","pages/member-add/member-add","pages/collect/collect","pages/login/login","pages/password-reset/password-reset","pages/regist/regist","pages/wallet/wallet","pages/order/order","pages/record/record","pages/shelves/shelves","pages/good-detail/good-detail","pages/good-type/good-type","pages/open-door/open-door","pages/xiangqinga/xiangqinga","pages/xiangqingb/xiangqingb","pages/xiangqingc/xiangqingc","pages/invitation/invitation","pages/integral/integral","pages/coupon/coupon","pages/user-agreement/user-agreement","pages/handover-cell/handover-cell","pages/family/family","pages/invitation-record/invitation-record","pages/security/security","pages/parking/parking","pages/park-manage/park-manage","pages/rental-parkspace/rental-parkspace","pages/property-service/property-service","pages/property-payment/property-payment","pages/online-repair/online-repair","pages/repair-record/repair-record","pages/repair-detail/repair-detail","pages/community-events/community-events","pages/comment/comment","pages/comment-record/comment-record","pages/comment-detail/comment-detail","pages/livelihood/livelihood","pages/transaction/transaction","pages/estate-detail/estate-detail","pages/business/business","pages/shop-detail/shop-detail","pages/market/market","pages/record/record","pages/shelves/shelves","pages/signin/signin","pages/myshop/myshop","pages/payment-detail/payment-detail","pages/comment-detail/comment-detail","pages/vip-invitation/vip-invitation","pages/vip-record/vip-record","pages/address/address"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#f5820f","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333333","borderStyle":"white","selectedColor":"#5c8396","backgroundColor":"#FFFFFF","height":"54px","fontSize":"10px","iconWidth":"24px","spacing":"6px","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/images/tabbar/index.png","selectedIconPath":"static/images/tabbar/index-active.png"},{"pagePath":"pages/community/community","text":"社区服务","iconPath":"static/images/tabbar/community.png","selectedIconPath":"static/images/tabbar/community-active.png"},{"pagePath":"pages/property/property","text":"社区交流","iconPath":"static/images/tabbar/property.png","selectedIconPath":"static/images/tabbar/property-active.png"},{"pagePath":"pages/my/my","text":"个人中心","iconPath":"static/images/tabbar/my.png","selectedIconPath":"static/images/tabbar/my-active.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"智慧社区","compilerVersion":"3.4.14","entryPagePath":"pages/prologue/prologue","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/prologue/prologue","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false}},{"path":"/pages/park-map/park-map","meta":{"isNVue":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/community/community","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"社区服务","enablePullDownRefresh":true,"titleNView":{"searchInput":{"align":"left","backgroundColor":"white","borderRadius":"10px","placeholder":"关键字","disabled":false,"placeholderColor":"#6F6C67"}}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/property/property","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"社区交流","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/setting/setting","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/password-edit/password-edit","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/user-edit/user-edit","meta":{},"window":{"navigationBarTitleText":"个人资料","enablePullDownRefresh":false}},{"path":"/pages/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们","enablePullDownRefresh":false}},{"path":"/pages/user-privacy/user-privacy","meta":{},"window":{"navigationBarTitleText":"用户隐私","enablePullDownRefresh":false}},{"path":"/pages/xiangqing/xiangqing","meta":{},"window":{"navigationBarTitleText":"广场详情","navigationBarBackgroundColor":"#F8F8F8","navigationBarTextStyle":"black","enablePullDownRefresh":false}},{"path":"/pages/fabu/fabu","meta":{},"window":{"navigationBarTitleText":"发布","navigationBarBackgroundColor":"#F8F8F8","navigationBarTextStyle":"black","enablePullDownRefresh":false}},{"path":"/pages/integral/integral","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"transparent","titleNView":{"type":"float","titleText":"积分"}}},{"path":"/pages/coupon/coupon","meta":{},"window":{"navigationBarTitleText":"优惠券","enablePullDownRefresh":false}},{"path":"/pages/user-agreement/user-agreement","meta":{},"window":{"navigationBarTitleText":"用户协议","enablePullDownRefresh":false}},{"path":"/pages/handover-cell/handover-cell","meta":{},"window":{"navigationBarTitleText":"切换小区","enablePullDownRefresh":true}},{"path":"/pages/family/family","meta":{},"window":{"navigationBarTitleText":"家庭成员","enablePullDownRefresh":true,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/member-edit/member-edit","meta":{},"window":{"navigationBarTitleText":"成员编辑","enablePullDownRefresh":false}},{"path":"/pages/member-add/member-add","meta":{},"window":{"navigationBarTitleText":"成员添加","enablePullDownRefresh":false}},{"path":"/pages/collect/collect","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":true}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/password-reset/password-reset","meta":{},"window":{"navigationBarTitleText":"重置密码","enablePullDownRefresh":false}},{"path":"/pages/regist/regist","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"transparent","titleNView":{"type":"float","titleText":"我的钱包"}}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"我的订单","enablePullDownRefresh":false}},{"path":"/pages/record/record","meta":{},"window":{"navigationBarTitleText":"上架记录","enablePullDownRefresh":false}},{"path":"/pages/shelves/shelves","meta":{},"window":{"navigationBarTitleText":"上架","enablePullDownRefresh":false}},{"path":"/pages/good-detail/good-detail","meta":{},"window":{"navigationBarTitleText":"商品详情","enablePullDownRefresh":false}},{"path":"/pages/good-type/good-type","meta":{},"window":{"navigationBarTitleText":"类型","enablePullDownRefresh":true}},{"path":"/pages/open-door/open-door","meta":{},"window":{"navigationBarTitleText":"智慧开门","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"访客邀请","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/xiangqinga/xiangqinga","meta":{},"window":{"navigationBarTitleText":"互助详情","navigationBarBackgroundColor":"#F8F8F8","navigationBarTextStyle":"black","enablePullDownRefresh":false}},{"path":"/pages/xiangqingb/xiangqingb","meta":{},"window":{"navigationBarTitleText":"二手详情","navigationBarBackgroundColor":"#F8F8F8","navigationBarTextStyle":"black","enablePullDownRefresh":false}},{"path":"/pages/xiangqingc/xiangqingc","meta":{},"window":{"navigationBarTitleText":"拼车详情","navigationBarBackgroundColor":"#F8F8F8","navigationBarTextStyle":"black","enablePullDownRefresh":false}},{"path":"/pages/invitation/invitation","meta":{},"window":{"navigationBarTitleText":"访客邀请","enablePullDownRefresh":false}},{"path":"/pages/invitation-record/invitation-record","meta":{},"window":{"navigationBarTitleText":"邀请纪录","enablePullDownRefresh":false}},{"path":"/pages/security/security","meta":{},"window":{"navigationBarTitleText":"智慧安防","enablePullDownRefresh":false}},{"path":"/pages/parking/parking","meta":{},"window":{"navigationBarTitleText":"社区停车","enablePullDownRefresh":false}},{"path":"/pages/park-manage/park-manage","meta":{},"window":{"navigationBarTitleText":"车位管理","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/rental-parkspace/rental-parkspace","meta":{},"window":{"navigationBarTitleText":"租凭车位","enablePullDownRefresh":false}},{"path":"/pages/property-service/property-service","meta":{},"window":{"navigationBarTitleText":"物业服务","enablePullDownRefresh":false}},{"path":"/pages/property-payment/property-payment","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"transparent","titleNView":{"type":"float","titleText":"物业缴费"}}},{"path":"/pages/online-repair/online-repair","meta":{},"window":{"navigationBarTitleText":"在线报修","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/repair-record/repair-record","meta":{},"window":{"navigationBarTitleText":"报修记录","enablePullDownRefresh":false}},{"path":"/pages/repair-detail/repair-detail","meta":{},"window":{"navigationBarTitleText":"报修记录","enablePullDownRefresh":false}},{"path":"/pages/community-events/community-events","meta":{},"window":{"navigationBarTitleText":"社区活动","enablePullDownRefresh":false}},{"path":"/pages/comment/comment","meta":{},"window":{"navigationBarTitleText":"投诉建议","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/comment-record/comment-record","meta":{},"window":{"navigationBarTitleText":"投诉记录","enablePullDownRefresh":false}},{"path":"/pages/comment-detail/comment-detail","meta":{},"window":{"navigationBarTitleText":"投诉详情","enablePullDownRefresh":false}},{"path":"/pages/livelihood/livelihood","meta":{},"window":{"navigationBarTitleText":"民生资讯","onReachBottomDistance":200,"enablePullDownRefresh":true}},{"path":"/pages/transaction/transaction","meta":{},"window":{"navigationBarTitleText":"房产交易","enablePullDownRefresh":true}},{"path":"/pages/estate-detail/estate-detail","meta":{},"window":{"navigationBarTitleText":"房产详情","enablePullDownRefresh":false}},{"path":"/pages/business/business","meta":{},"window":{"navigationBarTitleText":"小区商家","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"我的店铺","fontSize":"16px","fontWeight":"bold","width":"78px"}]}}},{"path":"/pages/shop-detail/shop-detail","meta":{},"window":{"navigationBarTitleText":"商店详情","enablePullDownRefresh":false}},{"path":"/pages/market/market","meta":{},"window":{"navigationBarTitleText":"跳蚤市场","enablePullDownRefresh":true,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/signin/signin","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"transparent","titleNView":{"type":"float","titleText":"签到"}}},{"path":"/pages/myshop/myshop","meta":{},"window":{"navigationBarTitleText":"我的店铺","enablePullDownRefresh":false}},{"path":"/pages/payment-detail/payment-detail","meta":{},"window":{"navigationBarTitleText":"支付详情","enablePullDownRefresh":false}},{"path":"/pages/vip-invitation/vip-invitation","meta":{},"window":{"navigationBarTitleText":"贵宾邀请","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#FFFFFF","float":"right","fontSize":"20px","fontSrc":"/static/font/iconfont.ttf","text":"","width":"40px"}]}}},{"path":"/pages/vip-record/vip-record","meta":{},"window":{"navigationBarTitleText":"邀请记录","enablePullDownRefresh":false}},{"path":"/pages/address/address","meta":{},"window":{"navigationBarTitleText":"收货地址","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});