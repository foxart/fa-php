<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 19.02.18
 * Time: 17:11
 */

namespace assets;

use application\asset;

class qunitAsset extends asset {
	public $css_url = '/assets/qunit/';
	public $js_url = '/assets/qunit/';
	public $css = [
		'qunit.css',
	];
	public $js = [
		'qunit.js',
	];
	public $dependency = [

	];
}

