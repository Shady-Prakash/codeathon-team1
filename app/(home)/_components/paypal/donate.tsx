import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const style = {"layout":"horizontal"};

// function createOrder() {
//   // replace this url with your server
//   return fetch("https://localhost:3000/api/paypal/create-order", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       // use the "body" param to optionally pass additional order information
//       // like product ids and quantities
//       body: JSON.stringify({
//           cart: [
//               {
//                   sku: "etanod01",
//                   quantity: 1,
//               },
//           ],
//       }),
//   })
//       .then((response) => response.json())
//       .then((order) => {
//           // Your code here after create the order
//           return order.id;
//       });
// }
// function onApprove(data: any) {
//   // replace this url with your server
//   return fetch("https://localhost:3000/api/paypal/capture-order", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//           orderID: data.orderID,
//       }),
//   })
//       .then((response) => response.json())
//       .then((orderData) => {
//           // Your code here after capture the order
//       });
// }

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
      <>
          { isPending && <div className="spinner">...Loading</div> }
          <PayPalButtons
              fundingSource="paypal"
              style={{"layout":"vertical","label":"donate"}}
              disabled={false}
              forceReRender={[style]}
              // createOrder={createOrder}
              // onApprove={onApprove}
          />
      </>
  );
}

const Donate = () => {
  return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider options={{ clientId: "AYz52W3GMorfkRnXkXERQm-nS3XvHX_XHYIBtrGkJ2wWBH_GD3JKfrPyHjTN28TmTPnKK0eJucKd22Dq", components: "buttons", currency: "USD" }}>
              <ButtonWrapper/>
          </PayPalScriptProvider>
      </div>
  );
}

export default Donate;