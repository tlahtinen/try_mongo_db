/**
 * @author Lahtinen Toni T
 */

var xmlHttp;

function getAllUsers() {
	$.get('http://127.0.0.1:8011/users').done(function(data) {
		$('#names').text(data);
	}).fail(function() {
		alert('Error');
	});
}
