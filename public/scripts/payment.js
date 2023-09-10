const btn = document.querySelector('#buy-btn');

async function makeOrder(amount){
    try {
        const res = await axios({
            method: 'post',
            data: { amount },
            url: `/order`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const options = {
            "key": "rzp_test_KAi4PClBNgkHB4", // Enter the Key ID generated from the Dashboard
            "amount": res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ecom Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:4000/payment-verify/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Rishi Raj", //your customer's name
                "email": "raj2002rishi@gmail.com",
                "contact": "8448509275" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        window.location.replace('/login');
    }
}


btn.addEventListener('click', () => {
    const amount = document.querySelector('#amount-display').innerText.split(' ')[1];
    makeOrder(amount);
})