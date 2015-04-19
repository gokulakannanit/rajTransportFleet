<?php

include '../configFunction.php';

$connQuery = '';
if($_REQUEST['id'] !== 'all'){
	$connQuery = " WHERE id=".$_REQUEST['id'];
}
$result = mysqli_query($con,"SELECT * FROM companylist".$connQuery) or die(mysql_errno()."error in query execution");

$json_response  = array();

while ($row = mysqli_fetch_assoc($result)) {
    array_push($json_response, $row);
}


echo json_encode($json_response);

mysqli_close($con);
?>