<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 01.02.18
 * Time: 11:32
 */

namespace modules\block\controllers;

use application\application;

class indexController extends application
{
	public function __construct() {
		$this->setHeader('Fa-js block plugin');
	}
	public $view_path = '../modules/block/views/index/';
	public $menu = [];

	public function indexAction() {
		return $this->getTemplate('index.tpl', [
//			'menu' => $this->getMenu(),
		]);
	}
}