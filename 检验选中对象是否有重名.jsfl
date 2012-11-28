//var prefix=prompt("请输入批量命名的前缀", "batName");

//自动给选中元素的坐标和长宽四舍五入变整数
var docSel=document.selection;
var arr = [];
var sArr = [];
for(var i=0;i<docSel.length;i++){
	if(arr.length && docSel[i].name.length && arr.indexOf(docSel[i].name)>=0){
		hasName = true;
		sArr.push(docSel[i].name);
		//fl.trace(docSel[i].name+",有重名");
	}
	//fl.trace(docSel[i].name);
	arr.push(docSel[i].name);
}

if(!sArr.length) fl.trace("没有重名");
else fl.trace("重名对象"+sArr);