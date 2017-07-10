import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import router from './router'

import ksbconfig from './ksbconfig'
Object.keys(ksbconfig).forEach((key)=>{
    Vue.prototype[key] = ksbconfig[key];
})

import axios from 'axios'

Vue.prototype.$ajax = axios

// 将数值四舍五入(保留2位小数)后格式化成金额形式
Vue.prototype.$formatCurrency = function (s,n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return '￥'+ t.split("").reverse().join("") + "." + r;
}
// 将数值四舍五入(保留2位小数)
Vue.prototype.$formatCurrency2 = function (s,n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
