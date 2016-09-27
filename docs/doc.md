##选项

|   选项  | 类型  |  默认值 | 描述  |
| ------------ | ------------ | ------------ | ------------ |
|  pages |  int |  必填 | 总页数  |
|  curr | int  |  1 |  当前页 |
| theme  | string  |  default |  主题样式 |
| groups  | int  |  5 | 连续显示分页数，设为0不显示  |
| prev  |  string | 上一页  | 上一页按钮，设为false则不显示  |
| next  | string  | 下一页  | 下一页按钮，设为false则不显示 |
| first  | string or boolean  |  false |  首页按钮，设为false则不显示，默认false |
| last  | string or boolean  |  last |  尾页按钮，设为false则不显示，默认false |
| before  | function(context, next)  |  无 |  分页加载前触发，如果不执行next()则停止加载 |
| render  | (context, $element, index)  |  无 |  渲染时触发，$element为页码按钮元素，如果返回元素，则使用返回元素，如果返回false则按默认处理 |
| after  | function(context, next)  |  无 | 加载完成后触发，如果不执行next则不注册jump |
| jump  | string or function(context, first)  |  无 |  当触发分页动作后的执行，如果参数为string类型，则替换字符串中的%page%，进行常规跳转。如果参数为function，则执行该函数，如果首次加载时后端已处理好分页数据则需要在after中判断终止或在jump中判断first是否为假 |


##事件

```javascript
    $("#page").on('remove.page.amui', function() {
        console.log('移除前会触发remove.page.amui事件');
    });
    
    $("#page").on('removed.page.amui', function() {
        console.log('移除后会触发removed.page.amui事件');
    });

    $("#page").on('jump.page.amui', function() {
        console.log('点击分页按钮时会触发jump.page.amui事件');
    });
```

##自定义

通过配置参数 theme,并引用amazeui.page.css，则可以开启多主题

如果不引用amazeui.page.css，则参数 theme 无效，默认为蓝色主题。

也可以自行增加 css 样式进行控制

通过 render 函数可以对所有按钮进行控制，如果定义了 render 函数，所有页码元素都会经过 render ，在这个过程中可以进行控制。

render 接收三个参数：context, $element, index

context：对 page对象的引用

$element：当前页码元素，默认为&lt;li&gt;&lt;a&gt;&lt;/a&gt;&lt;/li&gt;结构

index：当前索引，prev、first、1、2.....last、next

可以判断当前索引并对$element进行修改或者重置，即可控制所有按钮。

返回false则使用默认结构和样式，如果返回$element（可以是新的，或者修改过的），则使用$element

实例

```javascript
        render: function(context, $element, index) { //[context：对this的引用，$element：当前元素，index：当前索引]
            //逻辑处理
            if (index == 'last') { //如果索引为last，则设置按钮文字为最后一页
                $element.find('a').html('最后一页');
                return $element; //如果有返回值则使用返回值渲染
            }
            return false; //没有返回值则按默认处理
        }
```