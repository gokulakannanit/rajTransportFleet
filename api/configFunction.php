<?php

$con = mysqli_connect("localhost","root","","logistics");

// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}else{
	return $con;
}

function getPOSTData(){
	$data = file_get_contents("php://input");
	return json_decode($data);
}
function getQueryValue($isUpdate, $objData){
	$valuePair = "";
	if($isUpdate){
		foreach($objData as $key => $value) {
			if($key !== 'id'){
				if($valuePair !== ""){
					$valuePair .= ", ";
				}
				$valuePair .= "$key = '$value'";
			}    
		}
	}else{
		$keys = "";
		$values = "";
		foreach($objData as $key => $value) {
			if($key !== 'id'){
				if($keys !== ""){
					$keys .= ", ";
				}
				if($values !== ""){
					$values .= ", ";
				}
				$values .= "'$value'";
				$keys .= "$key";
			}    
		}
		$valuePair = "($keys) VALUES ($values)";		
	}
	
	return $valuePair;
}
?>