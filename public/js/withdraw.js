var approve = 0
var wdId = 0
$(function(){
    window.parent.onAutoIframeHeight(750)
    $("#submitAlert").click(function(){
        $.post("http://139.196.238.46:7001/api/reviewPayRecords",{id:,pass:approve},function(){
            loadWithdraw()
        },"json")
       
    })
    loadWithdraw()
})

function loadWithdraw(){
    $('#manageWithdrawTable').bootstrapTable('destroy')
    $('#manageWithdrawTable').bootstrapTable({
        method: 'post',
        url: 'http://139.196.238.46:7001/api/getNeedReviewPayRecords',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
            console.log("刷新")
        },
        onResetView: function () {
        },
        onRefresh:function(){
            console.log("俄日刷新")
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
            return "不批准";
        case "1":
            return "批准";
        default:
            return "";
    }
}

function submitWithdraw(wId){
    if(approve == 1){
        document.getElementById("alertText").innerHTML ="你确定批准该条提现申请";
    }else{
        document.getElementById("alertText").innerHTML ="你确定不批准该条提现申请";
    }
    $('#alertSumbmit').modal('show')
}
function operateFormatter(value, row, index) {
    var qz = getCookie('right')
    return [
        '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:10px;width:40%">批准</button>',
        '<button class="enter btn btn-primary  btn-sm" style="width:40%">不批准</button>',
    ].join('');
}

window.operateEvents = {
    'click .RoleOfA': function (e, value, row, index) {
        approve = 1
        submitWithdraw(row.id)
    },
    'click .enter': function (e, value, row, index) {
        approve = 0
        submitWithdraw(row.id)
    }
    
};

