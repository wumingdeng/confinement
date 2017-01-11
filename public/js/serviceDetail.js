/**
 * Created by Fizzo on 16/12/8.
 */
var isModify = false 
var g_url=getCookie("_url")
var g_argPost = {}
$(function(){
    window.parent.onAutoIframeHeight(2000)
    
    var url = decodeURI(location.href);
    var p_1 = url.indexOf("?")
    if(p_1>=0){
        var params = url.substr(p_1+1,url.length)
        var p_2 = params.indexOf("=")
        var rowStr = params.substr(p_2+1,params.length)
        isModify = true
        g_argPost = JSON.parse(rowStr)
        setInputValue(g_argPost)
    }

    function setInputValue(argPost) {
        document.getElementById("preview").src = g_url+argPost.desc_icon,
        document.getElementById("name").value = argPost.name || "";
        document.getElementById("desc_content").value = argPost.desc_content || "";
        document.getElementById("origin_price").value = argPost.origin_price || 0;
        document.getElementById("cur_price").value = argPost.cur_price || "";
        document.getElementById("desc_fit").value = argPost.desc_fit || "";
        document.getElementById("video_url").value = argPost.video_url || "";
        document.getElementById("desc_content_short").value = argPost.desc_content_short || "";
        document.getElementById("desc_step").value = argPost.desc_step || "";
        document.getElementById("desc_service_time").value = argPost.desc_service_time || "";
        document.getElementById("desc_cancel").value = argPost.desc_cancel || "";
        document.getElementById("desc_long_distance").value = argPost.desc_long_distance || "";
        document.getElementById("desc_service_scale").value = argPost.desc_service_scale || "";
        document.getElementById("desc_night").value = argPost.desc_night || "";
        document.getElementById("desc_advice_period").value = argPost.desc_advice_period || "";
        document.getElementById("desc_promise").value = argPost.desc_promise || "";
    }
})

function onPostForm() {
    var postData =  $("#serviceForm").serializeArray()
    var values = {};
    for (var item in postData) {
        values[postData[item].name] = postData[item].value;
    }
    var param = {sid:g_argPost.id,param:values}
    var str = JSON.stringify(param)

    var _url = ""
    if(isModify){
        _url=g_url+'api/modService'
    }else{
        _url=g_url+"api/createService"
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: _url,
        data: str,
        dataType:"json",
        contentType: "application/json; charset=utf-8",
        error: function (request) {
            alert("修改失败");
        },
        success: function (data) {
            if(data.err == 999){
                alert('修改失败')
            }else {
                alert('修改成功')
            }
        }
    });
}
// function onPostForm() {
//     var postData =  $("#serviceForm").serializeArray()
//     var values = {};
//     for (var item in postData) {
//         values[postData[item].name] = postData[item].value;
//     }
//     // var param = {sid:g_argPost.id,param:values}

//     var fdata = new FormData();
//     fdata.append("desc_icon",document.getElementById("desc_icon").files[0])
//     fdata.append("sid",g_argPost.id)
//     var str = JSON.stringify(values)
//     fdata.append("param",str)

//     var _url = ""
//     if(isModify){
//         _url=g_url+'api/modService'
//     }else{
//         _url=g_url+"createService"
//     }
//     $.ajax({
//         type: "POST",
//         url: _url,
//         data: fdata,
//         dataType:"json",
//         contentType: false,
//         processData: false, 
//         error: function (request) {
//             alert("修改失败");
//         },
//         success: function (data) {
//             if(data.err == 999){
//                 alert('修改失败')
//             }else {
//                 alert('修改成功')
//             }
//         }
//     });


    
// }

//复写重置方法
function onRest() {
    setInputValue(g_argPost)
}
function onBack() {
    var myurl = "setService"
    window.location.assign(encodeURI(myurl));
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}