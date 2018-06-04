var testUrl ='https://openlibrary.org/api/books?bibkeys=ISBN:0439576881&jscmd=details&format=json';

function getJSON(url) {
  return new Promise((success, error) => {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        success(data);
      } else {
        error();
      }
    };
    request.onerror = function() {
      error();
    };
    request.send();
  })
}

document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
    this.MaterialProgress.setProgress(68);
  });

getJSON(testUrl).then((data) => {
    let book = data[Object.keys(data)[0]];
    let cover = book.thumbnail_url.replace("S", "M");
    let number_of_pages = book.details.number_of_pages;
    let title = book.details.title;
    let description = book.details.description.value;

    document.getElementById('numberOfPages').innerHTML = number_of_pages;
    document.getElementById('description').innerHTML = description;


    document.getElementsByClassName('mdl-card__title')[0].innerHTML = title;

    var img = document.getElementsByClassName('cover')[0];
    img.setAttribute('src', cover)

    img.addEventListener('load', function(e) {
        document.getElementsByClassName('book-card')[0].classList.remove('hidden');
    });

})
