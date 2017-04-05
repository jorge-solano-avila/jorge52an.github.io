angular.module( "RentApp" )
.service( "PositionService", function( $http )
{
	this.getAffordableRentalHousing = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json" );
	}

	this.getCrimes = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.json?accessType=DOWNLOAD&method=getByIds&asHashes=true&start=0&length=200" );
	}
} );