	app.controller("PersonalController",function($scope,UserService,modal,NgTableParams){
    
    var paramsTabla1 = {count: 10};
    var settingTabla1 = {counts: []};
    $scope.tabla1 = new NgTableParams(paramsTabla1, settingTabla1);
  
        
    $scope.listar1 = function(){
    	
//        UserService.getAll("resources/aprobarRequisito").then(
//				function(response){
//
//					console.log(response);
//					console.log("11111111-------1111111");
//				},
//				function(error){
//					alert('Error');
//				}
//		);
                UserService.getTasks("resources/mesapartes",null).then(
    			function(response){
//					setting.dataset = response;
//		            iniciarPosiciones(setting.dataset);
//		            $scope.miTabla.settings(setting);
    				
    				var process = response.body.task;
    				settingTabla1.dataset = [];
    				for(var i = 0; i < process.length; i++) settingTabla1.dataset.push(process[i].headerDto);	
    				iniciarPosiciones(settingTabla1.dataset);
    		        $scope.tabla1.settings(settingTabla1);
    				console.log(response);
    				console.log('Exito3333')
    			},
    			function(error){
    				console.log('Error');
    			}
    	)
        
        
                
    };
    
    //$scope.listar1();
    
    var paramsTabla2 = {count: 10}; 
    var settingTabla2 = {counts: []};
    $scope.tabla2 = new NgTableParams(paramsTabla2, settingTabla2);
        
    $scope.listar2 = function(){
    	
    	settingTabla2.dataset = [{
			perId:12,    	
			perDNI:"34344512",
			perNom:"nfsdfs sfdjhsd",
			perAsu:"sdfksdjhf sdfkjshdfkjh",
			detalle:"detalle1 sdfsdfsdfsdf",
    	},{
			perId:13,    	
			perDNI:"7456745",
			perNom:"jksdhfs sdjhfgsjdhf",
			perAsu:"TRAEAEEAERAR AEAE",
			detalle:"Detalle2",
    	}];
        iniciarPosiciones(settingTabla2.dataset);            
        $scope.tabla2.settings(settingTabla2);
        
                
    };
    
    $scope.listar2();
            
    $scope.reqActual = {};
        
    $scope.aprobarRequerimiento = function(i, d){    	
    	$scope.reqActual = d;
    	$("#modalAprobar").modal('show');
    	
    };
    
    $scope.aprobarReq = function(f){
    	
//    	$scope.reqActual.estado = f;    
//    	delete $scope.reqActual['i'];  
    	
    	$scope.request = {
			    header: {
		    		executionId:$scope.reqActual.executionId,
		    		taskId:	$scope.reqActual.taskId
			    },
			    body: {
			        completed: f
			    }
		};
		
		UserService.add("resources/mesapartes", $scope.request).then(
				function(response) {
					// modal.mensajeConfirmacion($scope,"SI INGRESO
					// CORRECTAMENTE",function(){},400);
					modal.mensaje("CONFIRMACION","SE APROBO CORRECTAMENTE");
					eliminarElemento(settingTabla1.dataset, $scope.reqActual['i']);
					$scope.tabla1.reload();
				}, function(error) {
					alert('Error');
				});
    	
    	
    	
//    	$scope.reqActual.estado = f;    
//    	delete $scope.reqActual['i'];
//    	UserService.add("resources/aprobarRequisito", $scope.reqActual).then(
//				function(response){
//					console.log("se aprobo el requerimiento");
//				},
//				function(error){
//					alert('Error');
//				}
//		);
    	    	
    };
    
    
    
    $scope.registrarRequerimiento = function(i, d){
    	$scope.reqActual = d;
    	$("#modalRegistrarReq").modal('show');    	
    };
    
    $scope.registrarReq = function(d){
    	$scope.reqActual.detalle = d;    	
    };

//    $scope.cerrarModalPariente = function(){
//        $scope.listar();
//        $('#modalEditar').modal('show');                
//    }
	
});
	