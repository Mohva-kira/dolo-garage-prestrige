// Script de test pour vérifier les requêtes CORS
const testPaymentEndpoint = async () => {
    try {
        const response = await fetch('http://localhost:3008/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                orderId: 'test-order-123',
                totalAmount: 1000,
                customerInfo: {
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '1234567890'
                }
            })
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        return { success: true, data };
    } catch (error) {
        console.error('Test failed:', error);
        return { success: false, error: error.message };
    }
};

// Fonction pour tester depuis la console du navigateur
window.testPaymentEndpoint = testPaymentEndpoint;

export default testPaymentEndpoint;
