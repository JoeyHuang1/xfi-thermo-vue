// vue.config.js
module.exports = {
    // the default is / so that index.html ref js as /some.js
    // It won't work for WebView in React-Native, which need ref as some.js or ./some.js
    baseUrl: '/webSrcVue' 
  }