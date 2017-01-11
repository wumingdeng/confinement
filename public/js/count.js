/**
 * Created by Fizzo on 16/12/8.
 */
var selectedOrder = ""
var selectedWorker = ""

$(function() {
    window.parent.onAutoIframeHeight(750)

    $('#orderTable').bootstrapTable('destroy')
    $('#orderTable').bootstrapTable({
        method: 'post',
        url: 'http://139.196.238.46:7001/api/getWorkerSettleRecord',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        showColumns:true,
        queryParams:function(params){
            params.review_status = 1
            return params
        },
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })
    
    $("#submitAlert").click(function(){
        $.post('http://139.196.238.46:7001/api/workerSettle',{oid:selectedOrder,wid:selectedWorker,settled:document.getElementById("rmb").value},fucntion(data){
            $("#alertSumbmit").modal('hide')
        },"json")
    })
    
    $("#pushRmbCommit").click(function(){
        var rmb =  document.getElementById("rmb").value
        if(rmb>0){
        document.getElementById("sendTN").innerHTML ="你确定为订单号为:"+ selectedOrder+",转入金额"+rmb+"元";
        $("#alertSumbmit").modal('show')
        }else{

        }
        $("#pushRmb").modal('hide')
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

function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        '<button class="RoleOfEdit btn btn-primary  btn-sm">转入金额</button>'
        // '<button class="enter btn btn-primary  btn-sm" style="width:45%" >订单结算列表</button>',
    ].join('');
}

window.operateEvents = {
    'click .enter': function (e, value, row, index) {
        // findCountByOrderId(row.id)
    },
    'click .RoleOfEdit': function (e, value, row, index) {
        console.log(row.id)
        selectedOrder = row.oid
        selectedWorker = row.wid
        $('#pushRmb').modal('show')
    }
};

