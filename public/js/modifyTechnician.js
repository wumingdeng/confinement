/**
 * Created by Fizzo on 16/12/8.
 */
var isModify = false
var g_url = getCookie('_url')
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
        setInputValue(g_argPost) 
    }
})
function onPostForm() {
    // var photourl=document.getElementsByName("photourl")[0]
    var postData =  $("#modifyForm").serializeArray()
    var values = {}
    for (var item in postData) {
        // values.append(postData[item].name,postData[item].value)
        values[postData[item].name] = postData[item].value;
    }
    var fdata = new FormData();
    fdata.append("photourl",document.getElementById("upload").files[0])
    fdata.append("nc",document.getElementById("normal_cert").files[0])
    fdata.append("ec",document.getElementById("expert_cert").files[0])
    fdata.append("wxid",g_argPost.wxid)
    fdata.append("id",g_argPost.id)
    var str = JSON.stringify(values)
    fdata.append("p",str)
    // var param = {id:g_argPost.id,p:values}
    var _url = ""
    if(isModify){
        _url=g_url+"modWorker"
    }else{
        _url=g_url+"addWorker”
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: g_url+'modWorker',
        data: fdata,
        async: false,
        dataType:"json",
        // contentType: "application/json; charset=utf-8",
        contentType: false,  
        processData: false,  
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

function setInputValue(argPost) {
    document.getElementById("tel").value = argPost.tel || "";
    document.getElementById("name").value = argPost.name || "";
    document.getElementById("sex").value = argPost.sex || "";
    document.getElementById("position").value = argPost.position || "";
    document.getElementById("age").value = argPost.age || "";
    document.getElementById("expyears").value = argPost.expyears || "";
    document.getElementById("address").value = argPost.address || "";
    document.getElementById("keshi").value = argPost.keshi || "";
    document.getElementById("content").value = argPost.content || "";
    document.getElementById('preview').src = g_url+g_argPost.photourl ||"";
    document.getElementById('expert_cert_preview').src = g_url+g_argPost.expert_cert||"";
    document.getElementById('normal_cert_preview').src = g_url+g_argPost.normal_cert||"";
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
