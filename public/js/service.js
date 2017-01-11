/**
 * Created by Fizzo on 16/12/8.
 */

var g_url = getCookie("_url")
$(function () {
    window.parent.onAutoIframeHeight(800) //设置Iframe的高度
    $('#table').bootstrapTable('destroy')
    $('#table').bootstrapTable({
        method: 'post',
        url: g_url+'api/getServices',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        showColumns:true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })
    $("#addNew").click(function () {
       var myurl = "serviceDetail";
        window.location.assign(encodeURI(myurl));
    })
});




function rmbFormatter(value, row, index){
    return "￥" +value + "元"
}

function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        // '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:10px;width:45%">删除</button>',
        '<button class="RoleOfEdit btn btn-primary  btn-sm" style="width:90%" >修改</button>',
    ].join('');
}

function onSuccess(row) {
    $('#table').bootstrapTable('remove', {
        field: '_id',
        values: [row._id]
    });
    $('#myModal').modal('hide')
}

window.operateEvents = {
    'click .RoleOfA': function (e, value, row, index) {
        $('#myModal').modal('show')
        $('#deleteCommit').click(function () {
            $.getJSON(g_url+'/manageProject/deleteProject', {_id: row._id, name: row.name}, onSuccess(row))
        })
    },
    'click .RoleOfEdit': function (e, value, row, index) {
        var myurl = "serviceDetail?id=" + JSON.stringify(row);
        window.location.assign(encodeURI(myurl));
    }
};