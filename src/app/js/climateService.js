angular.module( "RentApp" )
.service( "ClimateService", function( $http )
{
	this.token = "bkkpluExMGYJSXoVxxWyKuTwCQPNIHHN";

	this.getTemperatureAverage = function()
	{
		return $http.get( "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&startdate=2016-02-01&enddate=2017-02-01&stationid=GHCND:USC00111550&datatypeid=TAVG&includemetadata=false", { token: this.token } );
	}

	this.getPrecipitations = function()
	{
		return $http.get( "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&startdate=2016-02-01&enddate=2017-02-01&stationid=GHCND:US1ILCK0036&datatypeid=PRCP&includemetadata=false", { token: this.token } );
	}
} );