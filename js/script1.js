const xhr = new XMLHttpRequest();
let dataUsers;
const tableUsers = document.getElementById("tableUsers");
const btnNew = document.getElementById("btn");
const modal = document.getElementById("bg-modal");
const cls = document.getElementById("cls");
const btnSave = document.getElementById("btnSave");
const modUser = document.getElementById("modal-user");
const searchUser = document.getElementById("sendId");
const cls1 = document.getElementById("cls1");
const modUpdate = document.getElementById("modal-update");
const cls2 = document.getElementById("cls2");
const usersData = document.getElementById("info-user");
const usersForm = document.getElementById("users-form");
const showResultCrud = document.getElementById("show-result-crud");
const cls3 = document.getElementById("cls3");
const infoCrud = document.getElementById("p-result-crud");


function showTableUsers(){
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            
            dataUsers = JSON.parse(xhr.responseText);
            //console.log(dataUsers[0]);
            //console.log(dataUsers.length);
            const tbodyUsers = document.querySelector("tbody");
            //const btnUp = document.getElementById("btnUp");
            for(let i = 0; i < dataUsers.length; i++){
                
                let trData = document.createElement("tr");
                tbodyUsers.appendChild(trData);
                let tdId = document.createElement("td");
                let tdName = document.createElement("td");
                let tdUpdate = document.createElement("td");
                let tdDelete = document.createElement("td");

                tdId.innerText = dataUsers[i].id;
                tdName.innerHTML = '<button id="search-' + dataUsers[i].id + '" class="searchLink" onclick="searchLink(' + dataUsers[i].id + ')">' + dataUsers[i].name + '</button>';
                tdUpdate.innerHTML = '<button id="btnUp-' + dataUsers[i].id + '" class="btnUp" onclick="btnUpdate(' + dataUsers[i].id + ')">UPDATE</button>';
                tdDelete.innerHTML = '<button id="btnDel-' + dataUsers[i].id + '" class="btnDel" onclick="btnDelete(' + dataUsers[i].id + ')">DELETE</button>';

                trData.appendChild(tdId);
                trData.appendChild(tdName);
                trData.appendChild(tdUpdate);
                trData.appendChild(tdDelete);

                                  
                              
            }
            //console.log(typeof(dataUsers));
            
        }
    }
    xhr.open("GET", "https://62c7156e2b03e73a58df14e4.mockapi.io/users");
    xhr.send();
}

showTableUsers();

//Exibir e ocultar Modal para inscrição de usuário

btnNew.addEventListener("click", function(){
    modal.style.top = "0";
});

cls.addEventListener("click", function(){
    modal.style.top = "100%";
});

//Ocultar Modal para exibir informações do usuário

cls1.addEventListener("click", function(){
    modUser.style.top = "100%";
 
});

//Ocultar Modal para exibir informações do usuário(Update)

cls2.addEventListener("click", function(){
    modUpdate.style.top = "100%";
});

//Ocultar div de menssagem do Crud

cls3.addEventListener("click", function(){
    showResultCrud.style.display = "none";
});

//Método para inscrever usuários

btnSave.addEventListener("click", function(evt){
    evt.preventDefault();
    console.log("btnSave");
    let dateToday = new Date();
    console.log(dateToday.getFullYear());
    const nickName = document.getElementById("name");
    const nameValue = nickName.value;
    console.log(nameValue);
    const avatar = document.getElementById("avatar");
    let avatarValue = avatar.value;
    console.log(avatarValue);
    modal.style.top = "100%";

    xhr.open("POST", "https://62c7156e2b03e73a58df14e4.mockapi.io/users");

   /* const tblUsers = document.getElementById("tableUsers")
    let tbody = document.querySelector("#tbodyUsers");
    tblUsers.removeChild(tbody);*/

    const listUsers = document.querySelector("tbody");
    while (listUsers.hasChildNodes()) {
    listUsers.removeChild(listUsers.firstChild);
    }

xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
      //console.log(xhr.readyState);
      //console.log(xhr.status);
      dataUsers = JSON.parse(xhr.responseText);
      if(xhr.readyState == 4 && xhr.status ==201){
      showResultCrud.style.display = "block";
      showResultCrud.style.backgroundColor = "#d8e1e6";
      infoCrud.innerText = "O registro foi realizado com sucesso!"
      }else{
        showResultCrud.style.display = "block";
        showResultCrud.style.backgroundColor = "#c07084";
        infoCrud.innerText = "Ocorreu um erro, não foi possível realizar o registro!"
      }
      
      showTableUsers();
  }
}

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

numberId = dateToday.getDate().toString() + (dateToday.getMonth() + 1).toString() + dateToday.getFullYear().toString() + 
dateToday.getHours().toString() + dateToday.getMinutes().toString() + dateToday.getSeconds().toString();
console.log(numberId);


let documento = 
    {
    "createdAt": dateToday.getDate() + "-" + (dateToday.getMonth() + 1) + "-" + dateToday.getFullYear(),
    "name": nameValue,
    "avatar": avatarValue
    
   };
   console.log(documento);

   let docJson = JSON.stringify(documento);

   console.log(docJson);
   
   xhr.send(docJson);
   
   nickName.value = "";
   avatar.value = "";
});

//Método para pesquisa

searchUser.addEventListener("click", function(evt){
    evt.preventDefault();
    let searchValue = document.getElementById("inputId");
    let userName = searchValue.value.toLowerCase();
    console.log(userName);
    let infoUsers = dataUsers.filter((usersNames) => {
        return usersNames.name.toLowerCase().startsWith(userName);
    });
    //console.log(infoUsers);

    const listUsers = document.querySelector("tbody");
    while (listUsers.hasChildNodes()) {
    listUsers.removeChild(listUsers.firstChild);
    }

    for(let i = 0; i < infoUsers.length; i++){
        if(searchValue == ""){
            showTableUsers();
        }else{    
        let trData = document.createElement("tr");
        tbodyUsers.appendChild(trData);
        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdUpdate = document.createElement("td");
        let tdDelete = document.createElement("td");

        tdId.innerText = infoUsers[i].id;
        tdName.innerHTML = '<button id="search-' + infoUsers[i].id + '" class="searchLink" onclick="searchLink(' + infoUsers[i].id + ')">' + infoUsers[i].name + '</button>';
        tdUpdate.innerHTML = '<button id="btnUp-' + infoUsers[i].id + '" class="btnUp" onclick="btnUpdate(' + infoUsers[i].id + ')">UPDATE</button>';
        tdDelete.innerHTML = '<button id="btnDel-' + infoUsers[i].id + '" class="btnDel" onclick="btnDelete(' + infoUsers[i].id + ')">DELETE</button>';

        trData.appendChild(tdId);
        trData.appendChild(tdName);
        trData.appendChild(tdUpdate);
        trData.appendChild(tdDelete);

        searchValue.value = "";                           
        }              
    }
    
    

    /*for(let i = 0; i < infoUsers.length; i++){
        let pData = document.createElement("p");
        pData.setAttribute("class", "p");
        usersForm.appendChild(pData);
        pData.innerText = "ID: " + infoUsers[i].id + " Nome: " + infoUsers[i].name + "\n Avatar: " + infoUsers[i].avatar;
    }
    modUser.style.top = "0";
    searchValue.value = "";*/
    
});


//Método para obter informações para Update

function btnUpdate(id){
    let infoUser;
    for(let i = 0; i < dataUsers.length; i++){
        if(dataUsers[i].id == id){
            infoUser = dataUsers[i];
            //console.log(infoUser);
    }  
}
    //console.log(id);
    modUpdate.style.top = "0";
    const updateId = document.getElementById("updateId");
    const updateName = document.getElementById("updateName");
    const updateAvatar = document.getElementById("updateAvatar");
    const updateDate = document.getElementById("updateDate");
    
    updateId.setAttribute("value", infoUser.id);
    updateName.setAttribute("value", infoUser.name);
    updateAvatar.setAttribute("value", infoUser.avatar);
    updateDate.setAttribute("value", infoUser.createdAt);
    updateId.setAttribute("readonly", true);
    updateDate.setAttribute("readonly", true);

    const btnUpdateSave = document.getElementById("btnUpdateSave");

    btnUpdateSave.addEventListener("click", function(evt){
        evt.preventDefault();
        let newUpdateId = updateId.value.toString();
        let newUpdateName = updateName.value;
        let newUpdateAvatar = updateAvatar.value;
        let newUpdateDate = updateDate.value;
        //console.log(newUpdateId);
        xhr.open('PUT', 'https://62c7156e2b03e73a58df14e4.mockapi.io/users/'+newUpdateId+'');

        const listUsers = document.querySelector("tbody");
        while (listUsers.hasChildNodes()) {
        listUsers.removeChild(listUsers.firstChild);
        }
    
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
          //console.log(xhr.readyState);
          //console.log(xhr.status);
          dataUsers = JSON.parse(xhr.responseText);
          if(xhr.readyState == 4 && xhr.status ==200){
            showResultCrud.style.display = "block";
            showResultCrud.style.backgroundColor = "#d8e1e6";
            infoCrud.innerText = "O registro foi alterado com sucesso!"
            }else{
              showResultCrud.style.display = "block";
              showResultCrud.style.backgroundColor = "#c07084";
              infoCrud.innerText = "Ocorreu um erro, não foi possível realizar a alteração!"
            }
          
          showTableUsers();
      }
    }        

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");        

        let documento = 
    {
    "createdAt": newUpdateDate,
    "name": newUpdateName,
     
   };
   //console.log(documento);

   let docJson = JSON.stringify(documento);

   //console.log(docJson);
   
   xhr.send(docJson);

   modUpdate.style.top = "100%";
    });
    
}

//Método para Deletar

function btnDelete(id){
   
    console.log(id);
xhr.open('DELETE', 'https://62c7156e2b03e73a58df14e4.mockapi.io/users/'+id+'');

  const listUsers = document.querySelector("tbody");
        while (listUsers.hasChildNodes()) {
        listUsers.removeChild(listUsers.firstChild);
        }
    
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
          //console.log(xhr.readyState);
          //console.log(xhr.status);
          dataUsers = JSON.parse(xhr.responseText);
          if(xhr.readyState == 4 && xhr.status ==200){
            showResultCrud.style.display = "block";
            showResultCrud.style.backgroundColor = "#d8e1e6";
            infoCrud.innerText = "O registro foi excluído com sucesso!"
            }else{
              showResultCrud.style.display = "block";
              showResultCrud.style.backgroundColor = "#c07084";
              infoCrud.innerText = "Ocorreu um erro, não foi possível excluir o registro!"
            }
          
          showTableUsers();
      }
    }    

xhr.send();
}

//Método para exibir modal de informações do usuário

function searchLink(id){
    console.log(id);
    
    let infoUser;
    let x = 0;
    while(x < dataUsers.length){
        
        if(dataUsers[x].id == id){
            console.log(dataUsers[x].id);
            infoUser = dataUsers[x];
            console.log(infoUser);
        }
        x++;
    }
    
    let p1 = document.getElementById("info-user-p1");
    let p2 = document.getElementById("info-user-p2");
    let p3 = document.getElementById("info-user-p3");
    let p4 = document.getElementById("info-user-p4");

    p1.innerHTML = "ID: " + infoUser.id;
    p2.innerHTML = "Nome: " + infoUser.name;
    p3.innerHTML = "Avatar: " + infoUser.avatar;
    p4.innerHTML = "Data de inscrição: " + infoUser.createdAt;
    
    modUser.style.top = "0";
}

/*keyup
https://web.facebook.com/rocketseat/videos/734646334011234/*/