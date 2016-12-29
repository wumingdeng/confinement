/**
 * Created by Fizzo on 16/12/8.
 */
$(function(){
    window.parent.onAutoIframeHeight(2000)
    document.getElementById("cn").value = getCookie('cn');
    var name = ""
    var url = decodeURI(location.href);
    var tmp1 = url.split("?")[1];
    var isModify = false

    if (tmp1) {
        var temp = tmp1.split("&")
        var tmp2 = temp[0];
        name = tmp2.split("=")[1];
    }

    var g_argPost = {}
    $.getJSON("/manageProject/getProjectByName", {pn: name}, function (argPost) {
        argPost = argPost.rows.arg;
        g_argPost = argPost
        setInputValue(argPost)
    })
})
function onPostForm() {
    $.ajax({
        cache: true,
        type: "POST",
        url: '/manageProject/saveProject',
        data: postData,// 你的formid
        async: false,
        error: function (request) {
            alert("修改失败");
        },
        success: function (data) {
            if(data.ok == 0){
                alert('修改失败')
            }else {
                var myurl = "defaul-project?name=" + document.getElementById("pn").value;
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
    document.getElementById("like").value = argPost.like || "";
}
//复写重置方法
function onRest() {
    setInputValue(g_argPost)
}
function onBack() {
    var myurl = ""
    if (isModify) {
        window.parent.onLoading("show")
        myurl = "defaul-project?name=" + document.getElementById("pn").value;
    } else {
        myurl = "/manage-project";
    }
    window.location.assign(encodeURI(myurl));
}
