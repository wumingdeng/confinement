/**
 * Created by Fizzo on 16/12/8.
 */




$(function(){
    window.parent.onAutoIframeHeight(1700)


document.getElementById("cn").value = getCookie('cn');
    var pname = ""
    var url = decodeURI(location.href);
    var tmp1 = url.split("?")[1];
    var isModify = false

    

    if (tmp1) {
        var temp = tmp1.split("&")
        var tmp2 = temp[0];
        var tmp3 = tmp2.split("=")[1];
        document.getElementById("isc").value = tmp3
        isModify = tmp3 == '0'
        if (isModify) {
            document.getElementById("pn").style.display = 'none'
        }
        if (temp[1]) {
            pname = temp[1].split("=")[1];
            document.getElementById("titleH2").innerHTML = pname;
            document.getElementById("pn").value = pname;
            document.getElementById("pnDiv").style.display = 'none'
        }
    }

    var g_argPost = {}
    if (pname != "") {
        document.getElementById("title").innerHTML = "修改参数"
        $.getJSON("/manageProject/getProjectByName", {pn: pname}, function (argPost) {
            argPost = argPost.rows.arg;
            g_argPost = argPost
            setInputValue(argPost)
        })
    } else {
        document.getElementById("title").innerHTML = "创建项目"
        $.getJSON("/manageProject/getGlobal", {}, function (argPost) {
            g_argPost = argPost
            setInputValue(argPost)
        })
    }

})
    function onPostForm() {
        if (!onValidator()) return
        if(addYearCar<2){
            alert("请至少选择两个年份的运输折算系数")
            return
        }
        var postData = ""
        if (isModify) {
            postData = $('#prForm').serialize()
            var temp = postData.indexOf("&")
            postData = postData.substring(temp + 1, postData.length)
            postData = postData + "&pn=" + pname
        } else {
            postData = $('#prForm').serialize()
        }
        postData += getTablePostVariable("table")
        postData += getTablePostVariable("xsTable")
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
        document.getElementById("dklx5y").value = argPost.dklx5y || "";
        document.getElementById("dkll").value = argPost.dkll || "";
        document.getElementById("xfbl").value = argPost.xfbl || "";
        document.getElementById("jcbl").value = argPost.jcbl || "";
        document.getElementById("jcsl").value = argPost.jcsl || "";
        document.getElementById("zzs").value = argPost.zzs || "";
        document.getElementById("gkhjjll").value = argPost.gkhjjll || "";
        document.getElementById("gkhjjbl").value = argPost.gkhjjbl || "";
        document.getElementById("jzzxl").value = argPost.jzzxl || "";
        document.getElementById("sds").value = argPost.sds || "";
        document.getElementById("lzs").value = argPost.lzs || "";

        document.getElementById("tz").value = argPost.tz || "";
        document.getElementById("lx").value = argPost.lx || "";
        document.getElementById("sr").value = argPost.sr || "";
        document.getElementById("qc").value = argPost.qc || "";
        document.getElementById("ztz").value = argPost.ztz;
        document.getElementById("gndklx").value = argPost.gndklx || "";
        document.getElementById("jaf").value = argPost.jaf || "";
        document.getElementById("sglrb").value = argPost.sglrb || "";
        document.getElementById("sglrsl").value = argPost.sglrsl || "";
        document.getElementById("df").value = argPost.df || "";
        document.getElementById("zj").value = argPost.zj || "";
        document.getElementById("yyqzjfh").value = argPost.yyqzjfh || "";
        document.getElementById("dfbz").value = argPost.dfbz || "";
        document.getElementById("bbbbl").value = argPost.bbbbl || "";
        document.getElementById("zbjgc").value = argPost.zbjgc || "";
        document.getElementById("moduleSel").value = argPost.moduleSel || 0;
        document.getElementById("xls").value = argPost.xls || "";
        document.getElementById("mcf").value = argPost.mcf || "";
        document.getElementById("bfr").value = argPost.bfr || "";
        document.getElementById("mfr").value = argPost.mfr || "";
        document.getElementById("mtcr").value = argPost.mtcr || "";
        document.getElementById("mcr").value = argPost.mcr || "";
        document.getElementById("tmct").value = argPost.tmct || "";
        document.getElementById("sct").value = argPost.sct || "";
        document.getElementById("bfy").value = argPost.bfy || "";
        document.getElementById("mfy").value = argPost.mfy || "";
        document.getElementById("buildSel").value = argPost.buildSel || "";
        document.getElementById("yyq").value = argPost.yyq || "";
        onBuildYear(argPost.buildSel)
        var yr = 1
        while (true) {
            if (argPost['jsq' + yr] && argPost['dktr' + yr]) {
                document.getElementById("jsq" + yr).value = Number(argPost['jsq' + yr])
                document.getElementById("dktr" + yr).value = Number(argPost['dktr' + yr])
                yr++
            } else {
                break
            }
        }
        setCarYearTableView(argPost)
        setXsTableView(argPost)


    }
    function onBuildYear(op) {

        var year = Number(op)
        //直接取第一个做判断,
        //如果存在直接把所有动态添加的div全部清理
        var idx = 1
        while (true) {
            var jsq = document.getElementById('elsjsq'+idx)
            var dktr = document.getElementById('elsdktr'+idx)
            if(jsq && dktr){
                document.getElementById('modifyForm').removeChild(jsq)
                document.getElementById('modifyForm').removeChild(dktr)
            }else{
                break;
            }
            idx++
        }
        function onC(title, strId) {
            for (var i = 1; i <= year; i++) {
                var div = document.createElement('div')
                var label = document.createElement('label')
                label.setAttribute('for', strId + i)
                label.innerHTML = title + '(第' + i + '年)'
                var input = document.createElement('input')
                input.setAttribute('class', 'form-control')
                input.setAttribute('id', strId + i)
                input.setAttribute('name', strId + i)
                div.appendChild(label)
                div.appendChild(input)
                div.setAttribute("class", "col-lg-2 col-md-2 form-group")
                div.setAttribute("id", "els"+strId+i)
                div.setAttribute('style', "float: left")
                document.getElementById('modifyForm').appendChild(div)
            }
        }
        onC("建设期投资比例", "jsq")
        onC("贷款投入比例", "dktr")
    }
    function onModule(op) {

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
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }