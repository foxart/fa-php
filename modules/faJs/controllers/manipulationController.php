<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 01.02.18
 * Time: 11:32
 */

namespace modules\faJs\controllers;

use assets\faJsTestAsset;
use assets\faJsTestManipulationAsset;

class manipulationController extends indexController
{
	public function registerAsset() {
		return [
			faJsTestManipulationAsset::class,
		];
	}

	public $view_path = '../modules/fa-js/views/manipulation/';
	public $menu = [
		'add/remove' => '/fa-js/manipulation/add-remove',
		'append/prepend' => '/fa-js/manipulation/append-prepend',
		'before/after' => '/fa-js/manipulation/before-after',
		'tests' => '/fa-js/manipulation/tests',
	];

	public function indexAction() {
		return $this->getTemplate( [
			'menu-left' => $this->getMenu($this->menu),
		]);
	}

	public function addRemoveAction() {
		$this->useJs('/test/fa/manipulation/add-remove.js');

		return $this->getTemplate( [
			'menu-left' => $this->getMenu($this->menu),
			'title' => $this->getTitle(),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function beforeAfterAction() {
		$this->useJs('/test/fa/manipulation/before-after.js');

		return $this->getTemplate([
			'menu-left' => $this->getMenu($this->menu),
			'title' => $this->getTitle(),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function appendPrependAction() {
		$this->useJs('/test/fa/manipulation/append-prepend.js');

		return $this->getTemplate( [
			'menu-left' => $this->getMenu($this->menu),
			'title' => $this->getTitle(),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}
}
