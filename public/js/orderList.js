/**
 * Created by Fizzo on 16/12/28.
 */
/**
 * Created by Fizzo on 16/12/8.
 */
$(function() {
    window.parent.onAutoIframeHeight(800)

    $('#orderTable').bootstrapTable('destroy')
    $('#orderTable').bootstrapTable({
        method: 'post',
        url: 'http://139.196.238.46:7001/api/getOrders',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
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
    return row.username+": "+row.tel
}


