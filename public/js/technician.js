/**
 * Created by Fizzo on 16/12/8.
 */


$(function () {
    window.parent.onAutoIframeHeight(750) //设置Iframe的高度
    
    getAllRecord()
    $("#addNew").click(function{
        var myurl = "modifyTechnician";
        window.location.assign(encodeURI(myurl));
    })
});
function getAllRecord(){
    $('#technicianTable').bootstrapTable('destroy')
    $('#technicianTable').bootstrapTable({
        method: 'post',
        url: 'http://localhost:7001/api/getWorkers',
        // url: 'http://139.196.238.46:7001/api/getWorkers',
        sidePagination: "server",
        dataType: "json",
        pageSize:  10,
        striped: true,
        onLoadSuccess: function () {
        },
        onResetView: function () {
        }
    })
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
        '<button class="RoleOfEdit btn btn-primary  btn-sm" style="margin-right:10px;width:45%" >修改资料</button>',
        '<button class="enter btn btn-primary  btn-sm" style="width:45%" >推荐</button>',
    ].join('');
}
function rtFormatter(value, row, index) {
    var time = value || ""
    var newTime = new Date(Number(time));
    return newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate()
}

window.operateEvents = {
    'click .enter': function (e, value, row, index) {
        document.getElementById("modalTt").innerHTML="是否确定把该技师设置为推荐"
        $('#myModal').modal('show')
        $('#commit').click(function () {
            $.post('http://localhost:7001/api/recomemndWorker', {id: row.id, recommend:1}, function(res){
                $('#myModal').modal('hide')
                if(res.err==999){
                    alert("提交失败")
                }else if(res.ok==1){
                    alert("提交成功")
                    $('#technicianTable').bootstrapTable("updateRow",{index:index,row:{is_recommend:1}})
                    // getAllRecord()
                }
            },"json")
        })
    },
    'click .RoleOfEdit': function (e, value, row, index) {
       var myurl = "modifyTechnician?row=" + JSON.stringify(row);
        window.location.assign(encodeURI(myurl));
    }
};