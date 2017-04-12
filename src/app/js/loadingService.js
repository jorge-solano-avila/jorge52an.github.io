angular.module( "RentApp" )
.service( "LoadingService", function( $mdDialog )
{
	this.showLoading = function()
	{
		$mdDialog.show(
		{
			controller: DialogController,
			templateUrl: "loading.html",
			clickOutsideToClose: false
		} );

		function DialogController( $scope, $mdDialog )
		{
			$scope.hide = function()
			{
				$mdDialog.hide();
			};

			$scope.$watch( "$root.loading", function( newValue, oldValue )
			{
				if( newValue !== undefined && !newValue )
					$scope.hide();
			} );
		}
	}
} );