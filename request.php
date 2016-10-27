<?php
    $conf = parse_ini_file ("conf.ini",TRUE);
    $api_key=($conf["API_KEY"]);
    $url="https://glassfrog.holacracy.org/api/v3/circles/".$_GET['circle']."/roles?api_key=".$api_key;
    $data = file_get_contents($url);
    echo $data;
?>