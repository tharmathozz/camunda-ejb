app.controller("PagosController", function($scope, UserService, modal) {
	$scope.usuarios = {};

	$scope.usuarios = {
		nombre : "",
		dni : ""
	};

	$scope.guardarUsuario = function() {
		
		$scope.data = $scope.usuarios;
		UserService.add("resources/registrarUsuario", $scope.data).then(
				function(response) {
					//modal.mensajeConfirmacion($scope,"SI INGRESO CORRECTAMENTE",function(){},400);
					modal.mensaje("CONFIRMACION","SI INGRESO CORRECTAMENTE");
				}, function(error) {
					alert('Error');
				});

	};
});