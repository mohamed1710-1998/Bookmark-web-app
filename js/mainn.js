var siteName = document.getElementById("siteName") ;
var siteUrl= document.getElementById("siteUrl");
var displayData = document.getElementById("tableBody");
var Submit = document.getElementById("submitBtn");
var allBookMarks = [] ; 
var IndexToUpdate ;






if(localStorage.allBookMarks != null){
  allBookMarks = JSON.parse(localStorage.allBookMarks);
  display(allBookMarks);
}



Submit.addEventListener('click', function(){
  if(validateUrl() == true && siteName.value !=""){
    var newBookMark = {
      newSiteName : siteName.value ,
      newSiteUrl : siteUrl.value
    };
    allBookMarks.push(newBookMark);
    localStorage.setItem("allBookMarks",JSON.stringify(allBookMarks));
    display(allBookMarks);
    clear();
  }else{
    Swal.fire({
      title: "Invalid Data ?",
      text: `${siteName.value == "" ? "Please enter site name" : ""} ${validateUrl() == false ? " Please enter valid url": "" }  `,
      icon: "warning"
    });
  }
  
});

function display (array) {
  var cartona = "";
  for(var i = 0 ; i < array.length ; i++){
    cartona+=` <tr>
                                <td>${i+1}</td>
                                <td>${array[i].newSiteName}</td>
                                <td><a class="btn btn-primary" href="${array[i].newSiteUrl}" target="_blank">visit</a></td>
                                <td><button class="btn btn-success" onclick="preUpdate(${i})">Update</button></td>
                                <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button></td>
                            </tr>
    `
  }

  displayData.innerHTML= cartona;

}


function preUpdate(index){
  IndexToUpdate = index;
  siteName.value = allBookMarks[index].newSiteName;
  siteUrl.value = allBookMarks[index].newSiteUrl;
  displayUpdateBtn();
}


function displayUpdateBtn(){
  document.getElementById("submitBtn").classList.replace("d-block", "d-none");
  document.getElementById("updateBtn").classList.replace("d-none", "d-block");
}

function displaySubmitBtn(){
  document.getElementById("submitBtn").classList.replace("d-none", "d-block");
  document.getElementById("updateBtn").classList.replace("d-block", "d-none");
}

function updateInfo(){
  if(validateUrl() == true && siteName.value !=""){
    var updateBookMark = {
      newSiteName : siteName.value ,
      newSiteUrl : siteUrl.value
    };
    allBookMarks.splice(IndexToUpdate , 1 ,updateBookMark);
    localStorage.setItem("allBookMarks",JSON.stringify(allBookMarks));
    display(allBookMarks);
    displaySubmitBtn();
    clear();
  }else{
    Swal.fire({
      title: "Invalid Data ?",
      text: `${siteName.value == "" ? "Please enter site name" : ""} ${validateUrl() == false ? " Please enter valid url": "" }  `,
      icon: "warning"
    })
  }
  
}


function deleteBookMark(index) {
  allBookMarks.splice(index,1);
  localStorage.setItem("allBookMarks",JSON.stringify(allBookMarks));
  display(allBookMarks);
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

function validateUrl(){
  var urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlPattern.test(siteUrl.value);
}