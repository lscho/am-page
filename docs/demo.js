var jump = function(context) {
    $("#tips").html('当前第：' + context.option.curr + "页");
}
$(function() {
    /*普通实例*/
    $("#page1").page({ pages: 10 });
    /*自定义文本*/
    $("#page2").page({
        pages: 10,
        first: "首页", //设置false则不显示，默认为false  
        last: "尾页", //设置false则不显示，默认为false      
        prev: '<', //若不显示，设置false即可，默认为上一页
        next: '>', //若不显示，设置false即可，默认为下一页
        groups: 3, //连续显示分页数
    });
    /*只出现上一页下一页*/
    $("#page3").page({
            pages: 10,
            groups: 0,
            jump: function(context) {
                $("#tips3").html("共" + context.option.pages + "页，当前第" + context.option.curr + "页");
            }
        })
    /*ajax无限加载*/
    $("#page4").page({
        pages: 10,
        groups: 0, //连续显示分页数
        prev: false, //若不显示，设置false即可，默认为上一页
        jump: function(context, first) {
            if (!first) { //如果第一页数据也使用ajax获取，这里不需要判断
                $.get('ajax_return.html?page=' + context.option.curr, function(html) {
                    $("#tips4").append(html); //可以追加也可以覆盖
                });
            }
        }
    })
    /*ajax常规跳转*/
    var page = window.location.search.match(/page=(\d+)/);
    $("#page5").page({
        pages:10,
        curr:page?page[1]:1,
        jump:window.location.href.split('?')[0]+"?page=%page%"
        /*使用回调函数可以处理更复杂的逻辑
        jump:function(context, first){
            if(!first){
                window.location.href = '?page='+context.option.curr;
            }
        }        
        */
    })

    /*全功能演示*/
    //测试数据
    var data = ["北京", "上海", "广州", "深圳", "杭州", "长沙", "合肥", "宁夏", "成都", "西安", "南昌", "上饶", "沈阳", "济南", "厦门", "福州", "九江", "宜春", "赣州", "宁波", "绍兴", "无锡", "苏州", "徐州", "东莞", "佛山", "中山", "成都", "武汉", "青岛", "天津", "重庆", "南京", "九江", "香港", "澳门", "台北"];
    var nums = 5; //每页出现的数量
    var pages = Math.ceil(data.length / nums); //得到总页数

    var thisDate = function(curr) {
        //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
        var str = '',
            last = curr * nums - 1;
        last = last >= data.length ? (data.length - 1) : last;
        for (var i = (curr * nums - nums); i <= last; i++) {
            str += '<li>' + data[i] + '</li>';
        }
        return str;
    };
    //返回的是一个page示例，拥有实例方法
    var $page = $("#page").page({
        pages: pages, //页数
        curr: 1, //当前页 
        theme: 'default', //主题
        groups: 5, //连续显示分页数
        prev: '<', //若不显示，设置false即可
        next: '>', //若不显示，设置false即可        
        first: "首页",
        last: "尾页", //false则不显示
        before: function(context, next) { //加载前触发，如果没有执行next()则中断加载
            console.log('开始加载...');
            context.time = (new Date()).getTime(); //只是演示，并没有什么卵用，可以保存一些数据到上下文中
            next();
        },
        render: function(context, $element, index) { //渲染[context：对this的引用，$element：当前元素，index：当前索引]
            //逻辑处理
            if (index == 'last') { //虽然上面设置了last的文字为尾页，但是经过render处理，结果变为最后一页
                $element.find('a').html('最后一页');
                return $element; //如果有返回值则使用返回值渲染
            }
            return false; //没有返回值则按默认处理
        },
        after: function(context, next) { //加载完成后触发
            var time = (new Date()).getTime(); //没有什么卵用的演示
            console.log('分页组件加载完毕，耗时：' + (time - context.time) + 'ms');
            next();
        },
        /*
         * 触发分页后的回调，如果首次加载时后端已处理好分页数据则需要在after中判断终止或在jump中判断first是否为假
         */
        jump: function(context, first) {
            console.log('当前第：' + context.option.curr + "页");
            $("#content").html(thisDate(context.option.curr));
        }
    });

    $("#page").on('remove.page.amui', function() {
        console.log('移除前会触发remove.page.amui事件');
    });

    $("#remove").click(function() {
        $page.remove(function() {
            console.log('移除分页组件成功');
        })
    })

    $("#page").on('removed.page.amui', function() {
        console.log('移除后会触发removed.page.amui事件');
    });

    $("#page").on('jump.page.amui', function() {
        console.log('点击分页按钮时会触发jump.page.amui事件');
    });

    $("#set").click(function() {
        var page = $("#curr").val();
        $page.setCurr(page, function() {
            console.log('跳转到第' + page + "页");
        });
    });
})
