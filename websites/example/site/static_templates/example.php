<?php

require './lib/auth.php';

if(!isset($_GET['number']) || 
    !isset($_GET['string'])
){
    $results->result = -2;
    exit(json_encode($results));
}

$number = $_GET['number'];
$string = $_GET['string'];

?> 

<div class="text">
    Number is: <?php echo $number ?>
    Text is: <?php echo $string ?>
</div>