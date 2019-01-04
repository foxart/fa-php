<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 01.02.18
 * Time: 11:32
 */

namespace modules\faJs\controllers;

use assets\faJsTestMouseAsset;

class mouseController extends indexController {
	public function __construct() {
		parent::__construct();
		$this->setHeader('Fa-js mouse events');
	}

	public $view_path = '../modules/fa-js/views/mouse/';

	public function registerAsset() {
		return [
			faJsTestMouseAsset::class,
		];
	}

	public $menu = [
//hover() both enter/leave
		'context menu' => '/fa-js/mouse/context-menu',
		'click' => '/fa-js/mouse/click',
		'down/up' => '/fa-js/mouse/down-up',
		'enter/leave' => '/fa-js/mouse/enter-leave',
		'over/out' => '/fa-js/mouse/over-out',
		'move' => '/fa-js/mouse/move',
		'tests' => '/fa-js/mouse/tests',
	];

	public function indexAction() {
		return $this->getTemplate('index.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function contextMenuAction() {
		$this->useJs('/test/fa/mouse/context-menu.js');
		return $this->getTemplate('context-menu.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function clickAction() {
		$this->useJs('/test/fa/mouse/click.js');
		return $this->getTemplate('click.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function enterLeaveAction() {
		$this->useJs('/test/fa/mouse/enter-leave.js');
		return $this->getTemplate('enter-leave.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}


	public function downUpAction() {
		$this->useJs('/test/fa/mouse/down-up.js');
		return $this->getTemplate('down-up.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function overOutAction() {
		$this->useJs('/test/fa/mouse/over-out.js');
		return $this->getTemplate('over-out.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	public function moveAction() {
		$this->useJs('/test/fa/mouse/move.js');
		return $this->getTemplate('move.tpl', [
			'menu-left' => $this->getMenu($this->menu),
			'_block' => $this->getTemplate('_block.tpl'),
		]);
	}

	/**
	 * @return mixed|string
	 */
	public function testsAction() {
		$this->useJs('/assets/qunit/qunit.js');
		$this->useCss('/assets/qunit/qunit.css');
		return $this->getTemplate('tests.tpl', [
			'menu-left' => $this->getMenu($this->menu),
		]);
	}
}