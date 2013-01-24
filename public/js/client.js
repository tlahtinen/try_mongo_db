/**
 * @author Lahtinen Toni T
 */

function getAllUsers() {
	$.get('/users', function(data) {
		$('#names').text(JSON.stringify(data));
	}).fail(function(data, textStatus, jqXHR) {
		alert('Failed to get all users.\n' + data);
	});
}

function addUser() {
	var user = {
		name : $('#name').val(),
		email : $('#email').val(),
		password : $('#password').val()
	};
	$.post('/users', user, function(data) {
		console.log('data from post: ' + JSON.stringify(data));
		$('#names').text(JSON.stringify(data));
	}).fail(function(data, textStatus, jqXHR) {
		alert('Failed to add user ' + JSON.stringify(user));
	});
}

function updateUser() {
	var id = $('#update_id').val();
	var userData = {
		name: $('#new_name').val()
	};
	$.ajax({
		type : 'PUT',
		url : '/users/' + id,
		data : userData
	}).done(function(data, textStatus, jqXHR) {
		$('#names').text('Updated user ' + id + ' with data ' + JSON.stringify(data));
	}).fail(function(data, textStatus, jqXHR) {
		alert('Failed to delete ' + id + '\n Data: ' + JSON.stringify(data));
	});
}

function deleteUser() {
	var id = $('#delete_id').val();
	$.ajax({
		type : 'DELETE',
		url : '/users/' + id
	}).done(function(data, textStatus, jqXHR) {
		$('#names').text('Deleted user ' + id);
	}).fail(function(data, textStatus, jqXHR) {
		alert('Failed to delete ' + id + '\n Data: ' + JSON.stringify(data));
	});
}

