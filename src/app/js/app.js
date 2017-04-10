angular.module( "RentApp", ["ngAnimate", "ngAria", "ngMaterial", "ngMap", "xml"], function()
{} )
.config( function( $mdIconProvider, $httpProvider, $mdAriaProvider )
{
	$mdAriaProvider.disableWarnings();
	$mdIconProvider.defaultFontSet( "material-icons" );

	$httpProvider.interceptors.push( "xmlHttpInterceptor" );
} );