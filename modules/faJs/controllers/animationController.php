<?php
/**
 * Created by PhpStorm.
 * User: ikosenko
 * Date: 01.02.18
 * Time: 11:32
 */

namespace modules\faJs\controllers;

class animationController extends indexController
{
	var $view_path = '../modules/fa-js/views/animation/';

	public function indexAction() {
		return $this->getTemplate('index.tpl', [

		]);
	}
}
