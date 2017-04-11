angular.module( "RentApp" )
.controller( "PositionController", function( $scope, $mdDialog, address, link, zip, rent, rentUpdate )
{
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