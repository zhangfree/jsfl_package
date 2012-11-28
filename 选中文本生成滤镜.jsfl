var docSel=document.selection;
var arr = [];
var arr2 = [];

var myFilters = fl.getDocumentDOM().getFilters(); 
for (i=0; i < myFilters.length; i++) {
	var flt = myFilters[i]
	var str = filterChangeCreate(flt);
	if(!str) continue;
    fl.trace(str);
}
//fl.getDocumentDOM().setFilters(myFilters);



//fl.trace(arr);
//fl.trace(arr2);
	
// 复制到剪贴板
//fl.clipCopyString(arr);

// 滤镜转as类生成
function filterChangeCreate(flt)
{
//"adjustColorFilter"、"bevelFilter"、"blurFilter"、"dropShadowFilter"、"glowFilter"、"gradientBevelFilter" 和 "gradientGlowFilter"。
	switch(flt.name)
	{
		case "bevelFilter":
			var str = "var filter:BevelFilter = new BevelFilter({distance}, {angle}, {highlightColor}"
			+ ", {highlightAlpha}, {shadowColor}, {shadowAlpha}, {blurX}, {blurY}, {strength}"
			+ ", {quality}, {type}, {knockout});";
			
			str = str.replace("{distance}",flt.distance);
			str = str.replace("{angle}",flt.angle);
			var hColor = flt.highlightColor.replace("#","0x");
			str = str.replace("{highlightColor}",hColor);
			str = str.replace("{highlightAlpha}",1);
			var sColor = flt.shadowColor.replace("#","0x");
			str = str.replace("{shadowColor}",sColor);
			str = str.replace("{shadowAlpha}",1);
			str = str.replace("{blurX}",flt.blurX);
			str = str.replace("{blurY}",flt.blurY);
			str = str.replace("{strength}",Number(flt.strength)/100);
			var sthStr = (flt.quality + "").toUpperCase()
			str = str.replace("{quality}","BitmapFilterQuality." + sthStr);
			
			var sthStr = (flt.type + "").toUpperCase()
			str = str.replace("{type}","BitmapFilterType." + sthStr);
			
			str = str.replace("{knockout}",flt.knockout);
			
			return str;
			
		case "blurFilter":
			var str = "var filter:BlurFilter = new BlurFilter({blurX}, {blurY}, {quality});";
			
			str = str.replace("{blurY}",flt.blurY);
			str = str.replace("{blurX}",flt.blurX);
			var sthStr = (flt.quality + "").toUpperCase()
			str = str.replace("{quality}","BitmapFilterQuality." + sthStr);
			
			return str;
			
		break;
		case "dropShadowFilter":
			var str = "var filter:DropShadowFilter = new DropShadowFilter({distance}, {angle}, {color}, "
			+ "{alpha}, {blurX}, {blurY}, {strength}, {quality}, {inner}, "
			+ "{knockout}, {hideObject});";
			
			str = str.replace("{distance}",flt.distance);
			str = str.replace("{angle}",flt.angle);
			var dColor = flt.color.replace("#","0x");
			str = str.replace("{color}",dColor);
			str = str.replace("{alpha}",1);
			str = str.replace("{blurX}",flt.blurX);
			str = str.replace("{blurY}",flt.blurY);
			str = str.replace("{strength}",Number(flt.strength)/100);
			var sthStr = (flt.quality + "").toUpperCase()
			str = str.replace("{quality}","BitmapFilterQuality." + sthStr);
			str = str.replace("{inner}",flt.inner);
			str = str.replace("{knockout}",flt.knockout);
			str = str.replace("{hideObject}",flt.hideObject);
			
			return str;
		case "glowFilter":
			var str = "var filter:GlowFilter = new GlowFilter({color}, {alpha}"
			+ ", {blurX}, {blurY}, {strength}, {quality}, {inner}, {knockout});";
			
			var dColor = flt.color.replace("#","0x");
			str = str.replace("{color}",dColor);
			str = str.replace("{alpha}",1);
			str = str.replace("{blurX}",flt.blurX);
			str = str.replace("{blurY}",flt.blurY);
			str = str.replace("{strength}",Number(flt.strength)/100);
			var sthStr = (flt.quality + "").toUpperCase()
			str = str.replace("{quality}","BitmapFilterQuality." + sthStr);
			str = str.replace("{inner}",flt.inner);
			str = str.replace("{knockout}",flt.knockout);
			
			return str;
			
		// 调整颜色，渐变发光，渐变颜色暂时不支持
		case "adjustColorFilter":
			
		break;
		case "gradientBevelFilter":
			
		break;
		case "gradientGlowFilter":
		
		break;
	}
	return null;
}

function changeInner(inner)
{
	
}