<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 19.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class faJsTestMouseAsset extends asset
{
	public $css_url = '/test/fa/mouse/';
	public $js_url = '/test/fa/mouse/';
	public $css = [
	];
	public $js = [
		'_debug.js',
		'_dynamic.js',
	];
	public $dependency = [
		faJsTestAsset::class,
	];
}

