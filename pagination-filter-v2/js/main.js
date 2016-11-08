//Problem: Hit enter it shows all records
//Problem: Search more than 10 per page
//Problem: Page numbers clicked don't yield search results

//Global variables
var student = $('.student-item');
var numberOfStudents = student.length;
var numberOfPages = Math.ceil(numberOfStudents / 10);
var studentsFound;
var pageNumber = 1;
var lowIndex = 0;
var highIndex = 9;
var input;

//-----------------Functions-------------

// Search Function
function search() {
	//search for students and only display matches
	studentsFound = $(student).hide()
	.filter(' :contains(" ' + $( '#input' ).val().toLowerCase() + '")' ).show();
	//remove "no matches found" message if it exists
	$('#no-results').remove();
		//no matches - show message
		if (studentsFound.length === 0) {
			$('.student-list').append('<h3 id="no-results">No students with that name were found.  Please try again.</h3>');
		} else if (studentsFound.length === numberOfStudents.length) {
			return studentShow(pageNumber);
		} 
		numberOfStudents = (studentsFound.length / 10);
		numberOfPages = Math.ceil(numberOfStudents);
		createPagination();
}

//Display Function - Show or Hide Students
function studentShow(pageNumber) {
	$(student).each(function( index ) {
		lowIndex = (pageNumber * 10) - 10;
		highIndex = (pageNumber * 10) - 1;		
		if (index >= lowIndex && index <= highIndex ) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}

//Pagination Function - Create Pages 
function createPagination () {
	//remove previous paginations
	$('.pagination').remove();
	//create pagination
	$('.page').append('<ul class="pagination"></ul>');
	if (numberOfPages <= 1) {
		return;
	}
	for (var i = 1; i <= numberOfPages; i++) {
		$('.pagination').append('<li id ="' + i +'"><a href="#" id="' + i + '">' + i + '</a></li>');
		$('.pagination').children().attr({class: "listItem"});
		$('#1 a').attr({class: "active"});
	}
}

//-----------Begin Program------------------
//Search Input and Button 
$('.page-header').append('<div class="student-search"><input id="input" placeholder="Search for students..."></input><button id="searchButton">Search</button></div>');

//Call functions to show students and page numbers
studentShow(1);
createPagination();

//--------------Event Listeners---------------
//User clicks page button
$(document).on('click', 'li a', function(e) {
	$('.listItem').children().removeClass( 'active' );
	$(this).attr({class: "active"});
	pageNumber = $(this).attr('id');
	studentShow(pageNumber);
});

//User clicks SEARCH button
$('#searchButton').click(function () {
	search();
});

//User hits "ENTER" to initiate search
$('#input').keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		search();
	}
});







