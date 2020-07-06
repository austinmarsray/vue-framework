//const { template } = require("babel-core");

/*
* 创建地图所需JS
* create 2017-05-25 for Rika
* hope this helps ^_^
*/
function getMarkerListInfo(map,data, mapId, myListId, panelId, radius, keywordName, projectName, defaultKeyword, defaultProject){
    var map = new AMap.Map(mapId, {zoom: 9});

    AMapUI.loadUI([
        'misc/MarkerList', 
        'overlay/SimpleMarker', 
        'overlay/SimpleInfoWindow', 
        'overlay/AwesomeMarker'
    ],
    

    function(MarkerList, SimpleMarker, SimpleInfoWindow, AwesomeMarker) {
        // var $ = MarkerList.utils.$;//即jQuery/Zepto 表示下面可以使用$
        var defaultIconStyle = 'blue', //默认的图标样式
            hoverIconStyle = 'red', //鼠标hover时的图标样式
            selectedIconStyle = 'green'; //选中时的图标样式    
        var mapRenderData = {
            keyword: defaultKeyword, //右侧选择目录1
            project: defaultProject, //右侧选择目录2
        };
        $("#" + keywordName).on('click', ".item", function (e) {
            selectChangeTab($(this), keywordName);
            mapRenderData.keyword = $(this).text();
            loadData(data, mapRenderData.keyword, mapRenderData.project);
            window.markerList = markerList;
        });
        $("#" + projectName).on('click', ".item", function (e) {
            selectChangeTab($(this), projectName);
            mapRenderData.project = $(this).text();
            loadData(data, mapRenderData.keyword, mapRenderData.project);
            window.markerList = markerList;
        });
        function selectChangeTab(currentTab, idName){
            $('#' + idName + ' .item').removeClass('item-acitive');
            currentTab.addClass('item-acitive');
        }                                                      
        var markerList = new MarkerList({
            map: map,
            //ListElement对应的父节点或者ID [document.getElementById("myList")]
            listContainer: myListId, 
            //从数据中读取位置, 返回lng、Lat
            getPosition: function(item) {
                return [item.longitude, item.latitude];
            },
            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
                return item.id;
            },
            // 创建信息窗口
            getInfoWindow: function(data, context, recycledInfoWindow) { 
                //获取单条道路信息并展示
                let ws = new WebSocket('ws://127.0.0.1:4200/');
                let secondInfo = {"OT":4 , "RoadNo":data.RoadNo, "Token":"LHX123"}
                ws.onopen = function(event) {		//发送消息
                    console.log("道路编号发送成功");
                    ws.send(JSON.stringify(secondInfo));
                };
                ws.onmessage =(event)=>{		//接受消息
                    var roadinfo = JSON.parse(event.data);
                    //展示道路信息
                    var title = roadinfo.RoadName+'<span style="font-size:11px;color:#F00;">'+roadinfo.RoadNo+'</span>',
                        content = [];
                    content.push('<span style="font-size:11px;font-weight:bold;">养护等级：</span>'+roadinfo.ConservationLevel+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp道路类型：</span>'+roadinfo.RoadType);
                    content.push('<span style="font-size:11px;font-weight:bold;">道路等级：</span>'+roadinfo.RoadLevel+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp道路等级：</span>'+roadinfo.SurfaceLevel);
                    content.push('<span style="font-size:11px;font-weight:bold;">道路长度：</span>'+roadinfo.RoadLength+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp道路面积：</span>'+roadinfo.RoadSquare);
                    content.push('<span style="font-size:11px;font-weight:bold;">道路宽度：</span>'+roadinfo.RoadWidth+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp道路起点：</span>'+roadinfo.RoadStart);
                    content.push('<span style="font-size:11px;font-weight:bold;">道路走向：</span>'+roadinfo.RoadDirection+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp道路限速：</span>'+roadinfo.Speed);
                    content.push('<span style="font-size:11px;font-weight:bold;">AADT：</span>'+roadinfo.AADT+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp建造日期：</span>'+roadinfo.BuildDate);
                    content.push('<span style="font-size:11px;font-weight:bold;">交通量等级：</span>'+roadinfo.TranLevel+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp道路厚度：</span>'+roadinfo.SurfaceThick);
                    content.push('<span style="font-size:11px;font-weight:bold;">基层类型：</span>'+roadinfo.InnerType+'<span style="font-size:11px;font-weight:bold;">&nbsp&nbsp&nbsp基层厚度：</span>'+roadinfo.InnerThick);
                    content.push('<span style="font-size:11px;font-weight:bold;">设计单位：</span>'+roadinfo.DesignCom);
                    content.push('<span style="font-size:11px;font-weight:bold;">施工单位：</span>'+roadinfo.BuildCom);
                    content.push('<span style="font-size:11px;font-weight:bold;">管理单位：</span>'+roadinfo.ManageCom);
                   

                    var infoWindow = new AMap.InfoWindow({
                        isCustom: true,  //使用自定义窗体
                        content: createInfoWindow(title, content.join("<br/>")),
                        offset: new AMap.Pixel(16, -45)
                    });
                    let lng = roadinfo.RoadStart.split(',')[0];
                        lon = roadinfo.RoadStart.split(',')[1];
                    infoWindow.open(map,[lng,lon]);

                }
            },
            //构造marker用的options对象, 创建一个点标记
            //content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(data, context, recycledMarker) {
                // var label = String.fromCharCode('A'.charCodeAt(0) + (context.index-1));
                var label = context.index;
                if (recycledMarker) {
                    recycledMarker.setIconLabel(label);
                    return;
                }else{
                    if(data.type === 'Own' || data.type === 'competitor') {
                        return new AwesomeMarker({
                            containerClassNames: 'my-marker',
                            awesomeIcon: 'star',
                            iconStyle: selectedIconStyle,
                            iconLabel: {
                                style: {
                                    color: '#fff',
                                    fontSize: '13px'
                                }
                            }
                        });
                    }else {
                        return new SimpleMarker({
                            containerClassNames: 'my-marker',
                            iconStyle: defaultIconStyle,
                            iconLabel: {
                                innerHTML: label,
                                style: {
                                    color: '#fff',
                                    fontSize: '13px'
                                }
                            }
                        });
                    }
                }
            },
            //构造右侧列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
            getListElement: function(data, context, recycledListElement) {
                // var label = String.fromCharCode('A'.charCodeAt(0) + (context.index-1));
                var label = context.index;
                // var contextNow = context;
                var contentOld = data.type;
                //使用模板创建
                if(data.type === 'Own' || data.type === 'competitor'){
                    html = 
                        '<div class="poiHover">'+
                            '<div class="poi-info-left">' +
                            '    <span class="poi-point"><i class="fa fa-star"></i></span>'+
                            '    <%- data.RoadName %>'+
                        '</div>';           
                }else {
                    html = 
                        '<div class="poiHover">'+
                            '<div class="poi-info-left">' +
                            '    <span class="poi-point"><%- label %></span>'+
                            '    <%- data.RoadName %>'+
                        '</div>';   
                }
                var innerHTML = MarkerList.utils.template(html, {
                    data: data,
                    label: label
                });
                if (recycledListElement) { //存在可回收利用的listElement
                    recycledListElement.innerHTML = innerHTML; //更新innerHTML
                    // 判断后直接返回
                    if (data.page === '0') {
                        return  '<div class="poibox"><h3 class="margin-0 poi-info-title">'+data.type+'</h3>' + innerHTML + '</div>';
                    }else {
                        return '<div class="poibox">' + innerHTML + '</div>';
                    }
                }
                if (data.page === '0') {
                    return  '<div class="poibox"><h3 class="margin-0 poi-info-title">'+data.type+'</h3>' + innerHTML + '</div>';
                }else {
                    return '<div class="poibox">' + innerHTML + '</div>';
                }
            },
            //列表节点上监听的事件
            listElementEvents: ['click', 'mouseenter', 'mouseleave'],
            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],
            autoSetFitView: true,
            
        });
        window.markerList = markerList;
        // 点击列表触发点标记联动
        markerList.on('selectedChanged', function(event, info) {
            // checkBtnStatus();
            if (info.selected) {
                if (info.selected.marker) {
                    //更新为选中样式
                    info.selected.marker.setIconStyle(selectedIconStyle);
                }
                //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
                if (!info.sourceEventInfo.isListElementEvent) {
                    if (info.selected.listElement) {
                        scrollListElementIntoView($(info.selected.listElement));
                    }
                }
            }
            if (info.unSelected && info.unSelected.marker) {
                //更新为默认样式
                if(info.unSelected.data.type === 'Own' || info.unSelected.data.type === 'competitor'){
                    info.unSelected.marker.setIconStyle(selectedIconStyle); 
                }else{
                    info.unSelected.marker.setIconStyle(defaultIconStyle);
                }
            }
        });
        // 添加圆形范围
        markerList.on('markerAddToMap markerRemoveFromMap', function(event, record) {
            var marker = record.marker,
                lng = record.data.longitude,
                Lat = record.data.latitude;
            //var lnglat = (lng,Lat);
            if(record.data.type === 'Own'){
                if (!marker._circle) {
                    //创建一个新的circle，附加在Marker上
                    marker._circle = new AMap.Circle({
                        center: new AMap.LngLat(lnglat),// 圆心位置
                        radius: radius, //半径
                        strokeColor: '#9cfea3', //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 1, //线粗细度
                        fillColor: '#1afa29', //填充颜色
                        fillOpacity: 0.25//填充透明度
                    });
                }
                switch (event.type) {
                    case 'markerAddToMap':
                        //更新map
                        marker._circle.setMap(marker.getMap());
                        //更新position
                        marker._circle.setCenter(marker.getPosition());
                        break;
                    case 'markerRemoveFromMap':
                        marker._circle.setMap(null);
                        break;
                }
            }
            if(record.data.type === 'competitor'){
                if (!marker._circle) {
                    //创建一个新的circle，附加在Marker上
                    marker._circle = new AMap.Circle({
                        center: new AMap.LngLat(lng, Lat),// 圆心位置
                        radius: radius, //半径
                        strokeColor: '#ff8383', //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 1, //线粗细度
                        fillColor: '#ee2200', //填充颜色
                        fillOpacity: 0.25//填充透明度
                    });
                }
                switch (event.type) {
                    case 'markerAddToMap':
                        //更新map
                        marker._circle.setMap(marker.getMap());
                        //更新position
                        marker._circle.setCenter(marker.getPosition());
                        break;
                    case 'markerRemoveFromMap':
                        marker._circle.setMap(null);
                        break;
                }
            }     
        });

        // 鼠标移至点标记的状态
        markerList.on('listElementMouseenter markerMouseover', function(event, record) {
            if (record && record.marker) {
                forcusMarker(record.marker);
                //非选中的id
                if (!this.isSelectedDataId(record.id)) {
                    //设置为hover样式
                    record.marker.setIconStyle(hoverIconStyle);
                }
            }
        });

        // 鼠标移出点标记的状态
        markerList.on('listElementMouseleave markerMouseout', function(event, record) {
            if (record && record.marker) {
                if (!this.isSelectedDataId(record.id)) {
                    //恢复默认样式
                    if(record.data.type === 'Own' || record.data.type === 'competitor'){
                        record.marker.setIconStyle(selectedIconStyle); 
                    }else{
                        record.marker.setIconStyle(defaultIconStyle);
                    }
                }
            }
        });  

        
        function loadData(data,keyword,project) {
            markerList.render(data);
            // 这里是获取数据的地方，如果后台传入数据，就注释掉284行，并将下面的ajax解开注释。function参数添加一个url。
            // $.ajax({
            //     url: url,
            //     type: 'post',
            //     dataType: 'json',
            //     data: {
            //         keyword: keyword, 
            //         project: project
            //     },
            //     success:function(result){
            //         markerList.render(result);
            //     }
            // });
        }

        loadData(data, mapRenderData.keyword, mapRenderData.project);
        for(let i=0;i<data.length;i++)
        {
            let levelcolor;
            if(data[i].type == '一等养护道路')
            {
                levelcolor = 'blue';
            }
            else if(data[i].type == '二等养护道路')
            {
                levelcolor = 'green';
            }
            else{
                levelcolor = 'red';
            }

            AMap.service(["AMap.RoadInfoSearch"], function() {
                var roadSearch = new AMap.RoadInfoSearch({ //构造地点查询类
                    pageSize: 5,
                    pageIndex: 10,
                    city: "500000"
                    
            });
            roadSearch.roadInfoSearchByRoadName(data[i].RoadName, function(status, result) {
                
                for (var i = 0; i < result.roadInfo.length; i++) {
                        const element = result.roadInfo[i];
                        for (var j = 0; j < element.path.length; j++) {
                                const path = element.path[j];
                                const polyline = new AMap.Polyline({
                                path: path,  
                                borderWeight: 5, // 线条宽度，默认为 1
                                strokeColor: levelcolor, // 线条颜色
                                lineJoin: 'round' // 折线拐点连接处样式
                            });
                            map.add(polyline);
                    }
                }
                });
        
    
        });
        }
        
        function createInfoWindow(title, content) {
            var info = document.createElement("div");
            info.className = "custom-info input-card content-window-card";
        
            //可以通过下面的方式修改自定义窗体的宽高
            //info.style.width = "400px";
            // 定义顶部标题
            var top = document.createElement("div");
            var titleD = document.createElement("div");
            var closeX = document.createElement("img");
            top.className = "info-top";
            titleD.innerHTML = title;
            closeX.src = "https://webapi.amap.com/images/close2.gif";
            closeX.onclick = closeInfoWindow;
        
            top.appendChild(titleD);
            top.appendChild(closeX);
            info.appendChild(top);
        
            // 定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.style.backgroundColor = 'white';
            middle.innerHTML = content;
            info.appendChild(middle);
        
            // 定义底部内容
            var bottom = document.createElement("div");
            bottom.className = "info-bottom";
            bottom.style.position = 'relative';
            bottom.style.top = '0px';
            bottom.style.margin = '0 auto';
            var sharp = document.createElement("img");
            sharp.src = "https://webapi.amap.com/images/sharp.png";
            bottom.appendChild(sharp);
            info.appendChild(bottom);
            return info;
        }
        
        //关闭信息窗体
        function closeInfoWindow() {
            map.clearInfoWindow();
        }
        
        
        // 移动至地图中心function
        function forcusMarker(marker) {
            marker.setTop(true);
            //不在地图视野内
            if (!(map.getBounds().contains(marker.getPosition()))) {
                //移动到中心
                map.setCenter(marker.getPosition());
            }
        }

        // 右侧列表联动
        function scrollListElementIntoView($listEle) {
            $('#'+ panelId).scrollTop($listEle.offset().top - $listEle.parent().offset().top);
            //闪动一下
            $listEle.one('webkitAnimationEnd oanimationend msAnimationEnd animationend');
        }
    });
}