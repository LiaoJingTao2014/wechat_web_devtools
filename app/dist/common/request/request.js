'use strict';var _exports;function init(){function a(r){let s={};for(let t in r)'body'!==t&&(s[t]=r[t]);return JSON.stringify(s)}function b(r){let s=r.needToken,t=r.url;-1!==s&&(t=-1===t.indexOf('?')?`${t}?newticket=${r.newticket}`:`${t}&newticket=${r.newticket}`),(0===t.indexOf(k.CGI_DOMAIN)||0===t.indexOf(k.MP_DOMAIN)||0===t.indexOf(k.OPEN_DOMAIN))&&(t=-1===t.indexOf('?')?`${t}?os=${m}&clientversion=${o}`:`${t}&os=${m}&clientversion=${o}`),r.url=t}function c(r,s,t){require('../../stores/windowStores.js').getUserInfo();let u={url:n,form:JSON.stringify({openid:r,signature:s}),method:'post',needToken:-1};f(u,(v,w,x)=>{if(!v){i.info(`request.js refreshTicket ${x}`),x=JSON.parse(x);let y=x.baseresponse,z=parseInt(y.errcode);if(0!==z)return i.error(`request.js refreshTicket errcode: ${z}`),void t({type:'NOT_LOGIN'});let A=+new Date+1000*x.ticket_expired_time,B=w.headers,C=B['debugger-newticket'];require('../../actions/windowActions.js').upTicket(C,A),t(null,C)}else i.error(`request.js refreshTicket error ${JSON.stringify(v)}`),t(v)})}function d(r,s){j.parallel([function(u){let v=h.getProxyForURL(r.url);'DIRECT'!==v&&(r.proxy='http://'+v.replace('PROXY ',''),r.tunnel=p),u(null)},function(u){let v=r.needToken;if(-1===v)return void u(null);let w=1===v,x=require('../../stores/windowStores.js').getUserInfo();if(!x&&w)return i.error(`request.js setToken get userInfo null`),void u({type:'NOT_LOGIN'});let y=x.ticketExpiredTime,z=x.signatureExpiredTime,A=+new Date;return z<A&&w?(i.error(`request.js setToken signature expired ${z} ${A}`),void u({type:'NOT_LOGIN'})):void(y<A&&w?(i.error(`request.js setToken ticket expired ${y} ${A}`),c(x.openid,x.signature,(B,C)=>{B?(i.error(`request.js refreshTicket error ${JSON.stringify(B)}`),u({type:'NOT_LOGIN'})):(r.newticket=C,u(null))})):(r.newticket=x?x.newticket:'',u(null)))}],t=>{t?s(t,r):(b(r),delete r.newticket,delete r.needToken,s(null,r))})}function f(r,s){let t=JSON.parse(JSON.stringify(r)),u=r.needToken;-1!==r.loginForc,d(r,(v,w)=>{v?(s(v),i.error(`request.js makeRequestOpt _opt: ${a(w)}  error: ${JSON.stringify(v)}`),require('../../actions/windowActions.js').clearUserInfo()):g(w,(x,y,z)=>{if(x)i.error(`request.js request  ${w.url} error ${JSON.stringify(x)}`),q[x.code]?(p=!confirm(`当前系统代理不是安全代理，是否信任？`),!p&&(w.tunnel=!1,g(w,(A,B,C)=>{s(A,B,C)}))):s(x);else{let A=y.statusCode;if(200!==A)return i.error(`request.js request ${w.url} statusCode ${A}`),void s(`网络错误 statusCode : ${A}`);if(1===u){let B;try{B=JSON.parse(z)}catch(E){return void s(E.toString())}let C=B.baseresponse||{},D=parseInt(C.errcode);if(D===l.DEV_Need_ReLogin||D===l.NOT_LOGIN||D===l.DEV_Invalid_Signature||D===l.DEV_Expired_Signature)return i.info(`request.js sendRequest get errcode ${D}`),s(D),void require('../../stores/webviewStores.js').emit('NOT_LOGIN');if(D===l.INVALID_TOKEN||D===l.INVALID_LOGIN)return require('../../stores/windowStores.js').delUserTicket(),s(D),void f(t,s)}s(x,y,z)}})})}const g=require('request'),h=require('../../utils/tools.js'),i=require('../log/log.js'),j=require('async'),k=require('../../config/urlConfig.js'),l=require('../../config/errcodeConfig.js'),m='darwin'===process.platform?'darwin':'win',n=k.refreshTicketURL,o=global.appVersion.replace(/\./g,'');var p=!0;const q={SELF_SIGNED_CERT_IN_CHAIN:!0,UNABLE_TO_VERIFY_LEAF_SIGNATURE:!0};_exports=f}init(),module.exports=_exports;