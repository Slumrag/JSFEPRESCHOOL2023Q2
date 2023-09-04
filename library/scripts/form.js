function getFormInputs(form) {
	return [...form.querySelectorAll('input:not([type=submit])')];
}
function isFormValid(form) {
	const inputs = getFormInputs(form);
	return inputs.every((input) => input.validity.valid);
}

function clearForm(form) {
	const inputs = getFormInputs(form);
	inputs.forEach((element) => {
		element.value = '';
	});
}
function getFormValues(form) {
	const inputs = getFormInputs(form);
	const values = {};
	inputs.forEach((element) => {
		values[element.id] = element.value;
	});
	return values;
}
