(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-163cfc48"],{"0f2d":function(a,s,t){"use strict";t("6a68")},"405a":function(a,s,t){a.exports=t.p+"img/2.8f10618d.jpg"},"6a68":function(a,s,t){},ca34:function(a,s,t){"use strict";t.r(s);var n=function(){var a=this,s=a.$createElement,n=a._self._c||s;return n("div",{staticClass:"daily-recommend"},[n("header",{staticClass:"header"},[n("van-icon",{staticClass:"return-left",attrs:{color:"#fff",name:"arrow-left",size:"0.533rem"},on:{click:function(s){return a.$router.replace({name:"Home"})}}}),n("van-image",{attrs:{width:"10rem",height:"6.667rem",src:t("405a"),alt:"Error"}}),n("div",{staticClass:"time"},[n("div",{staticClass:"time-wrap"},[n("span",{staticClass:"today"},[a._v(a._s(a._f("Today")(Date.now()))+" ")]),n("span",{staticClass:"month"},[a._v(" / "+a._s(a._f("Month")(Date.now())))])]),n("span",{staticClass:"luck"},[a._v(" 查看今日运势 "),n("van-icon",{attrs:{name:"arrow",size:"0.312rem"}})],1)]),n("van-button",{staticClass:"pastRCMD",attrs:{round:"",size:"mini"}},[a._v(" 历史日推 "),n("van-icon",{attrs:{name:"arrow",size:"0.312rem"}})],1)],1),n("van-sticky",[n("div",{staticClass:"title"},[n("van-icon",{staticClass:"play-icon",attrs:{name:"play-circle",color:"#E34D3B",size:"0.533rem"}}),n("span",{staticClass:"text"},[a._v("播放全部")]),n("van-icon",{attrs:{name:"passed",size:"0.533rem"}})],1)]),n("van-list",{ref:"scrollTop",attrs:{finished:a.finished,"finished-text":"没有更多了"},on:{load:a.onLoad}},a._l(a.dailySongs,(function(s,t){return n("div",{key:s.id,staticClass:"song-item",on:{click:function(n){return a.playMusic(s.id,t)}}},[n("van-image",{attrs:{width:"1.333rem",height:"1.333rem",src:s.al.picUrl}}),n("div",{staticClass:"song-info"},[n("div",{staticClass:"song-name van-ellipsis"},[n("span",[a._v(a._s(s.name)+"  ")]),0!==s.alia.length?n("span",{staticClass:"alias"},[a._v("( "+a._s(s.alia[0])+" )")]):a._e()]),n("div",{staticClass:"author van-ellipsis"},[s.RcmdReasons?n("span",{staticClass:"reasons"},[a._v(a._s(s.RcmdReasons))]):a._e(),a._v(" "+a._s(s.ar[0].name)+" - "+a._s(s.al.name)+" ")])]),n("van-icon",{staticClass:"iconfont icon-youcecaidan",attrs:{size:"0.533rem"}})],1)})),0),n("playControlPanel")],1)},e=[],i=t("1da1"),o=(t("96cf"),t("159b"),t("d2e4")),r=t("5d2d"),c={name:"songrcmd",components:{playControlPanel:o["a"]},data:function(){return{finished:!1,dailySongs:[],show:!1,scrollTop:0,ids:[]}},created:function(){this.getDailyRCMD()},methods:{playMusic:function(a,s){this.$store.commit("CHANGEMUSICINDEX",s),Object(r["c"])("songList",this.dailySongs),this.$router.push({name:"PlayMusic",params:{id:a}})},onLoad:function(){this.finished=!0},getDailyRCMD:function(){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var t,n,e,i,o;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,a.$axios("/recommend/songs");case 2:t=s.sent,n=t.data,e=n.data,i=e.dailySongs,o=e.recommendReasons,i.forEach((function(a){o.forEach((function(s){a.id===s.songId&&(a.RcmdReasons=s.reason)}))})),a.dailySongs=i;case 7:case"end":return s.stop()}}),s)})))()}}},l=c,d=(t("0f2d"),t("2877")),m=Object(d["a"])(l,n,e,!1,null,"23c64b2d",null);s["default"]=m.exports}}]);
//# sourceMappingURL=chunk-163cfc48.fd3c6e3c.js.map