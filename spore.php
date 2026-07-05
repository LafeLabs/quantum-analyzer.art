<?php
$spore = "https://quantum-analyzer.art/spore.php";
$baseurl = explode("spore.php",$spore)[0];

@copy($baseurl."index.html","index.html");
@copy($baseurl."README.md","README.md");

?>
<a href = "index.html">index.html</a>
<style>
body{
    font-size:3em;
    font-family:arial;
}
a{
    font-size:3em;
    color:blue;
}
</style>