export const integerRege =  new RegExp(/^\d+$/);
export const integerRege6 =  new RegExp(/^\d{6}$/);
export const regexpropertyValues = new RegExp(/^[1-9][0-9]{2,}$/);
export const regexmarketValue = new RegExp( /^[1-9][0-9]{5,}$/);
export const pincode=new RegExp(/^[1-9]{1}[0-9]{5}$/);

export const regexUsername = new RegExp(/^[A-Za-z][A-Za-z. ]{1,40}[A-Za-z. ]$/);
export const regexPassword = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/);
export const regexMobileNo = new RegExp(/^[6-9][0-9]{9}$/);
// export const regexEmail =  new RegExp(/^(?!.*?\.\.)[^\s][^\s]*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,3})$/);
// export const regexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/);
 export const regexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))([a-zA-Z0-9]+[a-zA-Z]*)(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z.]+(?:_[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}$/);

// export const regexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))([a-zA-Z0-9]+[a-zA-Z]*)(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z]{6,20}\.[a-zA-Z]{2,3}$/);


export const regexSalutation = new RegExp( /^[a-zA-Z]+$/);
export const regexFullName = new RegExp( /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/);
export const regexHouseNo = new RegExp(/^[A-Za-z\d_-][A-Za-z0-9\d_-]*([/-]?[A-Za-z0-9]([/-]?[\da-zA-Z]+)?)?$/);
export const regexPanCard = new RegExp(/^[a-zA-Z]{5}\d{4}[a-zA-Z]$/);
export const regexStreet = new RegExp(/^[A-Za-z0-9,-][A-Za-z0-9\s,-.]*$/);
