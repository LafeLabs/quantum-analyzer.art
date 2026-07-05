<?php
$spore = "https://quantum-analyzer.art/quantum-analyzer-spore.php";
$baseurl = explode("quantum-analyzer-spore.php",$spore)[0];

$fileNames = [
    "index.html",
    "README.md",
    "geometron-glyph-feed.html",
    "geometron.css",
    "geometron.html",
    "geometron.js",
    "hypercube.json",
    "instrument.html",
    "instrument.json",
    "readme.html",
    "sketch.html"
];

foreach ($fileNames as $fileName) {
    @copy($baseurl.$fileName,$fileName);
}


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