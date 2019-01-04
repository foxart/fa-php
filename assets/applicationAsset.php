<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 19.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class applicationAsset extends asset {
	public $css_url = '/css/';
	public $js_url = '/js/';
	public $css = [
		'site.css',
		'fa.css',
		'fa-color.css',
		'fa-color-blue.css',
		'fa-color-red.css',
	];
	public $js = [
	];
	public $dependency = [
	];
}

