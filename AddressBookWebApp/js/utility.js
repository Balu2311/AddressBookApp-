let checkName = (name)=>
{
    let namePattern = new RegExp('^[A-Z]{1}[a-z]{2,}([\\s]?[A-Za-z]{1,})*$');
    if(!namePattern.test(name))
        throw `Name is in Incorrect Format`;
}
let checkPhoneNumber = (number)=>
{
    let phoneNumPattern =new RegExp('^[+]?[0-9]+\\s[0-9]{10}$');
    if(!phoneNumPattern.test(number))
            throw 'PhoneNumber is not valid!! Atleast 10 character';
}
let checkZipCode = (zipCode)=>
{
    let zipCodePattern = new RegExp('^[1-9]{1}[0-9]{2}\\s?[0-9]{3}$');
    if(!zipCodePattern.test(zipCode))
            throw 'ZipCode is not valid';
}