selectToFrame();

//��ѡ�з���Ķ�����
var toItem = "ͼ��";
//��ѡ�ж������֡
function selectToFrame(){
	var selItems = fl.getDocumentDOM().library.getSelectedItems();
	for(var i=0;i<selItems.length;i++){
		addFrame(selItems[i].name,(i));
	}
}


//���ͼ�굽�ؼ�֡
//itemPath ���ļ�������·���� frameCountҪ��ӵ���֡λ��
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