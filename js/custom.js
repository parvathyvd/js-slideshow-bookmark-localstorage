

function load() {

    changePic(0);
}

function change() {

    document.getElementById("myCanvas").style.background ="black";

}

function changePic(n) {
    var pictures = ["https://picsum.photos/200/300", "https://picsum.photos/200/300/?random"];
    document.getElementById("myCanvas").getElementsByTagName("img")[0].src = pictures[ n % pictures.length];
    setTimeout(function () {
        changePic(n+1);

    },5000);
}


var myform = document.getElementById('myForm');

myform.addEventListener('submit', saveBookmark);

function saveBookmark(e){

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name : siteName,
        url : siteUrl
    }


    // store values to a local storage 

    if(localStorage.getItem('bookmarks')==null){
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));


    } else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));


    }
    fetchBookmarks();

    e.preventDefault();

    
}

function removeBookmark(url){

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i<bookmarks.length; i++){

        if(bookmarks[i].url == url){

            bookmarks.splice(i,1);

        }

    }
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));

    fetchBookmarks();

}
function fetchBookmarks(){

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = " ";

    for(var i=0; i<bookmarks.length; i++){

        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card p-5 text-center">'+
                                        '<h3>'+name+'</h3>'+
                                        ' <a class="d-block mx-auto btn btn-success mb-3" target="_blank" href="'+url+'">Visit</a>'+
                                        ' <a onclick = "removeBookmark(\''+url+'\')"class="d-block mx-auto btn btn-danger"  href="#">Delete</a>' +
                                        '</div>';
    }

}
