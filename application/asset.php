<?php

namespace application;
class asset
{
	public $css_url = '/';
	public $js_url = '/';
	public $css = [];
	public $js = [];
	public $dependency = [];
	public $result = [
		'css' => [],
		'js' => [],
	];

	public function __construct() {
		foreach ($this->dependency as $dependency) {
			/**
			 * @type asset $dependency_class
			 */
			$dependency_class = new $dependency();
			$this->result = array_merge_recursive($this->result, $dependency_class->result);
		}
		$this->result = array_merge_recursive($this->result, $this->extract());
	}

	private function extract() {
		$result = array(
			'css' => [],
			'js' => [],
		);
		foreach ($this->css as $file) {
			array_push($result['css'], $this->css_url . $file);
		}
		foreach ($this->js as $file) {
			array_push($result['js'], $this->js_url . $file);
		}

		return $result;
	}

	public function getCss($cache = true) {
		$time = time();
		$result = array();
		foreach ($this->result['css'] as $file) {
			if ($cache === false) {
				array_push($result, "<link href=\"{$file}\" rel=\"stylesheet\"/>");
			} else {
				array_push($result, "<link href=\"{$file}?{$time}\" rel=\"stylesheet\"/>");
			}
		}

		return implode(PHP_EOL, $result);
	}

	public function getJs($cache = true) {
		$time = time();
		$result = array();
		foreach ($this->result['js'] as $file) {
			if ($cache === false) {
				array_push($result, "<script src=\"{$file}\" type=\"text/javascript\"></script>");
			} else {
				array_push($result, "<script src=\"{$file}?{$time}\" type=\"text/javascript\"></script>");
			}
		}

		return implode(PHP_EOL, $result);
	}
}