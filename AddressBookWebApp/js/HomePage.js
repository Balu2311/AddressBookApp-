let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getDataFromLocalStorage();
    document.getElementById('personCount').innerHTML = addressBookList.length;
    createTableContents();
});
let getDataFromLocalStorage = () =>
{
    return localStorage.getItem("addressBookList")?JSON.parse(localStorage.getItem("addressBookList")):[];
}
let createTableContents = () =>
{
    const tableHeader = `<tr>
    <th>Id</th>
    <th>Full Name</th>
    <th>Phone Number</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip Code</th>
    <th>Actions</th>
</tr>`;
let tableContents = `${tableHeader}`;
    for(const person of addressBookList)
    {
        tableContents = `${tableContents}<tr>
            <td>${person.id}</td>
            <td>${person.personName}</td>
            <td>${person.phoneNumber}</td>
            <td>${person.address}</td>
            <td>${person.city}</td>
            <td>${person.state}</td>
            <td>${person.zipCode}</td>
            <td>
                <img id="${person.id}" src="../assets/icons/delete-black-18dp.svg" class="profile" onclick="deletePerson(this)" alt="delete" />
                <img id="${person.id}" src="../assets/icons/create-black-18dp.svg" class="profile" onclick="updatePerson(this)" alt="edit" />
            </td>
        </tr>`;
    }
    
    document.getElementById('display_container').innerHTML = tableContents;
}
//Delete Person
let deletePerson = (person) =>
{
    let personData  = addressBookList.find(x => x.id == person.id);
    if(!personData)
        return;
    const index = addressBookList.map(x => x.id).indexOf(personData.id);
    addressBookList.splice(index,1);
    localStorage.setItem("addressBookList",JSON.stringify(addressBookList));
    document.getElementById('personCount').innerHTML = addressBookList.length;
    createTableContents();
}
//Update person
let updatePerson = (person) =>
{
    let personData  = addressBookList.find(x => x.id == person.id);
    if(!personData)
        return;
    localStorage.setItem("editPerson",JSON.stringify(personData));
    window.location.replace(siteProperties.register_page);
}