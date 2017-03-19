'use strict';var _exports;function init(){function a(I,J){let K=JSON.parse(decodeURIComponent(J)),L=K.file,M=K.msg;I.executeScript({code:`console.group("${new Date} js 文件，编译错误")
        console.error(\`${L}\n${M}\`)
      console.groupEnd()`})}function b(I,J){let K=J.target.src,L=r.parse(K),M=L.pathname.replace(/html$/,'wxml'),N=H[J.level],O=(J.message||'').replace(A,'').replace(/\"/g,'\\"');I.executeScript({code:`console.group("${new Date} ${M}")
        console.${N}("${O}")
      console.groupEnd()`})}function c(I,J){let K=JSON.parse(decodeURIComponent(J.replace(C,''))),L=K.file,M=K.msg.replace(/\`/g,'\'');I.executeScript({code:`console.group("${new Date} wxml 文件，编译错误")
        console.error(\`${L}\n${M}\`)
      console.groupEnd()`})}function d(I,J){let K=J.file,L=J.msg;I.executeScript({code:`console.group("${new Date} 读取 app.json 错误")
        console.error(\`${K}\n${L}\`)
      console.groupEnd()`})}function e(I,J){let K=J.file,L=J.msg;I.executeScript({code:`console.group("${new Date} 读取入口页面错误")
        console.error(\`${K}\n${L}\`)
      console.groupEnd()`})}function f(I,J){let K=J.file,L=J.msg;I.executeScript({code:`console.group("${new Date} parse json 错误")
        console.error(\`${K}\n${L}\`)
      console.groupEnd()`})}function g(I,J){let K=J.file,L=J.msg;I.executeScript({code:`console.group("${new Date} json 内容错误")
        console.error(\`${K}\n${L}\`)
      console.groupEnd()`})}function h(I,J){let K=J.file,L=J.msg,M=K.replace(/\.js$/,'');I.executeScript({code:`console.group("${new Date} 未找到配置在 app.json 中的 ${M} 页面")
        console.error(\`app.json\n${L}\`)
      console.groupEnd()`})}function i(I,J){I.executeScript({code:`console.group("${new Date} 当前页面未配置")
        console.error(\`${J.replace(y,'')}\`)
      console.groupEnd()`})}function j(I,J){let K=q.parseWXMLRuntimeErr(J);if(K){let N=H[J.level],O=N;'warn'===O&&(O='warning'),I.executeScript({code:`console.group("${new Date} WXML Runtime ${O}")
        console.${N}(\`${K.file}\`)
        console.${N}(\`${K.msg}\`)
      console.groupEnd()`})}}function k(I,J){let{message:K,level:L}=J;2===L&&(H[J.level],I.executeScript({code:`console.group("${new Date} 渲染层错误")
        console.error(\`${K}\`)
      console.groupEnd()`}))}function l(I,J){I.executeScript({code:`console.group("${new Date} wxss 文件，编译错误")
        console.error(\`${J.file}\n${J.msg}\`)
      console.groupEnd()`})}function m(I,J){I.executeScript({code:`console.group("${new Date} wxss 文件，编译错误")
        console.error(\`${J.file}\n${J.msg}\`)
      console.groupEnd()`})}function n(I,J){let K=decodeURIComponent(J.message).replace(t,'');I.executeScript({code:`console.group("${new Date} wxml 文件，编译错误")
        console.error(\`${K}\`)
      console.groupEnd()`})}function o(I,J){let K=J.details,L=K.error||`the server responded with a status of ${K.statusCode} (${K.statusLine})`,M=`Failed to load ${K.type} ${K.url} : ${L} `,N=K.ip?`From server ${K.ip}`:'';I.executeScript({code:`console.group("${new Date} 渲染层网络层错误")
        console.error(\`${M}\n${N}\`)
      console.groupEnd()`})}const p=require('../../../config/config.js'),q=require('../../../weapp/utils/parseErr.js'),r=require('url');require('babel-code-frame'),_exports={};const{WEBVIEW_NETWORK_ERROR:s,WXML_LOSE_ERROR:t,WXSS_IMPORT_ERROR:u,WXSS_ERROR:v,WEBVIEW_ERROR:w,JSON_ENTRANCE_ERROR:x,PAGE_DEFINE_ERROR:y,PAGEJS_FILE_ERROR:z,COMPONENT_FOR_DEVELOPER:A,ES6_ERROR:B,WXML_ERROR:C,JSON_FILE_ERROR:D,JSON_PARSE_ERROR:E,WXML_RUNTIME_ERROR:F,JSON_CONTENT_ERROR:G}=p,H={'0':'info','1':'warn','2':'error','-1':'debug'};_exports=(I,J,K)=>{J===A?b(I,K):J===C?c(I,K):J===B?a(I,K):J===D?d(I,K):J===E?f(I,K):J===z?h(I,K):J===y?i(I,K):J===F?j(I,K):J===x?e(I,K):J===w?k(I,K):J===v?l(I,K):J===u?m(I,K):J===t?n(I,K):J===G?g(I,K):J===s&&o(I,K)}}init(),module.exports=_exports;