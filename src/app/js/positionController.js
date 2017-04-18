angular.module( "RentApp" )
.controller( "PositionController", function( $scope, $mdDialog, distance, address, link, zip, rent, rentUpdate, radarChartData )
{
	$scope.radarChartData = radarChartData;
	console.log( $scope.radarChartData );
	$scope.distance = distance;
	$scope.link = link;
	$scope.address = address;
	$scope.zip = zip;
	$scope.rent = rent;
	$scope.rentUpdate = rentUpdate;

	var margin = { top: 100, right: 100, bottom: 100, left: 100 };
	var width = Math.min( 700, window.innerWidth - 10 ) - margin.left - margin.right;
	var height = Math.min( width, window.innerHeight - margin.top - margin.bottom - 20 );

	var color = d3.scale.ordinal().range(
		["#EDC951", "#CC333F", "#00A0B0"]
	);

	$scope.radarChartOptions = {
		w: width,
		h: height,
		margin: margin,
		maxValue: 10,
		levels: 5,
		roundStrokes: true,
		color: color
	};

	RadarChart( ".radarChart", $scope.radarChartData, $scope.radarChartOptions );

	$scope.hide = function()
	{
		$mdDialog.hide();
    }
} );