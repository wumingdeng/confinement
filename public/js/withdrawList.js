$(function(){
    window.parent.onAutoIframeHeight(750)
    $("#submitAlert").click(function(){
        loadWithdraw()
        
    })
    loadWithdraw()
})

function loadWithdraw(){
    $('#withdrawList').bootstrapTable('destroy')
    $('#withdrawList').bootstrapTable({
        method: 'post',
        // url: 'http://139.196.238.46:7001/api/getNeedReviewPayRecords',
        url: 'http://localhost:7001/api/getNeedReviewPayRecords',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
            console.log("刷新")
            // $('#alertSumbmit').modal('hide')
        },
        onResetView: function () {
        },
        onRefresh:function(){
            console.log("俄日刷新")
        }
    })
}

function tFormatter(value, row, index) {
    var time = value||""
    var newTime = new Date(Number(time));
    return newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate()
}

function rmbFormatter(value, row, index){
    return "￥" +value + "元"
}

function sFormatter(value, row, index){
    switch(value){
        case 0:
            return "不批准";
        case 1:
            return "批准";
        default:
            return "";
    }
}

