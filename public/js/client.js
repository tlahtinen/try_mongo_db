/**
 * @author Lahtinen Toni T
 */

function getAllUsers() {
	$.get('/users', function(data) {
		$('#names').text(JSON.stringify(data));
	});
}

function addUser() {
	console.log(arguments);
	var user = {
		name : $('#name').text(),
		email : $('#email').text(),
		password : $('#password').text()
	}; 
	console.log(JSON.stringify(user));
	//$('#names').text(JSON.stringify(user));
	return false;
}

$('#signup_form').submit(function(e){
    e.preventDefault();
    e.stopPropagation();
    addUser();
});
