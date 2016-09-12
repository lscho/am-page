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
| jump  | function(context, first)  |  无 |  触发分页后的回调，如果首次加载时后端已处理好分页数据则需要在after中判断终止或在jump中判断first是否为假 |


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