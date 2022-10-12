function clearClass () {

	let loadClass = document.querySelectorAll('.load-screen');

	loadClass.forEach(function (element) {
		element.classList.add('d-none');
	  });

}

setTimeout(clearClass, 3000);