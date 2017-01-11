/**
 * Created by Fizzo on 16/12/8.
 */


$(function () {
    window.parent.onAutoIframeHeight(750) //设置Iframe的高度
    $('#technicianTable').bootstrapTable('destroy')
    $('#technicianTable').bootstrapTable({
        method: 'post',
        url: 'http://139.196.238.46:7001/api/getWorkersUnReview',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })
    
    $('#cpyCommit').click(function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: '/manageProject/copyProject',
            data: $('#cpyFrm').serialize(),// 你的formid
            async: false,
            error: function (request) {
                alert("Connection error");
            },
            success: function (data) {
                $('#table').bootstrapTable('insertRow', data)
            }
        });
    })
});

function onSuccess(row) {
    $('#table').bootstrapTable('remove', {
        field: '_id',
        values: [row._id]
    });
    $('#myModal').modal('hide')
}

function asFormatter(value, row, index){
    switch(value){
        case 0:
            return "资料未完善";
        case 1:
            return "资料完善未审批";
        case 2:
            return "资料已完善";
        case 3:
            return "审核未通过";
        default:
            return "";
    }
}

function usFormatter(value, row, index){
    switch(value){
        case 0:
            return "正常";
        case 1:
            return "冻结";
        default:
            return "";
    }
}

function tjFormatter(value,row,index){
    switch(value){
        case 0:
            return "否";
        case 1:
            return "是";
        default:
            return "";
    }
}

function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        // '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:10px;width:45%">删除</button>',
        // '<button class="RoleOfEdit btn btn-primary  btn-sm" style="margin-right:10px;width:30%" >修改资料</button>',
        '<button class="enter btn btn-primary  btn-sm">审批</button>',
    ].join('');
}

function atFormatter(value, row, index) {
    var time = value || ""
    var newTime = new Date(Number(time));
    return newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate()
}

window.operateEvents = {
    // 'click .RoleOfA': function (e, value, row, index) {
    //     $('#myModal').modal('show')
    //     $('#deleteCommit').click(function () {
    //         $.getJSON('/manageProject/deleteProject', {_id: row._id, pn: row.pn}, onSuccess(row))
    //     })
    // },
    'click .enter': function (e, value, row, index) {
        // window.parent.onLoading("show")
        var myurl = "technicianDetail?row=" + row.id;
        window.location.assign(encodeURI(myurl));

    }
};