angular.module( "RentApp" )
.service( "PositionService", function()
{
	this.getAffordableRentalHousing = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json" );
	}
} );