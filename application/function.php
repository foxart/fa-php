<?php
function dump($content) {
	ob_start();
	echo '<pre>';
	print_r($content);
	echo '</pre>';
	echo ob_get_clean();
}

