(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f39668e0"],{"08fa":function(t,s,n){"use strict";n.d(s,"a",(function(){return e}));n("b0c0"),n("ac1f"),n("5319");var i=n("5d2d"),e={methods:{changeMusic:function(t,s){t!==this.musicId&&(Object(i["c"])("musicIndex",s),Object(i["c"])("musicId",t),this.$store.commit("CHANGEMUSICID",t),this.$store.commit("CHANGEMUSICINDEX",s),this.isMusicPlay&&this.$store.commit("ISMUSICPLAY",!this.isMusicPlay),this.$bus.$emit("getSongPlayUrl",t),"PlayMusic"===this.$route.name&&this.$router.replace({name:"PlayMusic",params:{id:t,i:s}}))}}}},"0cb2":function(t,s,n){var i=n("7b0b"),e=Math.floor,a="".replace,c=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,o=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,s,n,r,l,u){var d=n+t.length,f=r.length,h=o;return void 0!==l&&(l=i(l),h=c),a.call(u,h,(function(i,a){var c;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return s.slice(0,n);case"'":return s.slice(d);case"<":c=l[a.slice(1,-1)];break;default:var o=+a;if(0===o)return i;if(o>f){var u=e(o/10);return 0===u?i:u<=f?void 0===r[u-1]?a.charAt(1):r[u-1]+a.charAt(1):i}c=r[o-1]}return void 0===c?"":c}))}},"107c":function(t,s,n){var i=n("d039"),e=n("da84"),a=e.RegExp;t.exports=i((function(){var t=a("(?<a>b)","g");return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")}))},"14c3":function(t,s,n){var i=n("825a"),e=n("1626"),a=n("c6b6"),c=n("9263");t.exports=function(t,s){var n=t.exec;if(e(n)){var o=n.call(t,s);return null!==o&&i(o),o}if("RegExp"===a(t))return c.call(t,s);throw TypeError("RegExp#exec called on incompatible receiver")}},5319:function(t,s,n){"use strict";var i=n("d784"),e=n("d039"),a=n("825a"),c=n("1626"),o=n("a691"),r=n("50c4"),l=n("577e"),u=n("1d80"),d=n("8aa5"),f=n("dc4a"),h=n("0cb2"),g=n("14c3"),p=n("b622"),m=p("replace"),v=Math.max,b=Math.min,x=function(t){return void 0===t?t:String(t)},y=function(){return"$0"==="a".replace(/./,"$0")}(),I=function(){return!!/./[m]&&""===/./[m]("a","$0")}(),$=!e((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}));i("replace",(function(t,s,n){var i=I?"$":"$0";return[function(t,n){var i=u(this),e=void 0==t?void 0:f(t,m);return e?e.call(t,i,n):s.call(l(i),t,n)},function(t,e){var u=a(this),f=l(t);if("string"===typeof e&&-1===e.indexOf(i)&&-1===e.indexOf("$<")){var p=n(s,u,f,e);if(p.done)return p.value}var m=c(e);m||(e=l(e));var y=u.global;if(y){var I=u.unicode;u.lastIndex=0}var $=[];while(1){var M=g(u,f);if(null===M)break;if($.push(M),!y)break;var S=l(M[0]);""===S&&(u.lastIndex=d(f,r(u.lastIndex),I))}for(var C="",L=0,P=0;P<$.length;P++){M=$[P];for(var w=l(M[0]),O=v(b(o(M.index),f.length),0),E=[],_=1;_<M.length;_++)E.push(x(M[_]));var k=M.groups;if(m){var j=[w].concat(E,O,f);void 0!==k&&j.push(k);var A=l(e.apply(void 0,j))}else A=h(w,f,O,E,k,e);O>=L&&(C+=f.slice(L,O)+A,L=O+w.length)}return C+f.slice(L)}]}),!$||!y||I)},"53a9":function(t,s,n){"use strict";var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"play-song-list"},[n("h4",[t._v("当前播放"),n("span",{staticClass:"song-list-length"},[t._v("("+t._s(t.songList.length)+")")])]),n("van-row",{attrs:{type:"flex",justify:"space-between"}},[n("van-col",{attrs:{span:"6"}},[n("van-icon",{attrs:{name:"add-o",size:"0.426rem"}}),t._v(" 收藏全部 ")],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{name:"delete-o",size:"0.426rem"},on:{click:t.emptyMusic}})],1)],1),n("van-list",t._l(t.songList,(function(s,i){return 0!==t.songList.length?n("div",{key:s.id,staticClass:"song-list",on:{click:function(n){return t.changeMusic(s.id,i)}}},[n("div",{staticClass:"title van-ellipsis",class:t.id===s.id?"active":""},[n("span",{staticClass:"custom-title"},[t._v(t._s(s.name))]),n("span",{staticClass:"custom-author"},[t._v(" - "+t._s(s.ar[0].name))])]),n("div",{staticClass:"right-icon",on:{click:function(n){return n.stopPropagation(),t.deleteSong(s.id,i)}}},[n("van-icon",{attrs:{name:"cross",size:"0.373rem"}})],1)]):t._e()})),0)],1)},e=[],a=n("5530"),c=n("2f62"),o=n("08fa"),r={name:"PlaySongList",mixins:[o["a"]],props:{songList:{require:!0}},computed:Object(a["a"])({},Object(c["b"])(["musicId","musicIndex"])),data:function(){return{id:0}},watch:{musicId:function(t){this.id=t}},created:function(){this.id=this.musicId},methods:{deleteSong:function(t,s){this.$bus.$emit("deleteMusic",t,s)},emptyMusic:function(){this.$bus.$emit("emptyMusic"),this.$bus.$emit("emptyMusic2")}}},l=r,u=(n("fa99"),n("2877")),d=Object(u["a"])(l,i,e,!1,null,"1617a197",null);s["a"]=d.exports},"8aa5":function(t,s,n){"use strict";var i=n("6547").charAt;t.exports=function(t,s,n){return s+(n?i(t,s).length:1)}},9263:function(t,s,n){"use strict";var i=n("577e"),e=n("ad6d"),a=n("9f7f"),c=n("5692"),o=n("7c73"),r=n("69f3").get,l=n("fce3"),u=n("107c"),d=RegExp.prototype.exec,f=c("native-string-replace",String.prototype.replace),h=d,g=function(){var t=/a/,s=/b*/g;return d.call(t,"a"),d.call(s,"a"),0!==t.lastIndex||0!==s.lastIndex}(),p=a.UNSUPPORTED_Y||a.BROKEN_CARET,m=void 0!==/()??/.exec("")[1],v=g||m||p||l||u;v&&(h=function(t){var s,n,a,c,l,u,v,b=this,x=r(b),y=i(t),I=x.raw;if(I)return I.lastIndex=b.lastIndex,s=h.call(I,y),b.lastIndex=I.lastIndex,s;var $=x.groups,M=p&&b.sticky,S=e.call(b),C=b.source,L=0,P=y;if(M&&(S=S.replace("y",""),-1===S.indexOf("g")&&(S+="g"),P=y.slice(b.lastIndex),b.lastIndex>0&&(!b.multiline||b.multiline&&"\n"!==y.charAt(b.lastIndex-1))&&(C="(?: "+C+")",P=" "+P,L++),n=new RegExp("^(?:"+C+")",S)),m&&(n=new RegExp("^"+C+"$(?!\\s)",S)),g&&(a=b.lastIndex),c=d.call(M?n:b,P),M?c?(c.input=c.input.slice(L),c[0]=c[0].slice(L),c.index=b.lastIndex,b.lastIndex+=c[0].length):b.lastIndex=0:g&&c&&(b.lastIndex=b.global?c.index+c[0].length:a),m&&c&&c.length>1&&f.call(c[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(c[l]=void 0)})),c&&$)for(c.groups=u=o(null),l=0;l<$.length;l++)v=$[l],u[v[0]]=c[v[1]];return c}),t.exports=h},"9f7f":function(t,s,n){var i=n("d039"),e=n("da84"),a=e.RegExp;s.UNSUPPORTED_Y=i((function(){var t=a("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),s.BROKEN_CARET=i((function(){var t=a("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a7cb:function(t,s,n){},ab74:function(t,s,n){},ac1f:function(t,s,n){"use strict";var i=n("23e7"),e=n("9263");i({target:"RegExp",proto:!0,forced:/./.exec!==e},{exec:e})},b0c0:function(t,s,n){var i=n("83ab"),e=n("5e77").EXISTS,a=n("9bf2").f,c=Function.prototype,o=c.toString,r=/^\s*function ([^ (]*)/,l="name";i&&!e&&a(c,l,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(t){return""}}})},cc02:function(t,s,n){"use strict";n.r(s);var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return 0!==Object.keys(t.song).length?n("div",{staticClass:"play-music"},[n("van-image",{staticClass:"backImg",attrs:{src:t.song.al.picUrl}}),n("div",{staticClass:"top-bar"},[n("van-icon",{attrs:{name:"arrow-left",size:"0.54rem",color:"#ffffff"},on:{click:t.returnPre}}),n("div",{staticClass:"song-info"},[n("span",{staticClass:"song-name van-ellipsis"},[t._v(t._s(t.song.name))]),n("span",{staticClass:"song-author van-ellipsis"},[t._v(t._s(t.song.ar[0].name))])]),n("van-icon",{attrs:{size:"0.54rem",color:"#ffffff",name:"share"}})],1),n("div",{staticClass:"songImg-wrap"},[n("van-image",{staticClass:"songImg",class:t.isMusicPlay?"recordAnimation":"recordAnimationPause",attrs:{width:"7rem",height:"7rem",round:"",src:t.song.al.picUrl}})],1),n("div",{staticClass:"control"},[n("van-row",{attrs:{type:"flex"}},[n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{name:"like-o",size:"0.70rem"}})],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{name:"down",size:"0.68rem"}})],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{name:"music-o",size:"0.72rem"}})],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{name:"chat-o",size:"0.72rem"}})],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{name:"weapp-nav",size:"0.70rem"}})],1)],1),n("div",{staticClass:"progressBar"},[n("div",{staticClass:"currentTime"},[t._v(t._s(t._f("playTime")(t.currentTime)))]),n("van-slider",{staticClass:"progress",attrs:{value:t.curWidth,"bar-height":"1px","active-color":"#FFFFFF","inactive-color":"#A5A5A5"},on:{change:t.onChangeSlider},scopedSlots:t._u([{key:"button",fn:function(){return[n("div",{staticClass:"custom-button"})]},proxy:!0}],null,!1,2603049259)}),n("div",{staticClass:"duration"},[t._v(t._s(t._f("playTime")(t.duration)))])],1),n("van-row",{attrs:{type:"flex"}},[n("van-col",{attrs:{span:"2"}},[n("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":t.playType,size:"0.70rem"},on:{click:t.changePlayType}})],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{"class-prefix":"iconfont icon-pre",name:"down",size:"0.68rem"},on:{click:function(s){return t.onMusicChange("pre")}}})],1),n("van-col",{attrs:{span:"4"}},[n("van-icon",{attrs:{name:t.isMusicPlay?"pause-circle-o":"play-circle-o",size:"1.5rem"},on:{click:t.changePlayState}})],1),n("van-col",{attrs:{span:"2"}},[n("van-icon",{attrs:{"class-prefix":"iconfont icon-next",size:"0.68rem"},on:{click:function(s){return t.onMusicChange("next")}}})],1),n("van-col",{attrs:{span:"2"},on:{click:function(s){t.songListShow=!t.songListShow}}},[n("van-icon",{attrs:{"class-prefix":"iconfont icon-playlist",size:"0.70rem"}})],1)],1),n("van-popup",{style:{height:"55%",width:"90%",margin:"0 5%"},attrs:{round:"",position:"bottom","safe-area-inset-bottom":""},model:{value:t.songListShow,callback:function(s){t.songListShow=s},expression:"songListShow"}},[n("play-song-list",{attrs:{"song-list":t.songList}})],1)],1)],1):t._e()},e=[],a=n("1da1"),c=n("5530"),o=(n("96cf"),n("a434"),n("ac1f"),n("5319"),n("b0c0"),n("159b"),n("5d2d")),r=n("2f62"),l=n("53a9"),u=n("08fa"),d={name:"playMusic",props:{id:{require:!0}},mixins:[u["a"]],data:function(){return{song:{},songListShow:!1,songList:[]}},components:{PlaySongList:l["a"]},computed:Object(c["a"])({},Object(r["b"])(["musicIndex","musicId","isMusicPlay","playType","duration","currentTime","curWidth"])),methods:{onChangeSlider:function(t){this.$emit("onChangeSlider",t)},returnPre:function(){this.$router.back()},deleteMusic:function(t,s){if(this.songList.splice(s,1),Object(o["c"])("songList",this.songList),0===this.songList.length)return this.songListShow=!1,Object(o["b"])("songList"),this.$bus.$emit("removeSongList"),void this.$router.back();t===this.musicId&&this.changeMusic(this.songList[s].id,s)},emptyMusic:function(){var t=this;this.$dialog.confirm({message:"确定清空播放列表?"}).then((function(){t.songListShow=!1,t.songList.splice(0,t.songList.length),Object(o["b"])("songList"),t.$bus.$emit("removeSongList"),t.$router.back()})).catch((function(){t.$toast({message:"已取消",position:"top"})}))},changePlayState:function(){this.$store.commit("ISMUSICPLAY",!this.isMusicPlay),this.$bus.$emit("changePlayState",this.isMusicPlay)},onMusicChange:function(t){var s,n=Object(o["a"])("songList");"icon-random"===Object(o["a"])("playType")?(s=Math.floor(Math.random()*n.length),s===this.musicIndex&&s++):s="pre"===t?this.musicIndex-1:this.musicIndex+1,s<0?s=n.length-1:s>n.length-1&&(s=0);var i=n[s].id;Object(o["c"])("musicIndex",s),Object(o["c"])("musicId",i),this.$store.commit("CHANGEMUSICINDEX",s),this.isMusicPlay&&this.$store.commit("ISMUSICPLAY",!this.isMusicPlay),this.$router.replace({name:"PlayMusic",params:{id:i}})},changePlayType:function(){this.$store.commit("CHANGEPLAYTYPE")},getSongInfo:function(t){var s=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var i,e;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,s.$axios("/song/detail?ids=".concat(t));case 2:i=n.sent,e=i.data,s.song=e.songs[0],Object(o["c"])("musicIndex",0),Object(o["c"])("musicId",t);case 7:case"end":return n.stop()}}),n)})))()}},watch:{musicIndex:function(t){this.song=Object(o["a"])("songList")[t]},$route:function(t,s){"PlayMusic"===t.name&&(this.song=Object(o["a"])("songList")[this.musicIndex],t.params.id!==this.musicId&&(this.$store.commit("CHANGEMUSICID",t.params.id),console.log(t.params.id,this.musicId),console.log("3"),this.$bus.$emit("getSongPlayUrl",t.params.id)))}},created:function(){var t=this;this.songList=Object(o["a"])("songList"),this.$store.commit("CHANGEMUSICID",this.id);var s=-1;return null===this.songList?(console.log("????"),this.getSongInfo(this.id)):(this.songList.forEach((function(n,i){n.id===t.id&&(s=i)})),-1===s?(console.log("????"),this.getSongInfo(this.id)):(this.song=this.songList[s],Object(o["c"])("musicId",this.id),void(this.isMusicPlay&&this.id===this.musicId||(console.log("4"),this.$bus.$emit("getSongPlayUrl",this.id)))))},mounted:function(){console.log("5")},activated:function(){this.$bus.$on("deleteMusic",this.deleteMusic),this.$bus.$on("emptyMusic2",this.emptyMusic),0===this.songList.length&&(this.songList=Object(o["a"])("songList"))},deactivated:function(){this.$bus.$off("deleteMusic",this.deleteMusic),this.$bus.$off("emptyMusic2",this.emptyMusic)}},f=d,h=(n("d563"),n("2877")),g=Object(h["a"])(f,i,e,!1,null,"6ab22a41",null);s["default"]=g.exports},d563:function(t,s,n){"use strict";n("ab74")},d784:function(t,s,n){"use strict";n("ac1f");var i=n("6eeb"),e=n("9263"),a=n("d039"),c=n("b622"),o=n("9112"),r=c("species"),l=RegExp.prototype;t.exports=function(t,s,n,u){var d=c(t),f=!a((function(){var s={};return s[d]=function(){return 7},7!=""[t](s)})),h=f&&!a((function(){var s=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[r]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return s=!0,null},n[d](""),!s}));if(!f||!h||n){var g=/./[d],p=s(d,""[t],(function(t,s,n,i,a){var c=s.exec;return c===e||c===l.exec?f&&!a?{done:!0,value:g.call(s,n,i)}:{done:!0,value:t.call(n,s,i)}:{done:!1}}));i(String.prototype,t,p[0]),i(l,d,p[1])}u&&o(l[d],"sham",!0)}},fa99:function(t,s,n){"use strict";n("a7cb")},fce3:function(t,s,n){var i=n("d039"),e=n("da84"),a=e.RegExp;t.exports=i((function(){var t=a(".","s");return!(t.dotAll&&t.exec("\n")&&"s"===t.flags)}))}}]);
//# sourceMappingURL=chunk-f39668e0.4910a81e.js.map