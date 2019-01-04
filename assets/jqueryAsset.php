<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 20.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class jqueryAsset extends asset {
	public $css_url = '/assets/jquery/';
	public $js_url = '/assets/jquery/';
	public $css = [
	];
	public $js = [
		'jquery-3.3.1.js',
	];
	public $dependency = [
	];
}

