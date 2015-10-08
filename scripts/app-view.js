function AppView(dom){
	this.dom = dom;
}

AppView.prototype.createCarousel = function(carouselModel, liWidth, slideId) {
	//cache ul
	var ulEl = this.dom.create("ul");
	
	//create carousel items
	ulEl = this.crealeCarouselItem(carouselModel, liWidth, ulEl);

	this.dom.append(ulEl, slideId);

};

AppView.prototype.crealeCarouselItem = function(carouselModel, liWidth, ulEl){
	//iterate over carouselModel and create li
	for(var i = 0; i < carouselModel.length; i++){
		var liEl = this.dom.create("li"),
			imgEl = this.dom.create("img");
		var left = (function(){
			if(ulEl.childElementCount == 0){
				return -250;
			}else{
				return parseInt(ulEl.lastChild.style.left);
			}
		})();
		liEl.style.left = left + liWidth + "px";

		//set height, width, src and alt 
		imgEl.setAttribute("height", "200px");
		imgEl.setAttribute("width", "200px");
		imgEl.setAttribute("src", carouselModel[i]);
		imgEl.setAttribute("alt", carouselModel[i]);

		this.dom.append(imgEl, liEl);

		this.dom.append(liEl, ulEl);
	}
	
	return ulEl;
};