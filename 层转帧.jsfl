selectToFrame();

//将选中放入的对象名
var toItem = "图标";
//将选中对象对入帧
function selectToFrame(){
	var selItems = fl.getDocumentDOM().library.getSelectedItems();
	for(var i=0;i<selItems.length;i++){
		addFrame(selItems[i].name,(i));
	}
}


//添加图标到关键帧
//itemPath 库文件的完整路径， frameCount要添加到的帧位置
function addFrame(itemPath, frameCount)
{
		var tl = fl.getDocumentDOM().getTimeline();
		var lib = fl.getDocumentDOM().library;
         var index = tl.findLayerIndex(toItem);
         if(index == undefined)
         {
                   tl.setSelectedLayers(0);
                   tl.layers[0].name=toItem;
         }
         else
         {
                   tl.setSelectedLayers(index[0], true);
         }
         tl.insertFrames(1,true,frameCount);
         tl.convertToBlankKeyframes(frameCount);
         lib.addItemToDocument({x:0, y:0},itemPath);
         tl.layers[0].frames[frameCount].elements[0];
}