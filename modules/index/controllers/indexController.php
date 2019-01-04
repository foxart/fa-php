<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 01.02.18
 * Time: 11:32
 */

namespace modules\index\controllers;

use application\application;

use assets\qunitAsset;

class indexController extends application
{
	public function __construct() {
		$this->setHeader('Home page');
	}

	public $view_path = '../modules/index/views/index/';
	public $menu = [];

	public function registerAsset() {
		return [
			qunitAsset::class,
		];
	}

	public function indexAction() {
		return $this->getTemplate('index.tpl', [
		]);
	}
}