function appController(appModel, appView, dom){
	var itemsCount = appModel.carouselModel.length,
		lastItemIndex = 2,
		itemsPending = itemsCount - 1 - lastItemIndex;
	
	//get the model
	getMoreModel();
	
	//create carousel
	appView.createCarousel(appModel.carouselModel, 250, dom.get("#slides"));

	var itemWidth = dom.get("li").offsetWidth,	//total width of li item
		prevEl = dom.get("#prev"),	//caching prev button
		nextEl = dom.get("#next"),	//caching next button
		interval = 1000,			//time interval between infinite scrolling of carousel
		intervalContainer,
		liEl = dom.getAll("li"); 	//caching li element
	
	
	

	//mousedown event on #prev
	prevEl.addEventListener("mousedown", function(event){
		event.preventDefault();
		if(!(lastItemIndex-- <= 2)){
			prevClickHandler();
		}else{
			lastItemIndex++;
		}
		

		intervalContainer = setInterval(function(){
			
			if(lastItemIndex-- <= 2){
				lastItemIndex++;
				clearInterval(intervalContainer);
			}else{
				prevClickHandler();
			}
			
			
		}, interval);

		/**
		 * @description
		 * iterate through the li elements collection. Set first element as the last element, second as the first element and so on
		 */
		function prevClickHandler(){
			for(var i = 0; i < liEl.length; i++){
				var item = liEl[i];
				item.style.left = parseInt(item.style.left) + itemWidth + "px";
			}
		}
	});

	//mouseup event on #prev
	prevEl.addEventListener("mouseup", function(event){
		clearInterval(intervalContainer);
	});


	//mousedown event on #next
	nextEl.addEventListener("mousedown", function(event){
		event.preventDefault();
		if(itemsPending){
			NextClickHandler();
			lastItemIndex++;
			itemsPending = itemsCount - 1 - lastItemIndex;
		}else{
//			lastItemIndex--;
			//add more model
			getMoreModel();
			//create carousel item and append it to the ul
			var ulEl = dom.get("ul");
			appView.crealeCarouselItem(appModel.carouselModel.slice(lastItemIndex + 1, itemsCount), 250, ulEl);
			setTimeout(function(){
				if(itemsPending){
					NextClickHandler();
					lastItemIndex++;
					itemsPending = itemsCount - 1 - lastItemIndex;
					console.log(itemsPending);
				}
			}, 500);
		}
		

		function startInterval(){
			intervalContainer = setInterval(intervalCallback, interval);
		}
		startInterval();
		
		function intervalCallback(){
			if(lastItemIndex++ > itemsCount - 2){
				--lastItemIndex;
				clearInterval(intervalContainer);
				//add more model
				getMoreModel();
				//create carousel item and append it to the ul
				var ulEl = dom.get("ul");
				appView.crealeCarouselItem(appModel.carouselModel.slice(lastItemIndex + 1, itemsCount), 250, ulEl);
				startInterval();
			}else{
				NextClickHandler();
			}
		}

		/**
		 * @description
		 * iterate through the li elements collection. Set last element as the first element, first as the second element and so on
		 */
		function NextClickHandler(){
			for(var i = liEl.length - 1; i >= 0 ; i--){
				var item = liEl[i];
				
				item.style.left = parseInt(item.style.left) - itemWidth + "px";
			}
		}
	});

	//mouseup event on #next
	nextEl.addEventListener("mouseup", function(event){
		clearInterval(intervalContainer);
	});
	
	function getMoreModel(){
		var dataFound = appModel.getNextCarouselModel(itemsCount, (lastItemIndex+1)*2);
		if(dataFound){
			
			itemsCount = appModel.carouselModel.length;
			itemsPending = itemsCount - 1 - lastItemIndex;
		}
	}
}

appController(new AppModel, new AppView(new DomUtility), new DomUtility);
