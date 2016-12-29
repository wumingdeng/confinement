/**
 * Created by Fizzo on 16/12/8.
 */
var selectedOrder = ""

$(function() {
    window.parent.onAutoIframeHeight(750)

    $('#countList').bootstrapTable('destroy')
    $('#countList').bootstrapTable({
        method: 'get',
        url: '/dataJson/count.json',
        // sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        search:true,
        searchOnEnterKey:true,
        showColumns:true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }

    })

})

function findCountByOrderId(orderId){
    function getParams() {

        return orderId;
    }
    $('#countList').bootstrapTable('destroy')
    $('#countList').bootstrapTable({
        method: 'get',
        url: '/dataJson/count.json',
        // sidePagination: "server",
        queryParams:getParams,
        dataType: "json",

        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })
}

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

function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        '<button class="RoleOfEdit btn btn-primary  btn-sm" style="margin-right:10px;width:45%">转入金额</button>',
        '<button class="enter btn btn-primary  btn-sm" style="width:45%" >订单结算列表</button>',
    ].join('');
}

window.operateEvents = {
    'click .enter': function (e, value, row, index) {
        findCountByOrderId(row.id)
    },
    'click .RoleOfEdit': function (e, value, row, index) {
        console.log(row.id)
        selectedOrder = row.id
        $('#pushRmb').modal('show')
    }
};

