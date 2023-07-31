var Screen = {
    designWidth: 1920,
    minWidth: 1366,
    resize: function() {
        var hwRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
        //适配带鱼屏：带鱼屏下直接按1920显示，不进行放大
        var scale = (hwRatio > 3 ? Screen.designWidth : document.documentElement.clientWidth) / Screen.designWidth;
        document.documentElement.style.fontSize = scale * 100 + "px";
        /**
         * 比例保存为全局变量，图表使用此变量
         */
        window.scaleRate = scale;
    }
};
// 第三方微服务地址，debug模式下生效，release下为自动获取当前路径
// var microServerUrl = "http://221.204.12.179:18080/eUrbanFac/drainage";
// var microServerUrl = "http://123.56.110.33:8081/eUrbanFac/drainage";
// var microServerUrl = "http://123.56.170.103:8080/eUrbanFac1201/drainage";
// var microServerUrl = "http://123.56.170.103:8080/eUrbanFac1001/facilities";
// var microServerUrl = "http://111.21.35.86:7000/eUrbanFac/drainage";
// var microServerUrl = "http://218.69.96.186:8081/eUrbanFac/facilities";
// var microServerUrl = "http://192.168.101.75:7000/eUrbanFac/drainage";
// var microServerUrl = "http://119.23.40.67:8081/eUrbanFac/facilities"; //市政调试勿删
var microServerUrl = "";
// var microServerUrl = "http://218.31.180.233:20097/eUrbanFac/drainage";

/*  MIS服务端地址
    debug模式下，所有需要该地址的模块都读取这个地址
 */
// var facilityServerUrl = "http://218.31.180.233:20097/eUrbanMIS";
// var facilityServerUrl = "http://218.69.96.186:8081/eUrbanMIS";
// var facilityServerUrl = "http://123.56.170.103:8080/eUrbanMIS1201";
// var facilityServerUrl = "http://111.21.35.86:18080/eUrbanMIS";
// var facilityServerUrl = "http://221.204.12.179:18080/eUrbanMIS";
// var facilityServerUrl = "http://123.56.110.33:8081/eUrbanMIS";
// var facilityServerUrl = "http://218.31.180.233:20097/eUrbanMIS";
// var facilityServerUrl = "http://119.23.40.67:8081/eUrbanFacilities"; //市政调试勿删
var facilityServerUrl = "";
/*
 * debugger模式下使用的MIS服务的session
 */
window.facSession = "";

window.onresize = function() {
    Screen.resize();
};
Screen.resize();
window.facilityParams = {
    humanID: getQueryString("humanID") || "100433",
    sysID: getQueryString("sysID")|| getQueryString("sysId"),
    serverUrl: facilityServerUrl,
    eGovaPublicServerUrl:"",//市民通
    microServerUrl: microServerUrl,
    facilityServerUrl: facilityServerUrl,
    context: window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.html", "")
};

//燃气大屏供热管线特殊图层
window.gasSupervision = {
    screenMock : "http://218.69.96.188:8081/mock/11"
}

window.signatureFlag = true;

window.outIotUrl = "";

window.menuStyle = "";
window.MisServerUrl = "http://192.168.101.75:8082/eUrbanMIS";
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
