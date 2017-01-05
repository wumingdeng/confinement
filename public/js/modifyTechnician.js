/**
 * Created by Fizzo on 16/12/8.
 */
var isModify = false
var g_argPost = {}
$(function(){
    window.parent.onAutoIframeHeight(2000)
    var modifyer = getCookie('cn');
    var name = ""
    var url = decodeURI(location.href);
    var tmp1 = url.split("?")[1];
    if (tmp1) {
        isModify = true
        var temp = tmp1.split("&")[0]
        var rowStr = temp.split("=")[1];
        g_argPost = JSON.parse(rowStr)
    }
    setInputValue(g_argPost) 
})
function onPostForm() {
    var postData =  $("#modifyForm").serializeArray()
    var values = {};
    for (var item in postData) {
        values[postData[item].name] = postData[item].value;
    }
    var param = {id:g_argPost.id,p:values}
    var str = JSON.stringify(param)
    $.ajax({
        cache: true,
        type: "POST",
        url: 'http://139.196.238.46:7001/api/modWorker',
        data: str,
        async: false,
        dataType:"json",
        contentType: "application/json; charset=utf-8",
        error: function (request) {
            alert("修改失败");
        },
        success: function (data) {
            if(data.err == 999){
                alert('修改失败')
            }else {
                var myurl = "";
                window.location.assign(encodeURI(myurl));
            }
        }
    });
}

function setInputValue(argPost) {
    document.getElementById("tel").value = argPost.tel || "";
    document.getElementById("photourl").value = argPost.photourl || "";
    document.getElementById("name").value = argPost.name || "";
    document.getElementById("sex").value = argPost.sex || "";
    document.getElementById("position").value = argPost.position || "";
    document.getElementById("age").value = argPost.age || "";
    document.getElementById("expyears").value = argPost.expyears || "";
    document.getElementById("normal_cert").value = argPost.normal_cert || "";
    document.getElementById("expert_cert").value = argPost.expert_cert || "";
    document.getElementById("address").value = argPost.address || "";
    document.getElementById("keshi").value = argPost.keshi || "";
    document.getElementById("content").value = argPost.content || "";
}

//复写重置方法
function onRest() {
    setInputValue(g_argPost)
}
function onBack() {
    var myurl = ""
    if (isModify) {
        myurl = "setTechnician";
    } else {
        myurl = "setTechnician";
    }
    window.location.assign(encodeURI(myurl));
}
