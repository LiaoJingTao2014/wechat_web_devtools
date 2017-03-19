'use strict';var _exports;function init(){const a=require('../lib/react.js'),b=require('../actions/windowActions.js'),c=require('../stores/windowStores.js'),d=require('../stores/webviewStores.js'),e=require('../stores/projectStores.js');require('../actions/projectActions.js');const f=require('../common/log/log.js'),g=require('./setting/setting.js'),h=require('./lunch/lunch.js'),i=require('./Create/create.js'),j=require('./confirm/confirm.js'),k=require('./toast/toast.js'),l=require('./main.js'),m=require('./custompre/custompreview.js'),n=require('../utils/newReport.js'),{SELECT_URL_TYPE:o,SELECT_UNKNOW_TYPE:p}=require('../config/config.js'),q=function(z){b.showTipsMsg({msg:z,type:'error'})},r=global.Win;let s,t,u,v;const w=a.createClass({displayName:'ContainController',getInitialState:function(){let z=!!Object.keys(c.getUserInfo()).length,A=e.getLastSelect(),B='';A!==o&&A!==p&&(B=A);let C=c.getLastWinStatus()||{};return{hasLogin:z,commonUrl:A===o,project:B,type:A,showSetting:!1,lastWinStatus:C}},componentDidMount:function(){this.state.hasLogin&&(this.state.project||this.state.commonUrl)&&this.appToMax(),c.on('UPDATA_USER_INFO',this._upDataUserInfo),d.on('NOT_LOGIN',this.goToLogin),d.on('INVALID_LOGIN',this.goToLogin),e.on('CLOSE_PROJECT',this._closeProject),e.on('DEL_PROJECT',this._delProject),c.on('SHOW_SETTING',this._showSetting),r.on('maximize',this._maximize),r.on('restore',this._restore),r.on('enter-fullscreen',this._enterFullscreen),r.on('resize',this._resize),r.on('move',this._move)},componentWillUnmount:function(){c.removeListener('UPDATA_USER_INFO',this._upDataUserInfo),d.removeListener('NOT_LOGIN',this.goToLogin),d.removeListener('INVALID_LOGIN',this.goToLogin),e.removeListener('CLOSE_PROJECT',this._closeProject),e.removeListener('DEL_PROJECT',this._delProject),c.removeListener('SHOW_SETTING',this._showSetting),r.removeListener('maximize',this._maximize),r.removeListener('restore',this._restore),r.removeListener('enter-fullscreen',this._enterFullscreen),r.removeListener('resize',this._resize),r.removeListener('move',this._move)},setLastWinStatus:function(z){this.setState({lastWinStatus:z}),c.setLastWinStatus(z)},restore:function(z){let A=r.isFullscreen;clearTimeout(u),clearTimeout(v);let B=()=>{if(r.removeListener('move',this._move),r.removeListener('resize',this._resize),r.removeListener('restore',this._restore),'init'===z)r.resizeTo(nw.App.manifest.window.width,nw.App.manifest.window.height),setTimeout(()=>{r.setPosition('center'),setTimeout(()=>{r.on('resize',this._resize),r.on('move',this._move),r.on('restore',this._restore)},300)},500);else{let C=Object.assign({},this.state.lastWinStatus);C.isFullscreen=!1,C.status='restore';let D=void 0===C.x?100:C.x,E=void 0===C.y?100:C.y;D=-300>D?0:D,E=-300>E?0:E,r.moveTo(D,E);let F=void 0===C.width?nw.App.manifest.window.width:C.width,G=void 0===C.height?nw.App.manifest.window.height:C.height;r.resizeTo(F,G),this.setLastWinStatus(C),setTimeout(()=>{r.on('resize',this._resize),r.on('move',this._move),r.on('restore',this._restore)},300)}A&&r.removeListener('restore',B)};A?(r.on('restore',B),r.leaveFullscreen()):B()},_move:function(){clearTimeout(v),v=setTimeout(()=>{let z=Object.assign({},this.state.lastWinStatus);z.x=r.x,z.y=r.y,this.setLastWinStatus(z)},500)},_resize:function(){clearTimeout(u),u=setTimeout(()=>{let z=Object.assign({},this.state.lastWinStatus);z.width=r.width,z.height=r.height,this.setLastWinStatus(z)},500)},_enterFullscreen:function(){let z=Object.assign({},this.state.lastWinStatus);z.isFullscreen=!0,this.setLastWinStatus(z)},_maximize:function(){clearTimeout(u),clearTimeout(v);let z=Object.assign({},this.state.lastWinStatus);z.status='max',s=r.height,t=r.width,this.setLastWinStatus(z)},_restore:function(){let z=Object.assign({},this.state.lastWinStatus);z.status='restore',z.isFullscreen=!1,r.width===t&&r.height===s&&(z.status='max'),this.setLastWinStatus(z)},_upDataUserInfo:function(z){let A=!!Object.keys(z).length;A?(this.setState({hasLogin:!0}),(this.state.project||this.state.commonUrl)&&this.appToMax()):setTimeout(()=>{this.goToLogin()},50)},_delProject:function(){this.setState({project:'',commonUrl:''}),this.restore('init')},_closeProject:function(){d.setCurrentWebviewID(0),this.setState({project:'',commonUrl:''}),this.restore('init')},goToLogin:function(){this.setState({hasLogin:!1,commonUrl:'',project:''}),this.restore('init')},handleOnClick:function(z){b.bodyClick(z)},appQuit:function(){f.info(`ContainController.js exit`),nw.App.quit()},appToMax:function(){let z=this.state.lastWinStatus,A=z.status;z.isFullscreen?r.enterFullscreen():'max'===A||A===void 0?r.maximize():this.restore()},appMax:function(){let z=this.state.lastWinStatus,A=z.status;'max'===A?this.restore():r.maximize()},appMin:function(){global.Win.minimize()},goMain:function(z){z?e.setProjectConfig(z,A=>{return A?void q(A):void(this.setState({commonUrl:!1,project:z,type:z}),e.setProjectType(z.hash),this.appToMax())}):(this.setState({commonUrl:!0,project:'',type:o}),e.setProjectType(o),this.appToMax()),z?'project_open':'url_open',z?n('project_open',z.appid):n('url_open')},_showSetting:function(){this.setState({showSetting:!this.state.showSetting})},render:function(){let z;return z=this.state.hasLogin?this.state.commonUrl||this.state.project?a.createElement(l,{lastWinStatus:this.state.lastWinStatus,project:this.state.project,appQuit:this.appQuit,appMax:this.appMax,appMin:this.appMin}):a.createElement(i,{appQuit:this.appQuit,goMain:this.goMain,type:this.state.type}):a.createElement(h,{appQuit:this.appQuit}),a.createElement('div',{onClick:this.handleOnClick},z,a.createElement(g,{show:this.state.showSetting,showSetting:this._showSetting}),a.createElement(m,null),a.createElement(k,null),a.createElement(j,null))}});_exports=w}init(),module.exports=_exports;