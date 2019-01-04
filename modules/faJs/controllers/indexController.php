<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 01.02.18
 * Time: 11:32
 */

namespace modules\faJs\controllers;

use application\application;
use assets\faJsAsset;

class indexController extends application {
	public function registerAsset() {
		return [
			faJsAsset::class
		];
	}

	public function __construct() {
		$this->setHeader('Fa-js core');
	}

	public $view_path = '../modules/fa-js/views/index/';
	public $menu = [
		'animation' => '/fa-js/animation/index',
		'manipulation' => '/fa-js/manipulation/index',
		'mouse' => '/fa-js/mouse/index',
	];

	public function indexAction() {
		$this->useJs('/test/fa/index.js');
		return $this->getTemplate('index.tpl', [
			'menu-left' => $this->getMenu($this->menu),
		]);
	}
}