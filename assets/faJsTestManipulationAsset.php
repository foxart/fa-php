<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 19.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class faJsTestManipulationAsset extends asset
{
	public $css_url = '/test/fa/manipulation/';
	public $js_url = '/test/fa/manipulation/';
	public $css = [
	];
	public $js = [
		'_dynamic.js',
	];
	public $dependency = [
		faJsTestAsset::class,
	];
}

