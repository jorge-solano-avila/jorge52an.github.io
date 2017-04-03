angular.module( "RentApp" )
.controller( "MainController", function( $scope, NgMap )
{
	$scope.map = {
		initialPosition: [41.8708, -87.6505],
		zoom: 15
	};
} );