(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4c59e1e"],{"0cb2":function(e,t,n){var a=n("7b0b"),r=Math.floor,s="".replace,i=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,c=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,n,o,l,u){var v=n+e.length,f=o.length,d=c;return void 0!==l&&(l=a(l),d=i),s.call(u,d,(function(a,s){var i;switch(s.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(v);case"<":i=l[s.slice(1,-1)];break;default:var c=+s;if(0===c)return a;if(c>f){var u=r(c/10);return 0===u?a:u<=f?void 0===o[u-1]?s.charAt(1):o[u-1]+s.charAt(1):a}i=o[c-1]}return void 0===i?"":i}))}},"107c":function(e,t,n){var a=n("d039"),r=n("da84"),s=r.RegExp;e.exports=a((function(){var e=s("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},"14c3":function(e,t,n){var a=n("825a"),r=n("1626"),s=n("c6b6"),i=n("9263");e.exports=function(e,t){var n=e.exec;if(r(n)){var c=n.call(e,t);return null!==c&&a(c),c}if("RegExp"===s(e))return i.call(e,t);throw TypeError("RegExp#exec called on incompatible receiver")}},"2c0b":function(e,t,n){"use strict";n("4bf1")},"4bf1":function(e,t,n){},5319:function(e,t,n){"use strict";var a=n("d784"),r=n("d039"),s=n("825a"),i=n("1626"),c=n("a691"),o=n("50c4"),l=n("577e"),u=n("1d80"),v=n("8aa5"),f=n("dc4a"),d=n("0cb2"),p=n("14c3"),g=n("b622"),h=g("replace"),m=Math.max,x=Math.min,b=function(e){return void 0===e?e:String(e)},y=function(){return"$0"==="a".replace(/./,"$0")}(),I=function(){return!!/./[h]&&""===/./[h]("a","$0")}(),w=!r((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));a("replace",(function(e,t,n){var a=I?"$":"$0";return[function(e,n){var a=u(this),r=void 0==e?void 0:f(e,h);return r?r.call(e,a,n):t.call(l(a),e,n)},function(e,r){var u=s(this),f=l(e);if("string"===typeof r&&-1===r.indexOf(a)&&-1===r.indexOf("$<")){var g=n(t,u,f,r);if(g.done)return g.value}var h=i(r);h||(r=l(r));var y=u.global;if(y){var I=u.unicode;u.lastIndex=0}var w=[];while(1){var _=p(u,f);if(null===_)break;if(w.push(_),!y)break;var k=l(_[0]);""===k&&(u.lastIndex=v(f,o(u.lastIndex),I))}for(var C="",$=0,R=0;R<w.length;R++){_=w[R];for(var E=l(_[0]),T=m(x(c(_.index),f.length),0),O=[],P=1;P<_.length;P++)O.push(b(_[P]));var L=_.groups;if(h){var S=[E].concat(O,T,f);void 0!==L&&S.push(L);var U=l(r.apply(void 0,S))}else U=d(E,f,T,O,L,r);T>=$&&(C+=f.slice($,T)+U,$=T+E.length)}return C+f.slice($)}]}),!w||!y||I)},"8aa5":function(e,t,n){"use strict";var a=n("6547").charAt;e.exports=function(e,t,n){return t+(n?a(e,t).length:1)}},9263:function(e,t,n){"use strict";var a=n("577e"),r=n("ad6d"),s=n("9f7f"),i=n("5692"),c=n("7c73"),o=n("69f3").get,l=n("fce3"),u=n("107c"),v=RegExp.prototype.exec,f=i("native-string-replace",String.prototype.replace),d=v,p=function(){var e=/a/,t=/b*/g;return v.call(e,"a"),v.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),g=s.UNSUPPORTED_Y||s.BROKEN_CARET,h=void 0!==/()??/.exec("")[1],m=p||h||g||l||u;m&&(d=function(e){var t,n,s,i,l,u,m,x=this,b=o(x),y=a(e),I=b.raw;if(I)return I.lastIndex=x.lastIndex,t=d.call(I,y),x.lastIndex=I.lastIndex,t;var w=b.groups,_=g&&x.sticky,k=r.call(x),C=x.source,$=0,R=y;if(_&&(k=k.replace("y",""),-1===k.indexOf("g")&&(k+="g"),R=y.slice(x.lastIndex),x.lastIndex>0&&(!x.multiline||x.multiline&&"\n"!==y.charAt(x.lastIndex-1))&&(C="(?: "+C+")",R=" "+R,$++),n=new RegExp("^(?:"+C+")",k)),h&&(n=new RegExp("^"+C+"$(?!\\s)",k)),p&&(s=x.lastIndex),i=v.call(_?n:x,R),_?i?(i.input=i.input.slice($),i[0]=i[0].slice($),i.index=x.lastIndex,x.lastIndex+=i[0].length):x.lastIndex=0:p&&i&&(x.lastIndex=x.global?i.index+i[0].length:s),h&&i&&i.length>1&&f.call(i[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(i[l]=void 0)})),i&&w)for(i.groups=u=c(null),l=0;l<w.length;l++)m=w[l],u[m[0]]=i[m[1]];return i}),e.exports=d},"99af":function(e,t,n){"use strict";var a=n("23e7"),r=n("d039"),s=n("e8b5"),i=n("861d"),c=n("7b0b"),o=n("50c4"),l=n("8418"),u=n("65f0"),v=n("1dde"),f=n("b622"),d=n("2d00"),p=f("isConcatSpreadable"),g=9007199254740991,h="Maximum allowed index exceeded",m=d>=51||!r((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),x=v("concat"),b=function(e){if(!i(e))return!1;var t=e[p];return void 0!==t?!!t:s(e)},y=!m||!x;a({target:"Array",proto:!0,forced:y},{concat:function(e){var t,n,a,r,s,i=c(this),v=u(i,0),f=0;for(t=-1,a=arguments.length;t<a;t++)if(s=-1===t?i:arguments[t],b(s)){if(r=o(s.length),f+r>g)throw TypeError(h);for(n=0;n<r;n++,f++)n in s&&l(v,f,s[n])}else{if(f>=g)throw TypeError(h);l(v,f++,s)}return v.length=f,v}})},"9f7f":function(e,t,n){var a=n("d039"),r=n("da84"),s=r.RegExp;t.UNSUPPORTED_Y=a((function(){var e=s("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=a((function(){var e=s("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,n){"use strict";var a=n("23e7"),r=n("9263");a({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},d784:function(e,t,n){"use strict";n("ac1f");var a=n("6eeb"),r=n("9263"),s=n("d039"),i=n("b622"),c=n("9112"),o=i("species"),l=RegExp.prototype;e.exports=function(e,t,n,u){var v=i(e),f=!s((function(){var t={};return t[v]=function(){return 7},7!=""[e](t)})),d=f&&!s((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[o]=function(){return n},n.flags="",n[v]=/./[v]),n.exec=function(){return t=!0,null},n[v](""),!t}));if(!f||!d||n){var p=/./[v],g=t(v,""[e],(function(e,t,n,a,s){var i=t.exec;return i===r||i===l.exec?f&&!s?{done:!0,value:p.call(t,n,a)}:{done:!0,value:e.call(n,t,a)}:{done:!1}}));a(String.prototype,e,g[0]),a(l,v,g[1])}u&&c(l[v],"sham",!0)}},eb88:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"my-container"},[n("van-nav-bar",{staticClass:"animate__animated",class:e.isTop?"top-user-nav   animate__fadeIn":"",scopedSlots:e._u([{key:"left",fn:function(){return[n("van-icon",{attrs:{name:"wap-nav",size:"0.58667rem"}})]},proxy:!0},e.isTop?{key:"title",fn:function(){return[n("div",{staticClass:"top-userInfo"},[n("van-image",{attrs:{width:"0.72rem",height:"0.72rem",round:"",src:e.userInfo.avatarUrl}}),n("span",{staticClass:"nickname van-ellipsis"},[e._v(e._s(e.userInfo.nickname))])],1)]},proxy:!0}:null,{key:"right",fn:function(){return[n("van-icon",{attrs:{name:"search",size:"0.58667rem"}})]},proxy:!0}],null,!0)}),n("div",{ref:"hhh",staticClass:"main",on:{"&scroll":function(t){return e.getScroll(t)}}},[e.userInfo.avatarUrl?n("div",{staticClass:"userInfo",on:{click:e.signOut}},[n("van-image",{attrs:{src:e.userInfo.avatarUrl,width:"1.333rem",height:"1.333rem",round:""}}),n("div",{staticClass:"user-center"},[n("div",{staticClass:"nickname van-ellipsis"},[e._v(e._s(e.userInfo.nickname))]),n("div",{staticClass:"level"},[n("van-icon",{staticClass:"iconfont icon-VIP",class:11===e.userInfo.vipType?"vip-activa":"",attrs:{size:"0.72rem"}}),n("van-button",{attrs:{round:""}},[e._v("Lv."+e._s(e.level))])],1)]),n("van-icon",{attrs:{name:"arrow",size:"0.42rem"}})],1):e._e(),n("div",{staticClass:"music-application"},[n("van-row",{attrs:{type:"flex"}},[n("van-col",{attrs:{span:"6"}},[n("van-icon",{attrs:{name:"friends",size:"0.82rem"}}),n("span",[e._v("我的好友")])],1),n("van-col",{attrs:{span:"6"}},[n("van-icon",{attrs:{name:"star",size:"0.82rem"}}),n("span",[e._v("收藏和赞")])],1),n("van-col",{attrs:{span:"6"}},[n("van-icon",{attrs:{name:"bag",size:"0.82rem"}}),n("span",[e._v("已购")])],1),n("van-col",{attrs:{span:"6"}},[n("van-icon",{attrs:{name:"play-circle",size:"0.82rem"}}),n("span",[e._v("最近播放")])],1),n("van-col",{attrs:{span:"6"}},[n("van-icon",{staticClass:"iconfont icon-yunpanlogo-_huabanfuben",attrs:{size:"0.82rem"}}),n("span",[e._v("云盘")])],1),n("van-col",{attrs:{span:"6"}},[n("van-icon",{staticClass:"iconfont icon-feed",attrs:{size:"0.82rem"}}),n("span",[e._v("我的播客")])],1)],1)],1),e.likeSong.coverImgUrl?n("div",{staticClass:"like-music"},[n("van-image",{attrs:{src:e.likeSong.coverImgUrl,width:"1.333rem",height:"1.333rem"}}),n("div",{staticClass:"center"},[n("div",{staticClass:"like"},[e._v("我喜欢的音乐")]),n("div",{staticClass:"like-count"},[e._v(e._s(e.likeSong.trackCount)+"首")])]),n("van-button",{attrs:{icon:"like-o",round:"",size:"mini"}},[e._v(" 心动模式 ")])],1):e._e(),n("div",{staticClass:"collection-song-list"},[n("van-row",{staticClass:"title",attrs:{type:"flex",justify:"space-between"}},[n("van-col",{attrs:{span:"7"}},[e._v("收藏歌单("+e._s(e.userPlayList.length)+"个)")]),n("van-col",{attrs:{span:"4"}},[n("van-icon",{staticClass:"iconfont icon-youcecaidan",attrs:{size:"0.42rem"}})],1)],1),0!==e.userPlayList.length?n("div",{staticClass:"item-wrap"},e._l(e.userPlayList,(function(t){return n("div",{key:t.id,staticClass:"list-item",on:{click:function(n){return e.toPlayListDetail(t.id)}}},[n("van-image",{attrs:{width:"1.333rem",height:"1.333rem",src:t.coverImgUrl}}),n("div",{staticClass:"list-item-info"},[n("div",{staticClass:"list-name van-ellipsis"},[e._v(e._s(t.name))]),n("div",{staticClass:"list-count van-ellipsis"},[e._v(" "+e._s(t.trackCount)+"首,by "+e._s(t.creator.nickname)+" ")])]),n("van-icon",{staticClass:"iconfont icon-youcecaidan",attrs:{size:"0.42rem"}})],1)})),0):n("div",{staticClass:"null-list-item"},[e._v(" 暂无收藏歌单 ")])],1)])],1)},r=[],s=n("1da1"),i=(n("96cf"),n("ac1f"),n("5319"),n("99af"),n("a434"),n("b64b"),n("5d2d")),c={name:"my",data:function(){return{userInfo:{},scrollTop:0,level:0,likeSong:{},userPlayList:[],isTop:!1,scroll:0}},methods:{signOut:function(){var e=this;this.$dialog.confirm({title:"是否退出登录?"}).then((function(){Object(i["b"])("cookie"),e.$store.commit("COOKIE",""),e.userInfo={},e.likeSong={},e.userPlayList=[],e.$toast({message:"退出成功",position:"top"}),e.$router.replace({name:"Home"})})).catch((function(){e.$toast({message:"已取消",position:"top"})}))},getUserInfo:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios("/user/account?date=".concat(Date.now()));case 2:n=t.sent,a=n.data.profile,e.userInfo=a;case 5:case"end":return t.stop()}}),t)})))()},getUserPlayList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios("/user/playlist?uid=".concat(e.userInfo.userId,"&date=").concat(Date.now()));case 2:n=t.sent,a=n.data,e.likeSong=a.playlist[0],e.userPlayList=a.playlist.splice(1);case 6:case"end":return t.stop()}}),t)})))()},toPlayListDetail:function(e){this.$router.push({name:"PlayListDetail",query:{id:e}})},getScroll:function(e){e.target.scrollTop>50&&!this.isTop?this.isTop=!0:e.target.scrollTop<50&&(this.isTop=!1)},getLevel:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/user/level?date=".concat(Date.now()));case 2:n=t.sent,a=n.data,e.level=a.data.level;case 5:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){console.log("销毁")}},activated:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$refs.hhh.scrollTop=e.scroll,0!==Object.keys(e.userInfo).length){t.next=6;break}return t.next=4,e.getUserInfo();case 4:e.getLevel(),e.getUserPlayList();case 6:case"end":return t.stop()}}),t)})))()},deactivated:function(){},beforeRouteLeave:function(e,t,n){console.log(),this.scroll=this.$refs.hhh.scrollTop,n()}},o=c,l=(n("2c0b"),n("2877")),u=Object(l["a"])(o,a,r,!1,null,"7b739904",null);t["default"]=u.exports},fce3:function(e,t,n){var a=n("d039"),r=n("da84"),s=r.RegExp;e.exports=a((function(){var e=s(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-e4c59e1e.b2a566b8.js.map