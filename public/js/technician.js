/**
 * Created by Fizzo on 16/12/8.
 */


$(function () {
    window.parent.onAutoIframeHeight(750) //设置Iframe的高度
    $('#technicianTable').bootstrapTable('destroy')
    $('#technicianTable').bootstrapTable({
        method: 'post',
        url: 'http://139.196.238.46:7001/api/getWorkers',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })
    
});
function findCountByTechnicianID(tid){
    $('#countList').bootstrapTable('destroy')
    $('#countList').bootstrapTable({
        method: 'get',
        url: '/dataJson/count.json',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
            
            window.parent.onLoading("hide")
            window.parent.document.documentElement.scrollTop = window.parent.document.body.scrollTop = 1000
        },
        onResetView: function () {
        }
    })
}
function onSuccess(row) {
    $('#table').bootstrapTable('remove', {
        field: '_id',
        values: [row._id]
    });
    $('#myModal').modal('hide')
}

function asFormatter(value, row, index){
    switch(value){
        case "0":
            return "资料未完善";
        case "1":
            return "资料完善未审批";
        case "2":
            return "资料已完善";
        case "3":
            return "审核未通过";
        default:
            return "";
    }
}

function usFormatter(value, row, index){
    switch(value){
        case "0":
            return "正常";
        case "1":
            return "冻结";
        default:
            return "";
    }
}

function tjFormatter(value,row,index){
    switch(value){
        case "0":
            return "否";
        case "1":
            return "是";
        default:
            return "";
    }
}

function rmbFormatter(value,row,index){
    return "￥"+ value +"元"
}
function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        '<button class="RoleOfEdit btn btn-primary  btn-sm" style="margin-right:10px;width:45%" >修改资料</button>',
        '<button class="enter btn btn-primary  btn-sm" style="width:45%" >推荐</button>',
    ].join('');
}
function rtFormatter(value, row, index) {
    var newTime = new Date(Number(value));
    return newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate()
}
function atFormatter(value, row, index) {
    var newTime = new Date(Number(value));
    return newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate()
}

window.operateEvents = {
    'click .enter': function (e, value, row, index) {
        document.getElementById("modalTt").innerHTML="是否确定把该技师设置为推荐"
        $('#myModal').modal('show')
        $('#commit').click(function () {
            $.post('http://139.196.238.46:7001/api/recomemndWorker', {_id: row._id, recommend: 1}, onSuccess(row),"json")
        })
    },
    'click .RoleOfEdit': function (e, value, row, index) {
       var myurl = "modifyTechnician?row=" + JSON.stringify(row);
        window.location.assign(encodeURI(myurl));
    }
};