const getById = (id) =>
{
    return document.querySelector(`#${id}`);
}
let personObject = {};
let cities = [
    {
        state:"tamilNadu",
        city:['chennai','madurai']
    },
    {
        state:"kerala",
        city:['kochin','wayanad']
    },
    {
        state:"karnataka",
        city:['banglore','mysore']
    },
    {
        state:"andhraPradesh",
        city:['vijayawada','tirupathi']
    },
    {
        state:"maharashtra",
        city:['mumbai','pune']
    },
    {
        state:"telungana",
        city:['hyderabad','suryapet']
    }
]
window.addEventListener('DOMContentLoaded', (event) => {
    const state = getById('state');
    const city = getById('city');
    state.addEventListener('input', () =>{
        let allCities  = cities.find(x => x.state == state.value);
        let option = '<option value="">Select City</option>';
        allCities.city.forEach(element => {
            option = `${option}<option value="${element}">${element}</option>`
        });
        city.innerHTML=option;
    });
    /****************************************************************/
    const name = getById('personName');
    const nameError =  getById('errorName');
    name.addEventListener('input', () =>{
        if(name.value.length == 0)
        {
            nameError.innerHTML = '';
            return;
        }
        try
        {
            checkName(name.value);
            nameError.innerHTML = '';
        }
        catch(e)
        {
            nameError.innerHTML = e;
        }
    });
    /****************************************************************/
    const phno = getById('phoneNumber');
    const phoneError =  getById('errorPhoneNumber');
    const countryCode = getById('countryCode');
    phno.addEventListener('input', () =>{
        if(phno.value.length == 0)
        {
            phoneError.innerHTML = '';
            return;
        }
        try
        {
            let phoneNum = countryCode.value +" "+ phno.value;
            checkPhoneNumber(phoneNum); 
            phoneError.innerHTML = '';
        }
        catch(e)
        {
            phoneError.innerHTML = e;
        }
    });
    /****************************************************************/
    const zipCode = getById('zipCode');
    const zipCodeError =  getById('errorzipCode');
    zipCode.addEventListener('input', () =>{
        if(zipCode.value.length == 0)
        {
            zipCodeError.innerHTML = '';
            return;
        }
        try
        {
            checkZipCode(zipCode.value);
            zipCodeError.innerHTML = '';
        }
        catch(e)
        {
            zipCodeError.innerHTML = e;
        }
    });

});

const save = () =>
{
    try
    {
        setPersonObj();
        createAndUpdate();
        resetForm();
    }
    catch(e)
    {
        return;
    }
}

const setPersonObj = () =>
{
    try{
        checkName(getById('personName').value);
        personObject.personName = getById('personName').value;
    }
    catch(e)
    {
        getById('errorName').innerHTML = e;
        throw e;
    }
   
    try
    {
        let phno = getById('countryCode').value +" "+ getById('phoneNumber').value;
        checkPhoneNumber(phno); 
        personObject.phoneNumber = phno;
    }
    catch(e)
    {
        getById('errorPhoneNumber').innerHTML = e;
        throw e;
    }
    
    personObject.address = getById('address').value;
    personObject.state = getById('state').value;
    personObject.city = getById('city').value;
    try
    {
        checkZipCode(getById('zipCode').value);
        personObject.zipCode = getById('zipCode').value;
    }
    catch(e)
    {
        getById('errorzipCode').innerHTML = e;
        throw e;
    }
    
}

const createAndUpdate = () =>
{
    let personId = createNewPersonId();
    personObject.id = personId;
    let addressBookList = JSON.parse(localStorage.getItem("addressBookList"));
    if(addressBookList!=undefined)
        addressBookList.push(personObject);
    else
        addressBookList=[personObject];
    localStorage.setItem("addressBookList",JSON.stringify(addressBookList));
    alert("Saved");
}

const createNewPersonId = () =>
{
    let personId = localStorage.getItem('personId');
    personId = !personId ? 1 : (parseInt(personId)+1).toString();
    localStorage.setItem('personId',personId);
    return personId;
}
const resetForm = () =>
{
    setValue('#personName','');
    setValue('#phoneNumber','');
    getById('countryCode').selectedIndex = 0;
    getById('state').selectedIndex = 0;
    getById('city').selectedIndex = 0;
    setValue('#address','');
    setValue('#zipCode','');
}
const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
  }