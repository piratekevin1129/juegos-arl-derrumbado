<?php 
$folder = '../assets/images/temblando';
$total = count(scandir($folder))-2;

for($i = 1;$i<=$total;$i++){
	$old = '';
	if($i<=9){
		$old = $folder.'/imagen000'.$i.'.png';
	}else if($i>9&&$i<=99){
		$old = $folder.'/imagen00'.$i.'.png';
	}else{
		$old = $folder.'/imagen0'.$i.'.png';
	}
	$new = $folder.'/imagen'.$i.'.png';
	rename($old,$new);
}

/*$folder = 'salto';
$total = count(scandir($folder))-2;

$j = 1;
$k = 1;
for($i = 1;$i<=$total;$i++){
	//$old = $folder.'/imagen'.$j.'.png';
	//$new = $folder.'/imagen'.$k.'--.png';
	//$k+=1;
	//$j+=2;

	//echo $old.'---'.$new.'<br />';
	//rename($old, $new);

	$old = $folder.'/imagen'.$i.'--.png';
	$new = $folder.'/imagen'.$i.'.png';

	rename($old, $new);
}*/
?>