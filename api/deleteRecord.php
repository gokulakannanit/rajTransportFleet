<?php

include 'configFunction.php';

$connQuery = '';
$objData = getPOSTData();
$connQuery = " WHERE id=".$objData->id;

$result = mysqli_query($con,"DELETE FROM $tableName".$connQuery) or die(mysql_errno()."error in query execution") ;

mysqli_close($con);
?>