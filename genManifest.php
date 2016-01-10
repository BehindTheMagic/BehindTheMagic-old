<?php

function dirToManifest($dir) {
  // http://php.net/manual/fr/function.scandir.php#110570
  // Browse recursively directory and construct relative path to each file
   $result = "";
   $cdir = scandir($dir);
   foreach ($cdir as $key => $value)
   {
      if (!in_array($value,array(".","..")))
      {
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
         {
            $result .= dirToManifest($dir . DIRECTORY_SEPARATOR . $value).PHP_EOL;
         }
         else
         {
            $result .= $dir."/".$value.PHP_EOL;
         }
      }
   }
   return $result;
}

$data  = "CACHE MANIFEST".PHP_EOL.PHP_EOL;
$data .= "#v1.0".PHP_EOL;
$data .= "#".date("Y-m-d H:i:s").PHP_EOL.PHP_EOL;
$data .= "CACHE:".PHP_EOL.PHP_EOL;

$data .= "index.html".PHP_EOL;
$data .= "css/app.css".PHP_EOL;
$data .= "app.js".PHP_EOL.PHP_EOL;

$data .= dirToManifest("assets");

$data .= "NETWORK:".PHP_EOL;
$data .= "*".PHP_EOL.PHP_EOL;
$data .= "FALLBACK:".PHP_EOL;
$data .= "*";

$file = fopen("cache.manifest", "r+") or die("Unable to open file!");
fwrite($file, $data);
fclose($file);