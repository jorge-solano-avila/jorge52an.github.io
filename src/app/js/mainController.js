angular.module( "RentApp" )
.controller( "MainController", function( $scope, $rootScope, $mdSidenav, $mdDialog, $mdToast, NgMap, PositionService, LoadingService )
{
	LoadingService.showLoading();
	$rootScope.loading = true;
	$scope.init = false;
	$scope.rentalHousingMarkers = [];
	$scope.crimePositions = [];
	$scope.policeStationPositions = [];
	$scope.parkPositions = [];
	$scope.groceryStorePositions = [];
	$scope.rentPositions = [];
	$scope.markers = [];
	$scope.addresses = [];
	$scope.radarChartData = [];
	$scope.radarAux = [];

	$scope.travelModes = [{
		model: "DRIVING",
		text: "Driving"
	},
	{
		model: "WALKING",
		text: "Walking"
	},
	{
		model: "BICYCLING",
		text: "Bicycling"
	},
	{
		model: "TRANSIT",
		text: "Transit"
	}];

	$scope.direction = {
		origin: {
			address: "",
			marker: null
		},
		travelMode: ""
	};

	$scope.rent = {
		max: 0,
		min: Infinity,
		filter: 0
	};

	$scope.distance = {
		max: 0,
		min: Infinity,
		filter: 0
	};

	$scope.initialPosition = [41.8708, -87.6505];
	$scope.universityPosition = new google.maps.LatLng( $scope.initialPosition[0], $scope.initialPosition[1] );

	NgMap.getMap().then( function( map )
	{
		$scope.map = map;
		$scope.directionsService = new google.maps.DirectionsService;
		$scope.directionsDisplay = new google.maps.DirectionsRenderer;
		$scope.setCenter();
		$scope.directionsDisplay.setMap( $scope.map );

		$scope.showAffordableRentalHousing();
	} );

	$scope.setCenter = function()
	{
		var title = "Department of Computer Science - University of Illinois, Chicago";
		$scope.map.setCenter( $scope.universityPosition );

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
			if( label === "" )
				infoWindow.open( $scope.map, marker );
			else
				$mdDialog.show(
				{
					controller: "PositionController",
					templateUrl: "app/html/position.html",
					parent: angular.element( document.body ),
					clickOutsideToClose: true,
					fullscreen: true,
					locals: values
				} )
				.then( function()
				{

				} )
				.catch( function()
				{

				} );
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
			if( $scope.rentalHousingMarkers[i].rent <= $scope.rent.filter &&
				$scope.rentalHousingMarkers[i].distance <= $scope.distance.filter )
				$scope.rentalHousingMarkers[i].marker.setMap( $scope.map );
			else
				$scope.rentalHousingMarkers[i].marker.setMap( null );
		$rootScope.loading = false;
	}

	$scope.showDirection = function()
	{
		if( $scope.direction.origin.marker === null )
		{
			$mdToast.show(
				$mdToast.simple()
					.textContent( "Select a correct address" )
					.position( "top right" )
					.hideDelay( 3000 )
			);
			return;
		}
		$scope.directionsService.route(
		{
			origin: { lat: $scope.direction.origin.marker.position.lat(), lng: $scope.direction.origin.marker.position.lng() },
			destination: { lat: $scope.universityPosition.lat(), lng: $scope.universityPosition.lng() },
			travelMode: $scope.direction.travelMode
		}, function( response, status )
		{
			if( status === "OK" )
				$scope.directionsDisplay.setDirections( response );
		} );
	}

	$scope.computeDistanceBetween = function( position1, position2 )
	{
		return parseInt( google.maps.geometry.spherical.computeDistanceBetween( position1, position2 ) );
	}

	$scope.showAffordableRentalHousing = function()
	{
		$scope.i = 0;
		angular.forEach( PositionService.zpids, function( zpid )
		{
			PositionService.getRentalHousing( zpid ).then( function( response )
			{
				if( response.data.zestimate.hasOwnProperty( "response" ) && response.data.zestimate.response.hasOwnProperty( "rentzestimate" ) )
				{
					var values = response.data.zestimate.response;
					var link = values.links.homedetails;
					var address = values.address.street;
					var latitude = values.address.latitude;
					var longitude = values.address.longitude;
					var zip = values.address.zipcode;
					var rentAmount = parseInt( values.rentzestimate.amount.toString() );
					var rentCurrency = values.rentzestimate.amount._currency;
					var rentUpdate = values.rentzestimate["last-updated"];
					var rentPosition = new google.maps.LatLng( latitude, longitude );
					var distance = $scope.computeDistanceBetween( $scope.universityPosition, rentPosition );
					var sum = 0.0001;
					latitude = parseFloat( latitude );
					longitude = parseFloat( longitude );
					while( true )
					{
						var exists = false;
						for( var i = 0; i < $scope.rentPositions.length; ++i )
							if( parseFloat( $scope.rentPositions[i].lat() ) === latitude )
							{
								exists = true;
								latitude += sum;
								break;
							}
						if( !exists )
							break;
					}
					values = {
						distance: distance,
						link: link,
						address: address,
						zip: zip,
						rent: rentAmount,
						rentUpdate: rentUpdate
					};

					if( rentAmount > $scope.rent.max )
						$scope.rent.max = rentAmount;
					if( rentAmount < $scope.rent.min )
						$scope.rent.min = rentAmount;
					if( distance > $scope.distance.max )
						$scope.distance.max = distance;
					if( distance < $scope.distance.min )
						$scope.distance.min = distance;
					$scope.rentalHousingMarkers.push( values );
					$scope.rentPositions.push( rentPosition );
					$scope.addresses.push( values.address );
					$scope.radarAux.push(
					{
						distance: values.distance,
						rentalPrice: -1 * values.rent
					} );
					$scope.radarChartData.push( [] );
				}
				$scope.i++;
				if( $scope.i === PositionService.zpids.length )
				{
					$scope.rent.filter = $scope.rent.max;
					$scope.distance.filter = $scope.distance.max;
					$scope.getCrimePositions();
				}
			} )
			.catch( function( response )
			{
				console.log( "Error" );
			} );
		} );
	}

	$scope.getCrimePositions = function()
	{
		PositionService.getCrimes().then( function( response )
		{
			var data = response.data;
			for( var i = 0; i < data.length; ++i )
			{
				var latitude = parseFloat( data[i][258138743] );
				var longitude = parseFloat( data[i][258138744] );
				if( latitude > 41.857057 && latitude < 41.897574 &&
					longitude > -87.686785 && longitude < -87.616983 )
				{
					var crimePosition = new google.maps.LatLng( latitude, longitude );
					$scope.crimePositions.push( crimePosition );
				}
			}
			for( var i = 0; i < $scope.rentPositions.length; ++i )
			{
				var sum = 0;
				for( var j = 0; j < $scope.crimePositions.length; ++j )
					sum += $scope.computeDistanceBetween( $scope.rentPositions[i], $scope.crimePositions[j] );
				$scope.radarAux[i].safety = sum;
			}
			$scope.getPoliceStationPositions();
		} )
		.catch( function( response )
		{
			console.log( "Error" );
			$rootScope.loading = false;
			$scope.init = true;
		} );
	}

	$scope.getPoliceStationPositions = function()
	{
		PositionService.getPoliceStations().then( function( response )
		{
			var data = response.data.data;
			for( var i = 0; i < data.length; ++i )
			{
				var latitude = parseFloat( data[i][20] );
				var longitude = parseFloat( data[i][21] );
				if( latitude > 41.857057 && latitude < 41.897574 &&
					longitude > -87.686785 && longitude < -87.616983 )
				{
					var policeStationPosition = new google.maps.LatLng( latitude, longitude );
					$scope.policeStationPositions.push( policeStationPosition );
				}
			}
			for( var i = 0; i < $scope.rentPositions.length; ++i )
			{
				var sum = 0;
				for( var j = 0; j < $scope.policeStationPositions.length; ++j )
					sum += $scope.computeDistanceBetween( $scope.rentPositions[i], $scope.policeStationPositions[j] );
				$scope.radarAux[i].safety -= sum;
			}
			$scope.getParkPositions();
		} )
		.catch( function( response )
		{
			console.log( "Error" );
			$rootScope.loading = false;
			$scope.init = true;
		} )
	}

	$scope.getParkPositions = function()
	{
		PositionService.getParks().then( function( response )
		{
			var data = response.data.data;
			for( var i = 0; i < data.length; ++i )
			{
				var latitude = parseFloat( data[i][14][1] );
				var longitude = parseFloat( data[i][14][2] );
				if( latitude > 41.857057 && latitude < 41.897574 &&
					longitude > -87.686785 && longitude < -87.616983 )
				{
					var parkPosition = new google.maps.LatLng( latitude, longitude );
					$scope.parkPositions.push( parkPosition );
				}
			}
			for( var i = 0; i < $scope.rentPositions.length; ++i )
			{
				var sum = 0;
				for( var j = 0; j < $scope.parkPositions.length; ++j )
					sum -= $scope.computeDistanceBetween( $scope.rentPositions[i], $scope.parkPositions[j] );
				$scope.radarAux[i].parks = sum;
			}
			$scope.getGroceryStoresPositions();
		} )
		.catch( function( response )
		{
			console.log( "Error" );
			$rootScope.loading = false;
			$scope.init = true;
		} )
	}

	$scope.getGroceryStoresPositions = function()
	{
		PositionService.getGroceryStores().then( function( response )
		{
			var data = response.data.data;
			for( var i = 0; i < data.length; ++i )
			{
				var latitude = parseFloat( data[i][22] );
				var longitude = parseFloat( data[i][23] );
				if( latitude > 41.857057 && latitude < 41.897574 &&
					longitude > -87.686785 && longitude < -87.616983 )
				{
					var groceryStorePosition = new google.maps.LatLng( latitude, longitude );
					$scope.groceryStorePositions.push( groceryStorePosition );
				}
			}
			for( var i = 0; i < $scope.rentPositions.length; ++i )
			{
				var sum = 0;
				for( var j = 0; j < $scope.groceryStorePositions.length; ++j )
					sum -= $scope.computeDistanceBetween( $scope.rentPositions[i], $scope.groceryStorePositions[j] );
				$scope.radarAux[i].groceryStores = sum;
			}
			$scope.computeRadarChartData();
		} )
		.catch( function( response )
		{
			console.log( "Error" );
			$rootScope.loading = false;
			$scope.init = true;
		} )
	}

	$scope.sort = function( array )
	{
		var values = angular.copy( array );
		for( var i = 1; i < values.length; ++i )
		{
			var value = values[i];
			for( var j = i - 1; j >= 0; --j )
				if( value < values[j] )
				{
					values[j + 1] = values[j];
					values[j] = value;
				}
		}
		return values;
	}

	$scope.keyRadarChart = function( key, axis )
	{
		var values = $scope.sort( $scope.radarAux.map( function( element )
		{
			return element[key];
		} ) );
		for( var i = 0; i < $scope.radarAux.length; ++i )
			for( var j = 0; j < values.length; ++j )
				if( $scope.radarAux[i][key] === values[j] )
				{
					$scope.radarChartData[i].push( {
						axis: axis,
						value: j
					} );
					break;
				}
	}

	$scope.computeRadarChartData = function()
	{
		var values = [
		{
			key: "distance",
			axis: "Closeness"
		},
		{
			key: "rentalPrice",
			axis: "Cheaper rental"
		},
		{
			key: "safety",
			axis: "Safety"
		},
		{
			key: "parks",
			axis: "Parks & Recreation"
		},
		{
			key: "groceryStores",
			axis: "Accessibility to grocery stores"
		}];
		for( var i = 0; i < values.length; ++i )
			$scope.keyRadarChart( values[i].key, values[i].axis );
		for( var i = 0; i < $scope.rentPositions.length; ++i )
		{
			var aux = angular.copy( $scope.rentalHousingMarkers[i] );
			aux.radarChartData = [$scope.radarChartData[i]];
			aux = $scope.addMarker( "A", aux.latitude, aux.longitude, aux.address, aux );
			console.log( aux );
			$scope.markers.push( aux.marker );
		}

		console.log( $scope.markers );
		//new MarkerClusterer( $scope.map, $scope.markers, { imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" } );

		$rootScope.loading = false;
		$scope.init = true;
	}

	$scope.$watch( "direction.origin.address", function( newValue, oldValue )
	{
		if( newValue !== "" )
			for( var i = 0; i < $scope.rentalHousingMarkers.length; ++i )
				if( $scope.rentalHousingMarkers[i].address === newValue )
					$scope.direction.origin.marker = $scope.rentalHousingMarkers[i].marker;
	} );
} );