import $ from "jquery";

$(() => {
	let div = $("<div>")
		.attr({ id: "sample" })
		.text("Sample Text");
	$("body").append(div);

	let h = $("<h1>").text("Hello Webpack");
	$("body").append(h);
});
