/**
 * Created by Fizzo on 16/11/24.
 */
var swiperData = []
var servicesData = []
var addYearCar = 0
var addService = 0
$(function () {
    var _Id = 0
    var $table = $('#table'),
        $button = $('#btn_swiper');

    $button.click(function () {
        swiperData.push(new Object())
        setTableVariable(swiperData)
        $table.bootstrapTable('insertRow',{index:0,row:{_id:_Id++}});
        window.parent.onAutoIframeHeight() //设置Iframe的高度
        addYearCar++
    });

    $('#btn_service').click(function(){
        servicesData.push(new Object())
        setTableVariable(servicesData)
        $('#xsTable').bootstrapTable('insertRow',{index:0,row:{_id:_Id++}});
        window.parent.onAutoIframeHeight() //设置Iframe的高度
        addService++
    })

    $('#xsTable').bootstrapTable('hideColumn',"_id");
    $table.bootstrapTable('hideColumn', '_id');

});

function operateFormatter(value, row, index) {
    return '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>'
}

function xsOperateFormatter(value, row, index) {
    return '<button type="button" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">删除</button>'
}

function filterStr(_this)
{
    _this.value=_this.value.replace(/[^\-?\d.]/g,'')
}

function inputFormatter(dataFile,index){
    var _id = dataFile+"_"+index
    var val = ""
    if(swiperData && swiperData[index]){
        val = swiperData[index][dataFile] || ""
    }
    return "<input type='text' class='form-control' data-container='body' data-toggle='popover' data-placement='bottom' onkeyup='filterStr(this)' data-content='不能为空' style='width: 100%' value='"+val+"' id='"+_id+"' name='"+_id+"'>"
}

function inputFormatter1(dataFile,index){
    var _id = dataFile+"_"+index
    var val = ""
    if(servicesData && servicesData[index]){
        val = servicesData[index][dataFile] || ""
    }
    return "<input type='text' class='form-control' data-container='body' data-toggle='popover' data-placement='bottom' onkeyup='filterStr(this)' data-content='不能为空' style='width: 100%' value='"+val+"' id='"+_id+"' name='"+_id+"'>"
}
function k1Formatter(value, row, index){
    
    return inputFormatter("adr",index)
}
function k2Formatter(value, row, index){
     return inputFormatter("linkAdr",index)
}
function k3Formatter(value, row, index){

    return inputFormatter("idx",index)
}
function k4Formatter(value, row, index){
    return inputFormatter("pIdx",index)
}
function nameFormatter(value,row,index){
    return inputFormatter1("name",index)
}
function addrFormatter(value,row,index){
    return inputFormatter1("adr",index)
}
function idxFormatter(value,row,index){
    return inputFormatter1("idx",index)
}


window.operateEvents = {
    'click .RoleOfA': function (e, value, row, index) {
        setTableVariable(swiperData)
        swiperData.splice(index,1)
        $('#table').bootstrapTable('remove', {
            field: '_id',
            values: [row._id]
        });
        addYearCar--
    },
    'click .RoleOfB': function (e, value, row, index) {
        setTableVariable(servicesData)
        servicesData.splice(index,1)
        $('#xsTable').bootstrapTable('remove', {
            field: '_id',
            values: [row._id]
        });
        addService--
    }
};

function getTablePostVariable(tableId){
    var table = document.getElementById(tableId)
    var tableInput = table.getElementsByTagName('INPUT')
    var postVariableStr = ""
    for (var idx = 0; idx < tableInput.length; idx++) {
        var input = tableInput[idx]
        var variable = "&"+input.name+"="+input.value
        postVariableStr += variable
    }
    return postVariableStr
}

function setTableVariable(arr){
    var table = document.getElementById("table")
    var tableInput = table.getElementsByTagName('INPUT')
    for (var idx = 0; idx < tableInput.length; idx++) {
        var input = tableInput[idx]
        var tmpStr = input.name.split("_")
        var row = Number(tmpStr[1])
        var cell = tmpStr[0]
        arr[row][cell]= input.value
    }
}

function setCarYearTableView(argData){
    for(var idx=0;true;idx++){
        if(argData["y_"+idx]){
            swiperData.push(new Object())
            swiperData[idx]['y'] = argData['y_'+idx]
            swiperData[idx]['k1'] = argData['k1_'+idx]
            swiperData[idx]['k2'] = argData['k2_'+idx]
            swiperData[idx]['k3'] = argData['k3_'+idx]
            swiperData[idx]['k4'] = argData['k4_'+idx]
            swiperData[idx]['h1'] = argData['h1_'+idx]
            swiperData[idx]['h2'] = argData['h2_'+idx]
            swiperData[idx]['h3'] = argData['h3_'+idx]
            swiperData[idx]['h4'] = argData['h4_'+idx]
            swiperData[idx]['h5'] = argData['h5_'+idx]
            swiperData[idx]['jtl'] = argData['jtl_'+idx]
            $('#table').bootstrapTable('insertRow',{index:idx,row:{_id:idx}});
            addYearCar++
        }else{
            break
        }
    }
}
