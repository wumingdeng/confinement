/**
 * Created by Fizzo on 16/11/24.
 */
var g_swiperData = []
var g_servicesData = []
var swiperData = []
var servicesData = []
var addYearCar = 0
var addService = 0
$(function () {
    var _Id = 0
    var $table = $('#table'),
        $button = $('#btn_swiper');

    $button.click(function () {
        setTableVariable(swiperData)
        $table.bootstrapTable('insertRow',{index:swiperData.length,row:{id:_Id++}});
        window.parent.onAutoIframeHeight() //设置Iframe的高度
        addYearCar++
    });

    $('#btn_service').click(function(){
        setTableVariable(servicesData)
        $('#xsTable').bootstrapTable('insertRow',{index:servicesData.length,row:{id:_Id++}});
        window.parent.onAutoIframeHeight() //设置Iframe的高度
        addService++
    })

    $('#xsTable').bootstrapTable('hideColumn',"id");
    $table.bootstrapTable('hideColumn', 'id');

    $.get("http://139.196.238.46:7001/api/getswipe",{},function(params){
        swiperData = params.ok
        $table.bootstrapTable("load",swiperData)
    })
     

// $('#xsTable').bootstrapTable('destroy')
//     $('#xsTable').bootstrapTable({
//         method: 'post',
//         url: 'http://139.196.238.46:7001/api/getswipe',
//         sidePagination: "server",
//         dataType: "json",
//         pageSize:  10,
//         striped: true,
//         onLoadSuccess: function () {
//         },
//         onResetView: function () {
//         }
//     })

});

function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" class="RoleOfB btn btn-primary  btn-sm" style="margin-right:15px;">保存</button>',
    ].join('');
}

function xsOperateFormatter(value, row, index) {
     return [
        '<button type="button" class="RoleOfC btn btn-default btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" class="RoleOfD btn btn-primary  btn-sm" style="margin-right:15px;">保存</button>',
    ].join('');
}

function inputFormatter(dataFile,index){
    var id = dataFile+"_"+index
    var val = ""
    if(swiperData && swiperData[index]){
        val = swiperData[index][dataFile] || ""
    }
    return "<input type='text' class='form-control' data-container='body' data-toggle='popover' data-placement='bottom' data-content='不能为空' style='width: 100%' id='"+id+"' value='"+val+"' name='"+dataFile+"'>"
}

function inputFormatter1(dataFile,index){
    var id = dataFile+"_"+index
    var val = ""
    if(servicesData && servicesData[index]){
        val = servicesData[index][dataFile] || ""
    }
    return "<input type='text' class='form-control' data-container='body' data-toggle='popover' data-placement='bottom' data-content='不能为空' style='width: 100%' id='"+id+"' value='"+val+"' name='"+dataFile+"'>"
}


function fileImageFormatter(dataFile,index,arrData){
    var id = dataFile+"_"+index
    var val = ""
    if(arrData && arrData[index]){
        val = arrData[index][dataFile] || ""
    }
    // return "<img id='"+id+"' URL='"+val+"'>"
    return "<input class='file' type='file' multiple='' data-preview-file-type='any' data-upload-url='#' data-preview-file-icon='' name='"+dataFile+"'>"
}

function selectFormatter(value,dataFile,index){
    var id = dataFile+"_"+index
    var variArr=['',"","","","","",""]
    variArr[Number(value)] = 'selected'
    var selectStr =  '<select id="'+id+'" name="selectPlace" class="form-control">'+
        '<option value＝"0" '+variArr[0]+'>首页</option>'+
        '<option value＝"1" '+variArr[1]+'>通乳</option>'+
        '<option value＝"2" '+variArr[2]+'>挤奶</option>'+
        '<option value＝"3" '+variArr[3]+'>塑性</option>'+
        '<option value＝"4" '+variArr[4]+'>减肥</option>'+
        '</select>'
    return  selectStr
}

function k1Formatter(value, row, index){
    
    return fileImageFormatter("url",index,swiperData)
}
function k2Formatter(value, row, index){
     return inputFormatter("linkAdr",index)
}
function k3Formatter(value, row, index){

    return inputFormatter("idx",index)
}
function k4Formatter(value, row, index){
    return selectFormatter(value,"place",index)
}
function k5Formatter(value, row, index){
    return inputFormatter("showtime",index)
}

function nameFormatter(value,row,index){
    return inputFormatter1("name",index)
}
function addrFormatter(value,row,index){
    return fileImageFormatter("adr",index,servicesData)
}
function idxFormatter(value,row,index){
    return inputFormatter1("idx",index)
}


window.operateEvents = {
    'click .RoleOfA': function (e, value, row, index) {
        setTableVariable(swiperData)
        swiperData.splice(index,1)
        $.post("http://139.196.238.46:7001/api/delswipe",{id:row.id},function(params){
            if(params.err){
                alert("删除失败")
            }else if(params.ok==1){
                alert("删除成功")
                $('#table').bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
                addYearCar--
            }
        },"json")
    },
    'click .RoleOfB': function (e, value, row, index) {
        var postData = getTablePostVariable("table",index)
        $.post("http://139.196.238.46:7001/api/addswipe",postData,function(params){
            if(params.err){
                alert("添加失败")
            }else{
                var data = params.ok
                data.id
            }
        },"json")
    },
    'click .RoleOfC': function (e, value, row, index) {
        setTableVariable(servicesData)
        servicesData.splice(index,1)
        $.post("http://139.196.238.46:7001/api/delswipe",{id:row.id},function(params){
            if(params.err){
                alert("删除失败")
            }else if(params.ok==1){
                alert("删除成功")
                $('#xsTable').bootstrapTable('remove', {
                    field: '_id',
                    values: [row._id]
                });
                addService--
            }
        })
        
    },
    'click .RoleOfD': function (e, value, row, index) {
        $.post("http://139.196.238.46:7001/api/addswipe",servicesData[index],function(params){
            if(params.err){
                alert("添加失败")
            }else{
                var data = params.ok
            }
        },"json")
    }
};

function getTablePostVariable(tableId,index){
    var table = document.getElementById(tableId)
    var tableInput = table.getElementsByTagName('INPUT')
    var postVariable = {}
    for (var idx = 0; idx < tableInput.length; idx++) {
        var input = tableInput[idx]
        var tmpStr = input.id.split("_")
        var _idx = Number(tmpStr[1])
        var pro = tmpStr[0]
        if(Number(_idx) == index){
           postVariable[pro] = input.value
        }
    }
    var select = table.getElementsByTagName('SELECT')
    for (var idx = 0; idx < select.length; idx++) {
        var input = select[idx]
        var tmpStr = input.id.split("_")
        var _idx = Number(tmpStr[1])
        var pro = tmpStr[0]
        if(Number(_idx) == index){
           postVariable[pro] = input.selectedIndex
        }
    }
    return postVariable
}

function setTableVariable(arr){
    var table = document.getElementById("table")
    var tableInput = table.getElementsByTagName('INPUT')
    for (var idx = 0; idx < tableInput.length; idx++) {
        var input = tableInput[idx]
        var tmpStr = input.id.split("_")
        var row = Number(tmpStr[1])
        var cell = tmpStr[0]
        arr[row][cell]= input.value
    }
}