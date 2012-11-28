//var prefix=prompt("请输入批量命名的前缀", "batName");

//自动给选中元素的坐标和长宽四舍五入变整数
var docSel=document.selection;
for(var i=0;i<docSel.length;i++){
	var elm = docSel[i];
	elm.x = Math.round(elm.x);
	elm.y = Math.round(elm.y);
//	elm.width = Math.round(elm.width);
//	elm.height = Math.round(elm.height);
	fl.trace(elm.name);
//	fl.trace(Math.round(elm.x));
}
