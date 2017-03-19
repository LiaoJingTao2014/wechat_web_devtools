'use strict';var _exports;function init(){function a(s){let u=s?new Date(s):new Date;return`${u.toLocaleDateString()} ${u.toLocaleTimeString()}`}const c=require('../../lib/react.js'),d=require('../../cssStr/cssStr.js');require('../../utils/tools.js');const f=require('../../weapp/commit/upload.js'),g=require('../../actions/projectActions.js'),h=require('../../common/log/log.js'),i=require('../../utils/newReport.js');require('../../stores/webviewStores.js');const j=require('../../stores/windowStores.js'),k=require('../../config/errcodeConfig.js'),l=require('../../actions/windowActions.js'),m=require('../../stores/projectStores.js');require('../../weapp/utils/projectManager.js');const n=require('./uploadInfo.js'),o=require('./detailConfig.js'),p=function(s){l.showTipsMsg({msg:s,type:'error'})},q=function(s,u=()=>{}){l.showConfirm({content:s,callback:u})},r=c.createClass({displayName:'Detail',getInitialState:function(){let s=this.props.project,u=s.isTourist,v=localStorage[`last-up-test-time-${s.hash}`],w=localStorage[`last-up-load-time-${s.hash}`],x=!1;return 604800000>Date.now()-s.newFeature.time&&(x=s.newFeature.show),global.appConfig.isBeta&&(x=!0),s.uploadPath.query||'',s.uploadPath.page||'',{lastUploadTime:u?'\u9879\u76EE\u672A\u5173\u8054AppID':w?w:'\u672A\u4E0A\u4F20',lastTestTime:u?'\u9879\u76EE\u672A\u5173\u8054AppID':v?v:'\u672A\u63D0\u4EA4',testBtnClass:'detail-meta-upload',testBtnTitle:'\u9884\u89C8',tabIndex:0,qrcode_img:'',isTourist:u,es6:s.es6,minified:s.minified,watcher:s.watcher,postcss:s.postcss,urlCheck:s.urlCheck,newFeatureCheck:s.newFeature.check,showNewFeatureCheck:x,showCustomButton:!1}},componentDidMount:function(){j.on('TOGGLE_NEW_FEACHE_CHECK_SHOW_STATUS',this._onToggleNewFeatureCheck)},componentWillUnmount:function(){j.removeListener('TOGGLE_NEW_FEACHE_CHECK_SHOW_STATUS',this._onToggleNewFeatureCheck)},_onToggleNewFeatureCheck:function(s){this.setState({showNewFeatureCheck:s}),m.setProjectNewFeature(this.props.project.hash,{check:this.state.newFeatureCheck,show:s,time:Date.now()}),s&&this.props.optProject('detail')},closeImg:function(){this.setState({qrcode_img:''})},upload:function(){let s=this.props.project,u=s.isTourist;u||this.refs.uploadWnd.startUpload()},openProject:function(s){nw.Shell.openItem(s)},delProject:function(){q(`确认删除 ${decodeURIComponent(this.props.project.appname)} ?`,s=>{if(s){let u=this.props.project.appid;g.del(this.props.project.projectid),delete localStorage[`last-up-test-time-${this.props.project.hash}`],delete localStorage[`last-up-load-time-${this.props.project.hash}`],i(`project_delete`,u)}})},uploadForTest:function(s,u){let v=this.props.project,w=v.isTourist;if(!w&&!this.lock){let D,E;u&&(D=u.page||'',E=u.query,m.setProjectUploadPath(this.props.project.hash,{enable:!0,query:E,page:D})),this.setState({testBtnClass:'detail-upload-dialog-button-primary detail-upload-dialog-button-primary-loading',testBtnTitle:'\u4E0A\u4F20\u4E2D',page:D,query:E,showCustomLayer:!1}),this.lock=!0,setTimeout(()=>{f.uploadForTest(this.props.project,{isNewFeature:this.state.showNewFeatureCheck&&this.state.newFeatureCheck,page:D,query:E},(F,G,H,I)=>{this.getResp({error:F,resp:G,res:H,options:I,type:'test'})})},1000/60)}},customPreview:function(){this.setState({showCustomButton:!this.state.showCustomButton})},showCustomPreview:function(){this.setState({showCustomButton:!1}),l.showCustomPreview({project:this.props.project,type:'upload',callback:s=>{this.uploadForTest('',{page:s.page,query:s.query})}})},getResp:function(s){this.lock=!1;let{error:u,resp:v,res:w,type:x,options:y}=s,z={testBtnClass:'detail-meta-upload',testBtnTitle:'\u9884\u89C8'};if(!u){try{w=JSON.parse(w)}catch(E){return p(`系统错误，上传回包：${w}`),void this.setState(z)}let A=w.baseresponse,B=A?parseInt(A.errcode):0,C=parseInt(w.wxpkg_size/1024);if(B===k.DEV_App_Not_Band)return q('\u5F53\u524D\u5F00\u53D1\u8005\u672A\u7ED1\u5B9A\u6B64 appid \uFF0C\u8BF7\u5230 mp \u540E\u53F0\u64CD\u4F5C\u540E\u91CD\u8BD5'),nw.Shell.openExternal('https://mp.weixin.qq.com/'),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_Need_Admin)return q('\u9700\u8981\u7BA1\u7406\u5458\u624D\u80FD\u8FDB\u884C\u4E0A\u4F20\u64CD\u4F5C\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5'),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_Need_SCAN_CODE)return q('\u8BF7\u91CD\u65B0\u626B\u7801\u786E\u8BA4'),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_EMPTY_SOURCE)return q('\u4EE3\u7801\u5305\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5'),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_WXPKG_MAX_LIMIT)return q(`编译包大小为 ${C} kb，超过限制 ${C-y.MAX_APP_LENGTH} kb，请删除文件后重试`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_INVALID_WXPKG)return q(`代码包错误，错误代码 ${B}`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_WXML_FAIL)return q(`wxml 编译错误，错误信息：${w.compile_err_msg}`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_WXSS_FAIL)return q(`wxss 编译错误，错误信息：${w.compile_err_msg}`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_INVALID_JSON_FILE)return q(`json 编译错误，错误信息：${w.compile_err_msg}`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_COMPILE_LACK_OF_FILE)return q(`缺少文件，错误信息：${w.compile_err_msg}`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);if(B===k.DEV_Need_Update)return q(`工具版本过旧，请升级工具后重试`),h.error(`details.js uploadForTest error ${B}`),void this.setState(z);let D=a();if(C&&(D=`${D}, 编译包大小 ${C} kb`),0===B){z.qrcode_img=w.qrcode_img;let E=+new Date+1500000,F=new Date(E);z.qrcode_time=F,'test'===x?(z.lastTestTime=D,localStorage.setItem(`last-up-test-time-${this.props.project.hash}`,D)):(z.lastUploadTime=D,localStorage.setItem(`last-up-load-time-${this.props.project.hash}`,D)),z.showDailog=!1,this.setState(z)}else q(`系统错误，错误代码：${B},错误信息：${A.errmsg}`,()=>{this.setState(z)})}else{let A='string'==typeof u?u:JSON.stringify(u);q(A||`提交预览出错，请去调试窗口编译代码，查看详细错误信息`,()=>{this.setState(z)})}},onEs6Change:function(){let s=!this.state.es6;m.setProjectEs6(this.props.project.hash,s),this.setState({es6:s})},onPostCss:function(){let s=!this.state.postcss;m.setProjectPostCss(this.props.project.hash,s),this.setState({postcss:s})},onMinified:function(){let s=!this.state.minified;m.setProjectMinified(this.props.project.hash,s),this.setState({minified:s})},onAutoWatcher:function(){let s=!this.state.watcher;m.setProjectWatcher(this.props.project.hash,s),this.setState({watcher:s})},onUrlCheck:function(){let s=!this.state.urlCheck;m.setProjectUrlCheck(this.props.project.hash,s),this.setState({urlCheck:s})},onNewFeatureCheck:function(){let s=!this.state.newFeatureCheck;m.setProjectNewFeature(this.props.project.hash,{check:s?1:0,show:this.state.showNewFeatureCheck,time:Date.now()}),this.setState({newFeatureCheck:s})},changeTab:function(s){this.setState({tabIndex:s})},openNewFeatureDetails:function(s){nw.Window.open('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/beta.html',{width:799,height:799},()=>{}),s.preventDefault(),s.stopPropagation()},render:function(){const{show:s,project:u}=this.props;let v=this.state.isTourist,w='detail'===s?{}:d.displayNone,x=u.app_head_img||'../images/logo.png',y=u?decodeURIComponent(u.appname):'',z=u?u.appid:'',A=u?u.projectpath:'',B='',C=d.displayNone,D='';if(this.state.qrcode_img){B=c.createElement('img',{src:'data:image/png;base64,'+this.state.qrcode_img,style:{width:'200px',heigth:'200px',marginBottom:'20px'}}),C={};let M=j.getUserInfo();D=`请使用 ${M.nickName} 的微信扫描二维码，预览当前开发版本，二维码将在 ${this.state.qrcode_time.toTimeString().replace(/\s.*/g,'')} 时失效。`}let E=this.state.tabIndex,F=this.state.es6,G=this.state.minified,H=this.state.watcher,I=this.state.postcss,J=this.state.urlCheck,K=this.state.newFeatureCheck,L=this.state.showNewFeatureCheck;return c.createElement('div',{className:'detail',style:w},c.createElement('div',{className:'detail-logo-wrapper'},c.createElement('img',{src:x,className:'detail-logo'}),c.createElement('p',{className:'detail-name'},y),c.createElement('p',{className:'detail-appid'},'App ID: ',z)),c.createElement('div',{className:'detail-meta-tab'},c.createElement('div',{className:'detail-meta-tab-hd',style:this.props.project.isTourist?d.displayNone:{}},c.createElement('a',{href:'javascript:;',onClick:()=>{this.changeTab(0)},className:0===E?'detail-meta-tab-item-active':''},'\u57FA\u7840\u4FE1\u606F'),c.createElement('a',{href:'javascript:;',onClick:()=>{this.changeTab(1)},className:1===E?'detail-meta-tab-item-active':''},'\u914D\u7F6E\u4FE1\u606F')),c.createElement('div',{style:0===E?{}:d.displayNone},c.createElement('div',{className:'detail-meta-tab-bd'},c.createElement('div',{className:'detail-meta-wrapper'},c.createElement('div',{className:'detail-meta'},c.createElement('p',{className:'detail-meta-label'},'\u672C\u5730\u5F00\u53D1\u76EE\u5F55'),c.createElement('p',{className:'detail-meta-value'},A),c.createElement('a',{onClick:()=>{this.openProject(A)},href:'javascript:;',className:'detail-meta-upload-default'},'\u6253\u5F00')),c.createElement('div',{className:`detail-meta ${v?'detail-meta-disabled':''}`},c.createElement('p',{className:'detail-meta-label'},'\u6700\u65B0\u66F4\u65B0\u65F6\u95F4'),c.createElement('p',{className:'detail-meta-value'},this.state.lastTestTime),c.createElement('div',{className:'detail-meta-btn-group'},c.createElement('a',{onClick:this.uploadForTest,href:'javascript:;',className:`${this.state.testBtnClass}  ${v?'detail-meta-upload-disabled':''}`},this.state.testBtnTitle),c.createElement('a',{onClick:this.customPreview,href:'javascript:;',className:'detail-meta-btn-cert'},c.createElement('i',{className:'icon-arrow-down'})),c.createElement('div',{onClick:this.showCustomPreview,style:this.state.showCustomButton?{}:d.displayNone,className:'detail-meta-btn-dropdown'},c.createElement('a',{href:'javascript:;',className:'detail-meta-btn-dropdown-item'},'\u81EA\u5B9A\u4E49\u9884\u89C8')))),c.createElement('div',{className:`detail-meta ${v?'detail-meta-disabled':''}`},c.createElement('p',{className:'detail-meta-label'},'\u6700\u8FD1\u4E0A\u4F20\u65F6\u95F4'),c.createElement('p',{className:'detail-meta-value'},this.state.lastUploadTime),c.createElement('a',{onClick:this.upload,href:'javascript:;',className:`detail-meta-upload-default ${v?'detail-meta-upload-default-disabled':''}`},'\u4E0A\u4F20')),c.createElement('div',{className:'detail-meta detail-meta-column'},c.createElement('label',{htmlFor:'es6toes5',onClick:this.onEs6Change,className:'detail-meta-es6toes5'},c.createElement('input',{type:'checkbox',checked:F}),c.createElement('i',null),'\u5F00\u542F ES6 \u8F6C ES5'),c.createElement('label',{htmlFor:'postcss',onClick:this.onPostCss,className:'detail-meta-es6toes5'},c.createElement('input',{type:'checkbox',checked:I}),c.createElement('i',null),'\u5F00\u542F \u4E0A\u4F20\u4EE3\u7801\u65F6\u6837\u5F0F\u6587\u4EF6\u81EA\u52A8\u8865\u5168'),c.createElement('label',{htmlFor:'minified',onClick:this.onMinified,className:'detail-meta-es6toes5'},c.createElement('input',{type:'checkbox',checked:G}),c.createElement('i',null),'\u5F00\u542F \u4EE3\u7801\u538B\u7F29\u4E0A\u4F20'),c.createElement('label',{htmlFor:'watcher',onClick:this.onAutoWatcher,className:'detail-meta-es6toes5'},c.createElement('input',{type:'checkbox',checked:H}),c.createElement('i',null),'\u76D1\u542C\u6587\u4EF6\u53D8\u5316\uFF0C\u81EA\u52A8\u5237\u65B0\u5F00\u53D1\u8005\u5DE5\u5177'),c.createElement('label',{htmlFor:'urlCheck',onClick:this.onUrlCheck,className:'detail-meta-es6toes5'},c.createElement('input',{type:'checkbox',checked:!J}),c.createElement('i',null),'\u5F00\u53D1\u73AF\u5883\u4E0D\u6821\u9A8C\u8BF7\u6C42\u57DF\u540D\u4EE5\u53CA TLS \u7248\u672C'),c.createElement('label',{htmlFor:'urlCheck',onClick:this.onNewFeatureCheck,className:'detail-meta-es6toes5',style:L?{}:d.displayNone},c.createElement('input',{type:'checkbox',checked:K}),c.createElement('i',null),'\u4F7F\u7528\u6D4B\u8BD5\u670D\u52A1\u5668\u8FDB\u884C\u9884\u89C8 ',c.createElement('a',{onClick:this.openNewFeatureDetails,href:'$'},'\u8BE6\u60C5'))))),c.createElement('div',{className:'detail-opr-wrapper'},c.createElement('a',{onClick:this.delProject,href:'javascript:;',className:'button'},'\u5220\u9664\u9879\u76EE'))),c.createElement(o,{show:1===E,project:this.props.project})),c.createElement(n,{ref:'uploadWnd',getResp:this.getResp,isTourist:v,project:this.props.project}),c.createElement('div',{className:'setting-show',style:C},c.createElement('div',{className:'setting-hd'},c.createElement('h3',{className:'setting-hd-title'},'\u9884\u89C8')),c.createElement('div',{className:'setting-bd'},B,c.createElement('p',null,D)),c.createElement('div',{className:'setting-ft'},c.createElement('a',{href:'javascript:;',onClick:this.closeImg,className:'setting-button-default'},'\u786E\u5B9A'))))}});_exports=r}init(),module.exports=_exports;