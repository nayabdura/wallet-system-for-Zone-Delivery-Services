const baseUrl = process.env.BASE_URL

export const getData = async (url, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}

export const postData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}



export const putData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const deleteData = async (url, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}
export const walletTopUp = async (amount, token) => {
    try {
        const res = await postData('wallet/top-up', { amount }, token);
        return res;
    } catch (error) {
        console.error('Error topping up wallet:', error);
        return { error: 'Error topping up wallet' };
    }
};

export const walletWithdraw = async (amount, token) => {
    try {
        const res = await postData('wallet/withdraw', { amount }, token);
        return res;
    } catch (error) {
        console.error('Error withdrawing from wallet:', error);
        return { error: 'Error withdrawing from wallet' };
    }
};

export const walletTransaction = async (total, token) => {
    try {
        const res = await postData('wallet/transaction', { total }, token);
        return res;
    } catch (error) {
        console.error('Error processing wallet transaction:', error);
        return { error: 'Error processing wallet transaction' };
    }
};