//open brewery api project

let myTableConDiv = document.createElement("div");
myTableConDiv.classList.add("tableData");

let myCurrPage = 1;
let myitemPerPage = 10;
let myTotalPage = Math.ceil(100 / myitemPerPage);

// page navigation function
function myPrev_Page() {
  if (myCurrPage > 1) {
    myPageNavigation(myCurrPage - 1);
  }
}

function myNext_Page() {
  if (myCurrPage < 1) {
    myPageNavigation(myCurrPage + 1);
  }
}

function myPageNavigation(pageNum) {
  let myStartPoint = (pageNum - 1) * myTotalPage;
  let myEndPoint = pageNum * myTotalPage;
  myCurrPage = pageNum;
  myFetchData(myStartPoint, myEndPoint);
  if (pageNum === 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }
  if (pageNum === myTotalPage) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
}

// data fetching from the open brewery API....
function myFetchData(start, end) {
  return fetch(`https://api.openbrewerydb.org/v1/breweries/`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((data) => {
      console.log(myCurrPage);
      console.log(data);
      //
      myTableConDiv.innerHTML = " ";
      let myTableConTable = document.createElement("table");
      myTableConTable.classList.add("dataTable");
      myTableConTable.id = "dataTable";
      let myTableConTHead = document.createElement("thead");
      let myTableConTBody = document.createElement("tbody");

      let myTableConTHeadRow = document.createElement("tr");
      let myTableConTHeadRowHead1 = document.createElement("th");
      myTableConTHeadRowHead1.innerHTML = "Brewery Name";
      let myTableConTHeadRowHead2 = document.createElement("th");
      myTableConTHeadRowHead2.innerHTML = "Brewery Type";
      let myTableConTHeadRowHead3 = document.createElement("th");
      myTableConTHeadRowHead3.innerHTML = "Address";
      let myTableConTHeadRowHead4 = document.createElement("th");
      myTableConTHeadRowHead4.innerHTML = "City";
      let myTableConTHeadRowHead5 = document.createElement("th");
      myTableConTHeadRowHead5.innerHTML = "Phone";
      let myTableConTHeadRowHead6 = document.createElement("th");
      myTableConTHeadRowHead6.innerHTML = "Website";

      myTableConDiv.append(myTableConTable);
      myTableConTable.append(myTableConTHead, myTableConTBody);
      myTableConTHead.append(myTableConTHeadRow);
      myTableConTHeadRow.append(
        myTableConTHeadRowHead1,
        myTableConTHeadRowHead2,
        myTableConTHeadRowHead3,
        myTableConTHeadRowHead4,
        myTableConTHeadRowHead5,
        myTableConTHeadRowHead6
      );

      //   assigning the fetched data into the table UI
      for (i = start; i < end; i++) {
        let myTableConTBodyRow = document.createElement("tr");
        let myTableConTBodyRowCol1 = document.createElement("td");
        myTableConTBodyRowCol1.innerHTML = data[i]["name"];
        let myTableConTBodyRowCol2 = document.createElement("td");
        myTableConTBodyRowCol2.innerHTML = data[i]["brewery_type"];
        let myTableConTBodyRowCol3 = document.createElement("td");
        myTableConTBodyRowCol3.innerHTML = data[i]["address_1"];
        let myTableConTBodyRowCol4 = document.createElement("td");
        myTableConTBodyRowCol4.innerHTML = data[i]["city"];
        let myTableConTBodyRowCol5 = document.createElement("td");
        myTableConTBodyRowCol5.innerHTML = data[i]["phone"];
        let myTableConTBodyRowCol6 = document.createElement("td");
        myTableConTBodyRowCol6.innerHTML = data[i]["website_url"];
        myTableConTBody.append(myTableConTBodyRow);
        myTableConTBodyRow.append(
          myTableConTBodyRowCol1,
          myTableConTBodyRowCol2,
          myTableConTBodyRowCol3,
          myTableConTBodyRowCol4,
          myTableConTBodyRowCol5,
          myTableConTBodyRowCol6
        );
      }
    })
    .catch((err) => console.error(err));
}
//
//
//

//setting up navigation field
let myPageConNavigationDiv = document.createElement("div");
myPageConNavigationDiv.classList.add("anchorlist");

let myNav_Prev = document.createElement("a");
myNav_Prev.href = `javascript:myPrev_Page()`;
myNav_Prev.id = "prev";
myNav_Prev.innerHTML = "&laquo;";

let myNav_Next = document.createElement("a");
myNav_Next.href = `javascript:myNext_Page()`;
myNav_Next.id = "next";
myNav_Next.innerHTML = "&raquo;";

// navigation anchor
var arr = createAnchorList();
function createAnchorList() {
  var ar = [];
  for (let i = 1; i <= 10; i++) {
    var a = document.createElement("a");
    a.href = `javascript:myPageNavigation(${i})`;
    a.innerHTML = i;
    if (i === 1) {
      a.setAttribute("class", "active");
    }
    ar.push(a);
  }
  return ar;
}

var myPagHeading = document.createElement("div");
myPagHeading.innerHTML = "Open Brewery API - using DOM";
myPagHeading.classList.add("heading");

var mySearchInput = document.createElement("input");
mySearchInput.setAttribute("type", "text");
mySearchInput.id = "myInput";
mySearchInput.setAttribute("onkeyup", "myFunction()");
mySearchInput.placeholder = "search by brewery names.....";
mySearchInput.setAttribute("title", "Type in a name");

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//
//
//
document.body.classList.add("bg-info");
document.body.append(
  myPagHeading,
  mySearchInput,
  myTableConDiv,
  myPageConNavigationDiv
);
myPageConNavigationDiv.append(
  myNav_Prev,
  arr[0],
  arr[1],
  arr[2],
  arr[3],
  arr[4],
  arr[5],
  arr[6],
  arr[7],
  arr[8],
  arr[9],
  myNav_Next
);
myPageNavigation(1);
