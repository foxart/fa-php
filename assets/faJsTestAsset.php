<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 19.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class faJsTestAsset extends asset
{
	public $css_url = '/test/fa/';
	public $js_url = '/test/fa/';
	public $css = [
		'block.css',
	];
	public $js = [
	];
	public $dependency = [
		faJsAsset::class,
		jqueryAsset::class,
	];
}

