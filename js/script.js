var bookmarkName = document.getElementById('bookmarkName');
var bookmarkUrl = document.getElementById('bookmarkUrl');
var addSite = document.getElementById('submitBtn');

var bookMarker =[]

if(localStorage.getItem('allBooks') !=null){
  bookMarker = JSON.parse(localStorage.getItem('allBooks'))
  display(bookMarker)
}


addSite.onclick = function addSite(){
  if(regName() || regWebsite()){
  var site = {
    name: bookmarkName.value,
    urlName: bookmarkUrl.value,
  };
  bookMarker.push(site)
  display(bookMarker)
  localStorage.setItem('allBooks', JSON.stringify(bookMarker))
  ClearForm()
}
}

function display(bookMarker)
{
  var newBookmark=""
  for (var i=0; i < bookMarker.length ; i++) { 
    newBookmark += `
    <tr>
    <td>${i + 1}</td>
    <td>${bookMarker[i].name}</td>
    <td>
      <button class="btn btn-visit" onclick="visitWebsite(${i})">
      <i class="fa-solid fa-eye fa-beat-fade pe-2"></i>Visit
    </button>
    </td>
    <td>
    <button class="btn btn-delete pe-2" onclick="deleteItem(${i})">
    <i class="fa-solid fa-trash-can fa-flip"></i>
    Delete
    </button>
    </td>
  </tr>
    `;
  }
  document.getElementById('tableContent').innerHTML = newBookmark
  
}


function ClearForm(){
  bookmarkName.value = ""
  bookmarkUrl.value = ""
}


function deleteItem(index){
  bookMarker.splice(index,1)
  localStorage.setItem('allBooks', JSON.stringify(bookMarker))
  display(bookMarker)

}

function visitWebsite(websiteIndex) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookMarker[websiteIndex].urlName)) {
    open(bookMarker[websiteIndex].urlName);
  } else {
    open(`https://${bookMarker[websiteIndex].urlName}`);
  }
}

function regName(){
  var regex = /^[A-Z][a-z]{3,}$/;
  if(regex.test(bookmarkName.value)){
    bookmarkName.nextElementSibling.classList.replace('d-block' , 'd-none')
    bookmarkName.classList.remove('is-invalid')
    bookmarkName.classList.add('is-valid')
    return true
  }
  else{
    bookmarkName.nextElementSibling.classList.replace('d-none' , 'd-block')
    bookmarkName.classList.add('is-invalid')
    bookmarkName.classList.remove('is-valid')
    return false
  }
}

function regWebsite() {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarkUrl.value)) {
    bookmarkUrl.nextElementSibling.classList.replace('d-block' , 'd-none')
    bookmarkUrl.classList.remove('is-invalid')
    bookmarkUrl.classList.add('is-valid')
  } else {
    bookmarkUrl.nextElementSibling.classList.replace('d-none' , 'd-block')
    bookmarkUrl.classList.add('is-invalid')
    bookmarkUrl.classList.remove('is-valid')
  }
}

















