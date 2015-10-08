function AppModel(){
	var self = this;
	
	//create a master model
	this.masterModel = [];
	this.carouselModel = [];
	
	//init
	(function (){
		self.createMasterModel();
	})();
	//this.masterModel = ["images/pic1.png", "images/pic2.png", "images/pic3.png", "images/pic4.png", "images/pic5.png", "images/pic6.png"];
//	this.carouselModel = ["images/pic1.png", "images/pic2.png", "images/pic3.png", "images/pic1.png", "images/pic2.png", "images/pic3.png"];
}

AppModel.prototype.createMasterModel = function(){
	for(var i = 1; i <= 200; i++){
		this.masterModel.push("images/pic" + i + ".png");
	}
};

AppModel.prototype.getNextCarouselModel = function(index, numEl){
	var self = this;
	if(index >= self.masterModel.length-1){
		return false;
	}
	Array.prototype.push.apply(self.carouselModel, self.masterModel.slice(index, numEl< self.masterModel.length ? numEl : numEl - (numEl - self.masterModel.length)));
	
	return true;
};