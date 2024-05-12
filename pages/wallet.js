import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import { useRouter } from 'next/router';


const wallet = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, wallet, cart } = state;
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter('/wallet');

  const handleTopUp = async () => {
    if (!amount) {
      setError('Please enter an amount.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await postData('wallet/top-up', { amount }, auth.token);

      if (res.error) {
        setError(res.error);
      } else {
        dispatch({ type: 'UPDATE_WALLET', payload: wallet + parseFloat(amount) });
        setError('');
        setAmount('');
      }
    } catch (error) {
      console.error('Error topping up wallet:', error);
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const handleWithdraw = async () => {
    if (!amount) {
      setError('Please enter an amount.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await postData('wallet/withdraw', { amount }, auth.token);

      if (res.error) {
        setError(res.error);
      } else {
        dispatch({ type: 'UPDATE_WALLET', payload: wallet - parseFloat(amount) });
        setError('');
        setAmount('');
      }
    } catch (error) {
      console.error('Error withdrawing from wallet:', error);
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const handleTransaction = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Please add items to make a purchase.');
      return;
    }

    const totalAmount = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    if (wallet < totalAmount) {
      setError('Insufficient balance in wallet. Please top up your wallet.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await postData('wallet/transaction', { totalAmount }, auth.token);

      if (res.error) {
        setError(res.error);
      } else {
        const updatedWalletBalance = wallet - totalAmount;

        dispatch({ type: 'UPDATE_WALLET', payload: updatedWalletBalance });
        dispatch({ type: 'CLEAR_CART' });

        router.push('/'); // Redirect to home after successful transaction

        dispatch({ type: 'NOTIFY', payload: { success: 'Transaction successful' } });
      }
    } catch (error) {
      console.error('Error making transaction:', error);
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Wallet Balance
              </div>
              <div className="card-body">
                <h3 className="text-center">${wallet.toFixed(2)}</h3>
                <hr />
                <div className="form-group">
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleTopUp}
                    disabled={loading}
                  >
                    Top Up
                  </button>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleWithdraw}
                    disabled={loading}
                  >
                    Withdraw
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleTransaction}
                    disabled={loading}
                  >
                    Make Transaction
                  </button>
                </div>
                {error && <p className="text-danger mt-3">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default wallet;
