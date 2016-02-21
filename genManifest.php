<?php

$uselessFiles = array(
   "assets/CHARS/IMAGES/CHME01BK.JPG",
   "assets/TECH/IMAGES/TECHMENU.JPG"
);

function dirToManifest($dir) {
   global $uselessFiles;
  // http://php.net/manual/fr/function.scandir.php#110570
  // Browse recursively directory and construct relative path to each file
   $result = "";
   $cdir = scandir($dir);
   foreach ($cdir as $key => $value)
   {
      if (!in_array($value, array(".","..")))
      {
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
         {
            $result .= dirToManifest($dir . DIRECTORY_SEPARATOR . $value).PHP_EOL;
         }
         else
         {
            if (!in_array($dir."/".$value, $uselessFiles)){
               $result .= $dir."/".$value.PHP_EOL;
            }
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
//$data .= "css/app.css".PHP_EOL;
//$data .= "app.js".PHP_EOL.PHP_EOL;
$data .= "css/fonts/mech_monoline-webfont.eot".PHP_EOL;
$data .= "css/fonts/mech_monoline-webfont.svg".PHP_EOL;
$data .= "css/fonts/mech_monoline-webfont.ttf".PHP_EOL;
$data .= "css/fonts/mech_monoline-webfont.woff".PHP_EOL;
$data .= "css/fonts/mech_monoline-webfont.woff2".PHP_EOL.PHP_EOL;


$data .= dirToManifest("assets");

$data .= "NETWORK:".PHP_EOL;
$data .= "css/app.css".PHP_EOL;
$data .= "app.js".PHP_EOL;

$file = fopen("cache.manifest", "w") or die("Unable to open file!");
fwrite($file, $data);
fclose($file);