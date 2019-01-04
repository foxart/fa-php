<style>
	.even, .odd {
		margin: 20px;
		padding: 20px;
	}

	.even {
		background-color: lightseagreen;
	}
	 .odd {
		background-color: lightcoral;
	}
</style>
<div class="">
	<input id="block" type="button" value="block"/>
	<input id="unblock" type="button" value="unblock"/>
	<input id="test" type="button" value="test"/>
</div>
<hr/>
<div class="fs_3 lh_3">
	<div id="block_container" class="d-b" style="padding: 10px;">
		<p>container</p>
	</div>
	<div id="block1" class="d-b" style="padding: 10px;">
		<p>block: default</p>
	</div>
	<div id="block2" class="b-s d-b" style="padding: 10px;">
		<p>block: manual content</p>
	</div>
	<div id="block3" class="b-s d-b" style="padding: 10px;">
		<p>block: manual background</p>
	</div>
	<div>
		<span id="a1" class="fl-l even">&nbsp;</span>
		<span id="a2" class="fl-l odd">&nbsp;</span>
		<span id="a3" class="fl-l even">&nbsp;</span>
		<span id="a4" class="fl-l odd">&nbsp;</span>
		<span id="a5" class="fl-l even">&nbsp;</span>
		<span id="a6" class="fl-l odd">&nbsp;</span>
		<span id="a7" class="fl-l even">&nbsp;</span>
		<span id="a8" class="fl-l odd">&nbsp;</span>
	</div>
</div>
