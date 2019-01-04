<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 19.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class faJsAsset extends asset
{
	public $css_url = '/css/';
	public $js_url = '/js/';
	public $css = [
	];
	public $js = [
		'fa.js',
		'fa-animation.js',
		'fa-events.js',
		'fa-function.js',
		'fa-helper.js',
		'fa-manipulation.js',
		'fa-traversing.js',
	];
	public $dependency = [
		qunitAsset::class
	];
}

