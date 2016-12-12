/**
 * Created by Fizzo on 16/12/8.
 */
$(function() {
    window.parent.onAutoIframeHeight(800)

    $('#orderTable').bootstrapTable('destroy')
    $('#orderTable').bootstrapTable({
        method: 'get',
        url: '/dataJson/order.json',
        // sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })

    $("#submitAlert").click(function(){
        $("#alertSumbmit").modal('hide')
    })

    $("#searchT").click(function(){
        $('#tTable').bootstrapTable('destroy')
        $('#tTable').bootstrapTable({
            method: 'get',
            url: '/dataJson/order.json',
            // sidePagination: "server",
            dataType: "json",
            pageSize:  10,
            striped: true,
            onLoadSuccess: function () {
            },
            onResetView: function () {
            },
            onDblClickRow: function (row, $element, field) {
                window.parent.document.documentElement.scrollTop = window.parent.document.body.scrollTop = 0
                $('#changeTechnician').modal('hide')
                document.getElementById("sendTN").innerHTML ="你确定为"+ row.name+"派发该订单";
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
        case "0":
            return "未派单";
        case "1":
            return "完成";
        case "2":
            return "关闭";
        case "3":
            return "派单中";
        default:
            return "";
    }
}

function conectFormatter(value, row, index){
    return row.name+": "+row.cp
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

