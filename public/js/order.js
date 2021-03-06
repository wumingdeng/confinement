/**
 * Created by Fizzo on 16/12/8.
 */
var selectOid = ""
var selectWid = ""
var g_url=getCookie('_url')
$(function() {
    window.parent.onAutoIframeHeight(800)

    $('#orderTable').bootstrapTable('destroy')
    $('#orderTable').bootstrapTable({
        method: 'post',
        // url: 'http://139.196.238.46:7001/api/getOrdersNeedHandle',
        url: 'http://localhost:7001/api/getOrdersNeedHandle',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        clickToSelect: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })

    $("#submitAlert").click(function(){
        // $.post("http://139.196.238.46:7001/api/assignWorker",{oid:selectOid,wid:selectWid},function(data){
        $.post(g_url+"api/assignWorker",{oid:selectOid,wid:selectWid},function(data){
            $("#alertSumbmit").modal('hide')
        },"json")
       
    })

    $("#searchT").click(function(){
        var name = document.getElementById("inputName").value
        var freeIdx = document.getElementById("free").selectedIndex
        var ga = document.getElementById("selectRight").selectedIndex
        $('#tTable').bootstrapTable('destroy')
        $('#tTable').bootstrapTable({
            method: 'post',
            url: g_url+'api/getWorkerByCondition',
            // url: 'http://localhost:7001/api/getWorkerByCondition',
            sidePagination: "server",
            dataType: "json",
            pageSize:  10,
            queryParams:function(param){
                param.free=freeIdx
                param.name=name
                param.goodAt=ga
                return param
            },
            striped: true,
            onLoadSuccess: function () {
            },
            onLoadError:function(){
                alert("获取数据失败")
            },
            onResetView: function () {
            },
            onDblClickRow: function (row, $element, field) {
                window.parent.document.documentElement.scrollTop = window.parent.document.body.scrollTop = 0
                $('#changeTechnician').modal('hide')
                document.getElementById("sendTN").innerHTML ="你确定为"+ row.name+"派发该订单";
                selectWid = row.wid
                $("#alertSumbmit").modal('show')
            }
        })
    })
    
})


function tFormatter(value, row, index) {
    var newTime = new Date(Number(value));
    return newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate()
}

function rmbFormatter(value, row, index){
    return "￥" +value + "元"
}

function sFormatter(value, row, index){
    switch(value){
        case 0:
            return "未派单";
        case 1:
            return "完成";
        case 2:
            return "关闭";
        case 3:
            return "派单中";
        default:
            return "";
    }
}

function conectFormatter(value, row, index){
    return row.name+": "+row.conect
}

function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        '<button class="RoleOfA btn btn-primary  btn-sm" style="width:100%" >选择技师</button>',
    ].join('');
}

window.operateEvents = {
    'click .RoleOfA': function (e, value, row, index) {
        $('#changeTechnician').modal('show')
    }
};

