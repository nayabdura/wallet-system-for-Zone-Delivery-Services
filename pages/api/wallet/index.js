import connectDB from '../../../utils/connectDB'
import Wallet from '../../../models/walletModel'
import auth from '../../../middleware/auth'

connectDB();

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createWallet(req, res);
            break;
        case "GET":
            await getWallets(req, res);
            break;
    }
};

const createWallet = async (req, res) => {
    try {
        const result = await auth(req, res);
        // Perform role-based authentication if needed
        
        const { balance } = req.body;
        
        const newWallet = new Wallet({ balance });
        await newWallet.save();
        
        res.json({
            msg: 'Success! Created a new wallet.',
            newWallet
        });
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
};

const getWallets = async (req, res) => {
    try {
        const result = await auth(req, res);
        // Perform role-based authentication if needed
        
        const wallets = await Wallet.find();
        res.json({ wallets });
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
};
