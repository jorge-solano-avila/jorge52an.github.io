angular.module( "RentApp", ["ngAnimate", "ngAria", "ngMaterial", "ngMap", "xml"], function()
{} )
.config( function( $mdIconProvider, $httpProvider )
{
	$mdIconProvider.defaultFontSet( "material-icons" );

	$httpProvider.interceptors.push( "xmlHttpInterceptor" );
} );