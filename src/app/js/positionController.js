angular.module( "RentApp" )
.controller( "PositionController", function( $scope, $mdDialog, distance, address, link, zip, rent, rentUpdate )
{
	$scope.distance = distance;
	$scope.link = link;
	$scope.address = address;
	$scope.zip = zip;
	$scope.rent = rent;
	$scope.rentUpdate = rentUpdate;

	$scope.hide = function()
	{
		$mdDialog.hide();
    }
} );