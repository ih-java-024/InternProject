import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo1 from './Logo1.png';
import bglogo4 from './bglogo4.png';
import './Pay.css'; // Ensure to import the CSS file for styling

function Payment() {
    const location = useLocation();
    const { data, values, amount, familyMembers, individual, checkboxvalues } = location.state; // Destructure the required data from location state

    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const triggerBardeenWebhook = async (paymentData) => {
        try {
            await axios.post('YOUR_BARDEEN_WEBHOOK_URL', {
                email: values.email,
                name: values.firstname,
                paymentId: paymentData.userId,
                amount: amount,
                planType: data.planType,
                relationType: paymentData.relationType,
                duration: data.duration,
                insurance_cover: data.insurance_cover,
                intrest: data.intrest,
            });
            console.log('Bardeen webhook triggered successfully');
        } catch (error) {
            console.error('Error triggering Bardeen webhook:', error);
        }
    };

    const handleClick = async () => {
        const { planType, relationType, members, familyMembers, duration, intrest, insurence_cover } = data;

        const options = {
            key: 'rzp_test_Su4WV4zdBIGTmZ',
            amount: amount * 100, // Amount in paise (e.g., 1000 paise = ₹10)
            name: 'RS Insurance Company',
            description: 'Product/Service Description',
            image: Logo1,
            prefill: {
                name: values.firstname,
                email: values.email,
                contact: values.contactNo
            },
            theme: {
                color: '#d87988'
            },
            handler: async function (response) {
                alert(response.razorpay_payment_id);
                const relationType = planType === 'individual' ? individual : (checkboxvalues ? checkboxvalues.join(', ') : '');

                const paymentData = {
                    userId: response.razorpay_payment_id,
                    planType,
                    relationType: relationType,
                    duration: duration + " Years",
                    insurence_cover: `₹${data.insurance_cover}`,
                    intrest: `₹${data.intrest}`,
                };

                console.log('Sending request with userData:', paymentData);

                try {
                    const response = await axios.post(`http://localhost:9090/payment/addCustomer/${values.email}`, paymentData);
                    console.log('Payment processed successfully:', response.data);

                    const invoiceData = {
                        logo: 'https://your-logo-url.com/logo.png',
                        from: "RS Insurance Company",
                        to: values.firstname,
                        items: [
                            {
                                name: `${planType} Insurance Plan`,
                                quantity: 1,
                                unit_cost: amount
                            }
                        ],
                        notes: `Policy Duration: ${duration} Years\nInterest: ₹${intrest}\nInsurance Cover: ₹${insurence_cover}`,
                        currency: "INR"
                    };

                    const invoiceResponse = await axios.post('https://invoice-generator.com', invoiceData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const invoiceUrl = invoiceResponse.data.invoice_url;
                    window.open(invoiceUrl, "_blank");
                } catch (error) {
                    console.error('Error processing payment:', error);
                }
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div>
            <img className='bglogo' src={bglogo4} alt='Bg logo' />
            <div className='cd mt-5'>
                <h4 className='wel'>Welcome To Payment Page</h4>
                <div className='cntr'>
                    <ins className='text-danger'>
                        <div className='fw-bold text-dark mt-4 cho'>Choose&nbsp;&nbsp;Payment&nbsp;&nbsp;Options :</div>
                    </ins>
                    <p />
                    <label className='text-light mx-5 fw-bold'>
                        <input className='mx-1'
                            type="radio"
                            name='option'
                            value="Razor_Pay"
                            onChange={handlePaymentChange}
                        />
                        Razorpay
                    </label><br />
                    <p />
                    <label className='text-light mx-5 fw-bold'>
                        <input className='mx-1'
                            type="radio"
                            name='option'
                            value="card"
                            disabled
                            onChange={handlePaymentChange}
                        />
                        Card
                    </label><br />
                    <p />
                    <button type='button' className='btn btn-light paybtn mt-2 mx-4 fw-bold' onClick={handleClick} disabled={selectedPayment !== 'Razor_Pay'}> Pay </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
