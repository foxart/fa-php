<?php

namespace application;

use assets\applicationAsset;
use function PHPSTORM_META\type;

class application
{
	var $view_path = '../application/';
	private $header;
	private $css = [];
	private $js = [];
	public $menu = [
		'home' => '/',
		'fa-js' => '/fa-js/index/index',
		'fa-js-block' => '/block/index/index',
	];
//	public function getCss() {
//		$path = '../web/css';
//		$url = '/css/';
//		$files = preg_grep('~\.(css)$~', scandir($path));
//		asort($files);
//		$result = array();
//		foreach ($files as $file) {
//			$time = md5(time());
//			array_push($result, "<link href=\"{$url}{$file}?{$time}\" rel=\"stylesheet\"/>");
//		}
//		return implode(PHP_EOL, $result);
//	}
	private function getHeader($header = NULL) {
		if ($header !== NULL) {
			return "<h1>{$header}</h1>";
		} else {
			return "<h1>{$this->header}</h1>";
		}
	}

	private function getAssets($controller) {
		/**
		 * @type application $controller
		 */
		$assets = array_merge_recursive($this->registerAsset(), $controller->registerAsset());
		$result = array();
		foreach ($assets as $asset) {
			$asset = new $asset();
			$result = array_merge_recursive($result, $asset->result);
		}
		if (empty($controller->css === FALSE)) {
			foreach ($controller->css as $css) {
				array_push($result['css'], $css);
			};
		}
		if (empty($controller->js === FALSE)) {
			foreach ($controller->js as $js) {
				array_push($result['js'], $js);
			};
		}

		return $result;
	}

	private function getCss($assets, $cache = TRUE) {
		$time = time();
		$result = array();
		$files = array_unique($assets['css']);
		foreach ($files as $file) {
			if ($cache === FALSE) {
				array_push($result, "<link href=\"{$file}\" rel=\"stylesheet\"/>");
			} else {
				array_push($result, "<link href=\"{$file}?{$time}\" rel=\"stylesheet\"/>");
			}
		}

		return implode(PHP_EOL, $result);
	}

	private function getJs($assets, $cache = TRUE) {
		$time = time();
		$result = array();
		$files = array_unique($assets['js']);
		foreach ($files as $file) {
			if ($cache === FALSE) {
				array_push($result, "<script src=\"{$file}\" type=\"text/javascript\"></script>");
			} else {
				array_push($result, "<script src=\"{$file}?{$time}\" type=\"text/javascript\"></script>");
			}
		}

		return implode(PHP_EOL, $result);
	}

	private function getBreadcrumbs($module, $class, $method) {
		if ($module === 'index' && $class === 'index' && $method === 'index') {
			$result = NULL;
		} else if ($class === 'index' && $method === 'index') {
			$result = "<a href='/'>Home</a>/{$module}";
		} else if ($method === 'index') {
			$result = "<a href='/'>Home</a>/<a href='/{$module}/index/index'>{$module}</a>/{$class}";
		} else {
			$result = "<a href='/'>Home</a>/<a href='/{$module}/index/index'>{$module}</a>/<a href='/{$module}/{$class}/index'>{$class}</a>/<b>{$method}</b>";
		}
		if ($result === NULL) {
			return $result;
		} else {
			return "<div id='breadcrumbs'>{$result}</div>";
		}
	}

	private function getPath($module, $class, $method) {
		return "modules\\{$module}\\controllers\\{$class}Controller\\$method";
	}

	private function getController($module_name, $controller_name, $method_name) {
		$class_name = "modules\\{$module_name}\\controllers\\{$controller_name}Controller";
		if (file_exists(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'modules' . DIRECTORY_SEPARATOR . $module_name)) {
			if (class_exists($class_name)) {
				$class = new $class_name;
				$method = $method_name . 'Action';
				if (method_exists($class, $method)) {
					$result = $class;
				} else {
					$result = "<h2>wrong method: <b>{$method_name}</b></h2>";
				};
			} else {
				$result = "<h2>wrong controller: <b>{$controller_name}</b></h2>";
			}
		} else {
			$result = "<h2>wrong module: <b>{$module_name}</b></h2>";
		}

		return $result;
	}

	protected function registerAsset() {
		return [
			applicationAsset::class,
		];
	}

	protected function useCss($file) {
		array_push($this->css, $file);
	}

	protected function useJs($file) {
		array_push($this->js, $file);
	}

	protected function setHeader($header) {
		$this->header = $header;
	}

	protected function getDocumentation($header = NULL) {
	}

	protected function getMenu($array = NULL) {
		$result = array();
		foreach ($array as $key => $value) {
			array_push($result, "<a href=\"{$value}\">{$key}</a>");
		}

		return '<ul><li>' . implode('</li><li>', $result) . '</li></ul>';
	}

	public function getTitle($title = NULL) {
		if ($title === NULL) {
			$result = ucfirst(preg_replace(['/(Action)/', '/(?<!^)([A-Z])/'], ['', '&nbsp;$1'], debug_backtrace()[1]['function']));
		} else {
			$result = $title;
		}

		return "<h2>{$result}</h2>";
	}

	protected function getTemplate($file_name, $array = []) {
		if (is_array($file_name)) {
			$array = $file_name;
			$file_name = strtolower(preg_replace(['/(Action)/', '/(?<!^)([A-Z])/'], ['', '-$1'], debug_backtrace()[1]['function'])) . '.tpl';
		}
		$file = preg_replace_callback('/(?:-)(.)/', function ($match) {
			return strtoupper($match[1]);
		}, $this->view_path);
		$template = $file . $file_name;
		if (file_exists($template)) {
			$subject = file_get_contents($template, "r");
			$subject = preg_replace('/({\*)(.+?)(\*})/s', '<!--$2-->', $subject);
			if (empty($array)) {
				$result = $subject;
			} else {
				$keys = array();
				$array_keys = array_keys($array);
				array_walk($array_keys, function ($key) use (&$keys) {
					array_push($keys, '{' . $key . '}');
				});
				$values = array_values($array);
				$result = str_replace($keys, $values, $subject);
			}
		} else {
			$result = "<h2>template not found: <b>{$template}</b></h2>";
		}

		return $result;
	}

	public function run($module, $class, $method) {
		$match = preg_replace_callback('/(?:-)(.)/', function ($match) {
			return strtoupper($match[1]);
		}, [$module, $class, $method]);
		$path = $this->getPath($match[0], $match[1], $match[2]);
		/**
		 * @type application $controller
		 */
		$controller = $this->getController($match[0], $match[1], $match[2]);
		if (is_object($controller)) {
			$controller_method = $match[2] . 'Action';
			$content = $controller->$controller_method();
			$assets = $this->getAssets($controller);
			$header = $controller->getHeader();
			$breadcrumbs = $this->getBreadcrumbs($module, $class, $method);
		} else {
			$content = $controller;
			$assets = $this->getAssets($this);
			$header = $this->getHeader('page not found');
			$breadcrumbs = '';
		}
		echo $this->getTemplate('application.tpl', [
			'assets-css' => '<ul><li>' . implode('</li><li>', $assets['css']) . '</li></ul>',
			'assets-js' => '<ul><li>' . implode('</li><li>', $assets['js']) . '</li></ul>',
			'css' => $this->getCss($assets),
			'js' => $this->getJs($assets),
			'header' => $header,
			'menu-header' => $this->getMenu($this->menu),
			'breadcrumbs' => $breadcrumbs,
			'path' => $path,
			'content' => $content,
		]);
	}
}