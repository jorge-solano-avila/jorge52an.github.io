angular.module( "RentApp" )
.service( "PositionService", function( $http )
{
	this.ZPIDs = [3874355, 2102438964, 2100595411, 2096615389, 87718017, 87707655, 87693778, 2107458332, 2098735362, 2094909459, 
		60270592, 2097948818, 2095254832, 2094930095, 60203847, 62013380, 60270091, 2112604850];

	this.getRentalHousing = function()
	{
		return $http.get( "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz199m9tw1rez_3pg0i&zpid=3874355" );
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