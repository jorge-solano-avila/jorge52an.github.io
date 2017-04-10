angular.module( "RentApp" )
.controller( "MainController", function( $scope, $rootScope, $mdSidenav, NgMap, PositionService, LoadingService )
{
	LoadingService.showLoading();
	$rootScope.loading = true;
	$scope.rentalHousingMarkers = [];
	$scope.crimeMarkers = [];
	$scope.maxRent = 0;

	$scope.filters = {
		rent: 0
	};

	$scope.initialPosition = [41.8708, -87.6505];
	$scope.actualPosition = new google.maps.LatLng( $scope.initialPosition[0], $scope.initialPosition[1] );

	NgMap.getMap().then( function( map )
	{
		$scope.map = map;
		$scope.setCenter();

		$scope.showAffordableRentalHousing();
	} );

	$scope.setCenter = function()
	{
		var title = "Department of Computer Science - University of Illinois, Chicago";
		$scope.map.setCenter( $scope.actualPosition );

		$scope.addMarker( "", $scope.initialPosition[0], $scope.initialPosition[1], title, {} );
	}

	$scope.addMarker = function( label, latitude, longitude, title, values )
	{
		var position = new google.maps.LatLng( latitude, longitude );

		var marker = new google.maps.Marker(
		{
			position: position,
			label: label,
			animation: google.maps.Animation.DROP,
			map: $scope.map,
			title: title
		} );

		var infoWindow = new google.maps.InfoWindow( 
		{
			content: title
		} );

		marker.addListener( "click", function()
		{
			infoWindow.open( $scope.map, marker );
		} );

		values.marker = marker;

		return values;
	}

	$scope.showFilters = function() 
	{ 
		$mdSidenav( "left" ).toggle().then( function()
		{

		} ); 
	}

	$scope.closeFilters = function()
	{
		$mdSidenav( "left" ).close().then( function()
		{

		} );
	}

	$scope.filter = function()
	{
		LoadingService.showLoading();
		$rootScope.loading = true;
		for( var i = 0; i < $scope.rentalHousingMarkers.length; ++i )
			if( $scope.rentalHousingMarkers[i].rent < $scope.filters.rent )
				$scope.rentalHousingMarkers[i].marker.setMap( $scope.map );
			else
				$scope.rentalHousingMarkers[i].marker.setMap( null );
		$rootScope.loading = false;
	}

	$scope.showAffordableRentalHousing = function()
	{
		var i = 0;
		angular.forEach( PositionService.zpids, function( zpid )
		{
			PositionService.getRentalHousing( zpid ).then( function( response )
			{
				if( response.data.zestimate.hasOwnProperty( "response" ) && response.data.zestimate.response.hasOwnProperty( "rentzestimate" ) )
				{
					var values = response.data.zestimate.response;
					var address = values.address.street;
					var latitude = values.address.latitude;
					var longitude = values.address.longitude;
					var zip = values.address.zipcode;
					var rentAmount = parseInt( values.rentzestimate.amount.toString() );
					var rentCurrency = values.rentzestimate.amount._currency;
					var rentUpdate = values.rentzestimate["last-updated"];
					values = {
						rent: rentAmount
					};
					var marker = $scope.addMarker( "A", latitude, longitude, address, values );
					if( rentAmount > $scope.maxRent )
						$scope.maxRent = rentAmount;
					$scope.rentalHousingMarkers.push( marker );
				}
				i++;
				if( i === PositionService.zpids.length )
				{
					$scope.filters.rent = $scope.maxRent;
					$rootScope.loading = false;
				}
			} )
			.catch( function( response )
			{
				console.log( "Error" );
			} );
		} );
		/*if( data[i][19] > 41.857057 && data[i][19] < 41.897574 &&
			data[i][20] > -87.686785 && data[i][20] < -87.616983 )*/
	}

	/*$scope.showCrimes = function()
	{
		PositionService.getCrimes().then( function( response )
		{
			var data = response.data;
			for( var i = 0; i < data.length; ++i )
			{
				if( data[i][258138743] > 41.857057 && data[i][258138743] < 41.897574 &&
					data[i][258138744] > -87.686785 && data[i][258138744] < -87.616983 )
				{
					var marker = $scope.addMarker( "S", data[i][258138743], data[i][258138744], data[i][258138727] );
					$scope.crimeMarkers.push( marker );
				}
			}
		} )
		.catch( function( response )
		{
			console.log( "Error" );
		} );
	}*/
} );