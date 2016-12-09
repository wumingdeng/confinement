/**
 * Created by Fizzo on 16/12/8.
 */


$(function () {
    window.parent.onAutoIframeHeight() //设置Iframe的高度
//        $('#table').bootstrapTable('destroy')
    $('#table').bootstrapTable({
        method: 'get',
        url: '/manageProject/getProject',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        },
        onClickCell: function (field, value, row, $element) {
            if (field == "pn" || field == "cn" || field == "dt" || field == "_id") {
                window.parent.onLoading("show")
                var myurl = "serviceDetail?name=" + row.pn;
                window.location.assign(encodeURI(myurl));
            }
        }
    })
    $("#addNew").click(function () {
       var myurl = "serviceDetail";
        window.location.assign(encodeURI(myurl));
    })

    function initFileInput(ctrlName, uploadUrl) {
        var control = $('#' + ctrlName);

        control.fileinput({
            language: 'zh', //设置语言
            uploadUrl: uploadUrl, //上传的地址
            allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
            showUpload: false, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        });
    }
    initFileInput("file-Portrait", "/User/EditPortrait");
});



function groupFormatter(value, row, index){
    switch(value){
        case "0":
            return "人群一";
        case "1":
            return "人群二";
        case "2":
            return "人群三";
        case "3":
            return "人群四";
        default:
            return "";
    }
}

function rmbFormatter(value, row, index){
    return "￥" +value + "元"
}

function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:10px;width:40%">删除</button>',
        '<button class="RoleOfEdit btn btn-primary  btn-sm" style="width:40%" >修改</button>',
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
            $.getJSON('/manageProject/deleteProject', {_id: row._id, pn: row.pn}, onSuccess(row))
        })
    },
    'click .RoleOfEdit': function (e, value, row, index) {
        var myurl = "serviceDetail?name=" + row.id;
        window.location.assign(encodeURI(myurl));
    }
};