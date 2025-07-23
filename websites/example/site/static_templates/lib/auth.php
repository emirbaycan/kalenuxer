<?php

if(!isset($_GET['api_key'])){
 exit(0);
}

$results = (Object) [];

$api_key = $_GET['api_key'];

$root = $_SERVER['DOCUMENT_ROOT'];

require $root.'/api/lib/database/Sql.php';

$sql = new Sql();
$mysqli = $sql->connect();
$m = $sql->count($mysqli,'SELECT count(id) as count FROM site WHERE api_key=?',[$api_key]);

if($m->count===0){
    $results->result = -1;
    exit(json_encode($results));
}