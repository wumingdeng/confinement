/**
 * Created by Fizzo on 16/12/8.
 */


$(function () {
    window.parent.onAutoIframeHeight(750) //设置Iframe的高度
    $('#technicianTable').bootstrapTable('destroy')
    $('#technicianTable').bootstrapTable({
        method: 'get',
        url: '/dataJson/technician.json',
        // sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        },
        onDblClickRow: function (row, $element, field) {
            if (field == "us" || field == "name" || field == "dt" || field == "id" || field == "as" || field == "tj" || field == "at") {

                // findCountByTechnicianID(row.id)
            }
        }
    })
    
});
function findCountByTechnicianID(tid){
    $('#countList').bootstrapTable('destroy')
    $('#countList').bootstrapTable({
        method: 'get',
        url: '/dataJson/count.json',
        // sidePagination: "server",
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
        '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:10px;width:30%">删除</button>',
        '<button class="RoleOfEdit btn btn-primary  btn-sm" style="margin-right:10px;width:30%" >修改资料</button>',
        '<button class="enter btn btn-primary  btn-sm" style="width:30%" >推荐</button>',
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
    'click .RoleOfA': function (e, value, row, index) {
        document.getElementById("modalTt").innerHTML="是否确定删除该技师"
        $('#myModal').modal('show')
        $('#commit').click(function () {
            $.post('/manageProject/deleteProject', {_id: row._id, pn: row.pn}, onSuccess(row),"json")
        })
    },
    'click .enter': function (e, value, row, index) {
        document.getElementById("modalTt").innerHTML="是否确定把该技师设置为推荐"
        $('#myModal').modal('show')
        $('#commit').click(function () {
            $.post('/manageProject/tjProject', {_id: row._id, pn: row.pn}, onSuccess(row),"json")
        })
    },
    'click .RoleOfEdit': function (e, value, row, index) {
       var myurl = "modifyTechnician?name=" + row.id;
        window.location.assign(encodeURI(myurl));
    }
};