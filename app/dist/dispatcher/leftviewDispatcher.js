'use strict';function init(){const a=require('../stores/leftviewStores.js');module.exports=(b,c)=>{b.register(d=>{b.waitFor([c]);let e=d.webviewID;switch(d.actionType){case'LEFTVIEW_CLICK_RIGHTHEADER':a.clickRightHeader(e);break;case'LEFTVIEW_UP_SHARESTATUS':a.upShareStatus(e,d.show);break;case'LEFTVIEW_CLICK_MASK':a.clickMask(e);break;case'LEFTVIEW_HIDEALL':a.hideAll(e);break;default:}})}}init();