var serialize = function (form) {
	var serialized = '';
	for (i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
		if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized += '&' + encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
		}
	}

	return serialized;

};

window.displayStatus = function (data) {
	window.mcStatus = window.document.querySelector('.mc-status');

	if (!data.result || !data.msg ) return;
	mcStatus.innerHTML = data.msg.replace("0 - ", "");
	if (data.result === 'error') {
		mcStatus.classList.remove('success-message');
		mcStatus.classList.add('error-message');
		return;
	}
	mcStatus.classList.remove('error-message');
	mcStatus.classList.add('success-message');
};


var sendForm = function (form) {

	var url = form.getAttribute('action');
	url = url.replace('/post?u=', '/post-json?u=');
	url += serialize(form) + '&c=displayStatus';

	var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
	var script = window.document.createElement( 'script' );
	script.src = url;

	window.mcStatus = form.querySelector('.mc-status');

	ref.parentNode.insertBefore( script, ref );

	script.onload = function () {
		this.remove();
	};

};

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
  
function validate(email) {
	if (validateEmail(email)) {
		return true;
	}

	return false;
}

document.addEventListener('submit', function (event) {
	event.preventDefault();

	var fields = event.target.elements;

	if (validateEmail( fields[0].value )) {
		sendForm(event.target);
		return;
	}

	window.displayStatus({result: 'error', msg: "Email is not valid.", });
}, false);