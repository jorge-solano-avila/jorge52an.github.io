angular.module( "RentApp" )
.controller( "MainController", function( $scope, NgMap )
{
	$scope.initialPosition = [41.8708, -87.6505];
	$scope.actualPosition = new google.maps.LatLng( $scope.initialPosition[0], $scope.initialPosition[1] );

	NgMap.getMap().then( function( map )
	{
		$scope.map = map;
		$scope.setCenter();
	} );

	$scope.setCenter = function()
	{
		$scope.map.setCenter( $scope.actualPosition );

		var marker = new google.maps.Marker(
		{
			position: $scope.actualPosition,
			animation: google.maps.Animation.DROP,
			map: $scope.map,
			title: "Department of Computer Science - University of Illinois, Chicago"
		} );

		var title = new google.maps.InfoWindow( 
		{
			content: "Department of Computer Science - University of Illinois, Chicago"
		} );

		marker.addListener( "click", function()
		{
			title.open( $scope.map, marker );
		} );
	}
} );