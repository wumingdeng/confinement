/**
 * Created by Fizzo on 16/12/8.
 */
$(function(){
    window.parent.onAutoIframeHeight(1700)
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
    document.getElementById("head").value = argPost.head || "";
    document.getElementById("nm").value = argPost.nm || "";
    document.getElementById("sex").value = argPost.sex || "";
    document.getElementById("selectJob").value = argPost.selectJob || "";
    document.getElementById("ptrz").value = argPost.ptrz || "";
    document.getElementById("qwrz").value = argPost.qwrz || "";
    document.getElementById("adr").value = argPost.adr || "";
    document.getElementById("rom").value = argPost.rom || "";
    document.getElementById("itr").value = argPost.itr || "";
    document.getElementById("like").value = argPost.like || "";

    document.getElementById("head_1").value = argPost.head_1 || "";
    document.getElementById("nm_1").value = argPost.nm_1 || "";
    document.getElementById("sex_1").value = argPost.sex_1 || "";
    document.getElementById("selectJob_1").value = argPost.selectJob_1 || "";
    document.getElementById("ptrz_1").value = argPost.ptrz_1 || "";
    document.getElementById("qwrz_1").value = argPost.qwrz_1 || "";
    document.getElementById("adr_1").value = argPost.adr_1 || "";
    document.getElementById("rom_1").value = argPost.rom_1 || "";
    document.getElementById("itr_1").value = argPost.itr_1 || "";
    document.getElementById("like_1").value = argPost.like_1 || "";
    
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
