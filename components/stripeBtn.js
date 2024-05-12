import { useEffect, useRef, useContext } from 'react';
import { patchData } from '../utils/fetchData';
import { DataContext } from '../store/GlobalState';
import { updateItem } from '../store/Actions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const StripeBtn = ({ order }) => {
    const refStripeBtn = useRef();
    const { state, dispatch } = useContext(DataContext);
    const { auth, orders } = state;

    useEffect(() => {
        const createStripeCheckout = async () => {
            const stripe = await stripePromise;

            refStripeBtn.current.addEventListener('click', async () => {
                dispatch({ type: 'NOTIFY', payload: { loading: true } });

                const res = await patchData(`order/payment/${order._id}`, {
                    method: 'Stripe',
                    stripe_id: auth.user.stripe_id,
                    amount: order.total
                }, auth.token);

                if (res.err) {
                    return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
                }

                dispatch(updateItem(orders, order._id, {
                    ...order,
                    paid: true,
                    dateOfPayment: new Date().toISOString(),
                    method: 'Stripe'
                }, 'ADD_ORDERS'));

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
            });
        };

        createStripeCheckout();
    }, []);

    return (
        <div ref={refStripeBtn}>
            <button className="btn btn-dark text-uppercase">Pay with Stripe</button>
        </div>
    );
};

export default StripeBtn;













// import { useEffect, useRef, useContext } from 'react'
// import { patchData } from '../utils/fetchData'
// import {DataContext} from '../store/GlobalState'
// import {updateItem} from '../store/Actions'

// const paypalBtn = ({order}) => {
//     const refPaypalBtn = useRef()
//     const {state, dispatch} = useContext(DataContext)
//     const { auth, orders} = state

//     useEffect(() => {
//         paypal.Buttons({
//             createOrder: function(data, actions) {
//               // This function sets up the details of the transaction, including the amount and line item details.
//               return actions.order.create({
//                 purchase_units: [{
//                   amount: {
//                     value: order.total
//                   }
//                 }]
//               });
//             },
//             onApprove: function(data, actions) {
//               // This function captures the funds from the transaction.
//               dispatch({ type: 'NOTIFY', payload: {loading: true} })

//               return actions.order.capture().then(function(details) {

//                 patchData(`order/payment/${order._id}`, {
//                   paymentId: details.payer.payer_id
//                 }, auth.token)
//                 .then(res => {
//                   if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
                  
//                   dispatch(updateItem(orders, order._id, {
//                     ...order, 
//                     paid: true, dateOfPayment: details.create_time,
//                     paymentId: details.payer.payer_id, method: 'Paypal'
//                   }, 'ADD_ORDERS'))

//                   return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
//                 })
//                 // This function shows a transaction success message to your buyer.
//               });
//             }
//         }).render(refPaypalBtn.current);
//     },[])

//     return(
//         <div ref={refPaypalBtn}></div>
//     )
// }

// export default paypalBtn