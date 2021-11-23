<?php
    define('LOCALHOST','localhost');
    define('DB_USERNAME','root');
    define('DB_PASSWORD','');
    define('DB_NAME','testdb');
    
    $connection = new mysqli(LOCALHOST, DB_USERNAME, DB_PASSWORD,DB_NAME); 
    if($connection->connect_error){
        die("Connection Error:".$connection->connect_error);
    }


?>