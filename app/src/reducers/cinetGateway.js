export const 
checkout = (order) => {

   const API_KEY = process.env.REACT_APP_CINET_API_KEY 
   const SITE_ID = process.env.REACT_APP_CINET_SITE_ID 

   CinetPay.setConfig({
       apikey: '203933534665f879da7cb022.99644115',//   YOUR APIKEY
        site_id: '105884741',//YOUR_SITE_ID
        notify_url: 'http://mondomaine.com/notify/',
        mode: 'PRODUCTION'
    });
    CinetPay.getCheckout(order);
    CinetPay.waitResponse(function(data) {
        if (data.status == "REFUSED") {
            if (alert("Votre paiement a échoué")) {
                window.location.reload();
            }
        } else if (data.status == "ACCEPTED") {
            if (alert("Votre paiement a été effectué avec succès")) {
                window.location.reload();
            }
        }
    });
    CinetPay.onError(function(data) {
        console.log(data);
    });
}