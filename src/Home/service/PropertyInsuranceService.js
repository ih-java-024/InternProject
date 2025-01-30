
import axios from 'axios';
// import Header from '../Header';

const url ="http://192.168.1.2:9092/api/v1";

class PropertyInsuranceService {

    static createDetails(values) {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/putStructure";
        return axios.post(INSURANCE_API_BASE_URL, values);
    }

     static getAllDetails(){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getStructure";
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static getStructureDetailsByCustomerId(customerid)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getStructureByCustomerId/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static createCustomer(feilds){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/putCustomer";
        return axios.post(INSURANCE_API_BASE_URL, feilds);
    }

    static getCustomer(){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getCustomer";
        return axios.get(INSURANCE_API_BASE_URL);
    }
    static getCustomerIdByMobileNo(mobileno){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getCustomerByMobileNumber/"+mobileno;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static createfillDetails(data)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/putData";
        return axios.post(INSURANCE_API_BASE_URL, data);
    }

    static getfillDetails()
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getData";
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static getFillDetailsByCustomerId(customerid){
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getfillDetailsByCustomerId/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static createPaymentData(details)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/putPaymentData";
        return axios.post(INSURANCE_API_BASE_URL, details);
    }

    static getPaymentData()
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getPaymentData";
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static getPaymentDetailsByCustomerId(customerid)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/getPaymentDetailsByCustomerId/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static login(values)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/login";
        return axios.post(INSURANCE_API_BASE_URL,values);
    }
    static checkMobileNumber(s)
    {
        // const a={s,d}
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/checkMobileNumber/"+s;
        return axios.get(INSURANCE_API_BASE_URL);
                
    }

    static checkEmail(d)
    {
        // const a={s,d}
        const INSURANCE_API_BASE_URL = "http://192.168.1.2:9092/api/v1/checkEmail/"+d;
        return axios.get(INSURANCE_API_BASE_URL);
                
    }

    static getOtp1()
    {
        const INSURANCE_API_BASE_URL =url+"/currentDateTime";
        return axios.get(INSURANCE_API_BASE_URL);
    }
    static getOtp(mobileno,j)
    {
        const urll="https://login4.spearuc.com/MOBILE_APPS_API/sms_api.php?type=smsquicksend&user=qtnextotp&pass=987654&sender=QTTINF%20&t_id=1707170494921610008&to_mobileno=";
        const url1=urll+mobileno+"&sms_text=Dear%20customer,%20use%20this%20OTP%20";
        const url2=url1+j+"%20to%20signup%20in%20to%20your%20Quality%20Thought%20Next%20account.%20This%20OTP%20will%20be%20valid%20for%20the%20next%2015%20mins";
        return axios.get(url2);
    }


}

export default PropertyInsuranceService;
