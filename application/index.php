<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 15.02.18
 * Time: 16:22
 */
spl_autoload_register(function ($name) {
	$class = dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $name) . '.php';
	if (is_file($class)) {
		require_once $class;
	}
});
require 'function.php';

use application\application;

$uri = $_SERVER['REQUEST_URI'];
$url = parse_url($uri);
$path = $url['path'];

$match = preg_match('/^\/([^\/]+)\/([^\/]+)\/([^\/]+)$/', $path, $matches);
if ($path === '/' ) {
	$module = 'index';
	$controller = 'index';
	$method = 'index';
} else if ($match === 0) {
	$module = '';
	$controller = '';
	$method = '';
} else {
	$module = $matches[1];
	$controller =  $matches[2];
	$method = $matches[3];
}


$aplication = new application();
$aplication->run($module, $controller, $method);
