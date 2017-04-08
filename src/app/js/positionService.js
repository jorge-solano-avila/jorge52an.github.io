angular.module( "RentApp" )
.service( "PositionService", function( $http )
{
	this.getRentalHousing = function()
	{
		return $http.get( "http://campuapi.azurewebsites.net/Home/ZillowApi?url=GetRegionChildren.htm?zws-id=X1-ZWz199m9tw1rez_3pg0i$state=il$city=chicago$childtype=neighborhood" );
	}

	this.getAffordableRentalHousing = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json" );
	}

	this.getCrimes = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.json?accessType=DOWNLOAD&method=getByIds&asHashes=true&start=0&length=200" );
	}
} );