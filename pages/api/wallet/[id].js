import connectDB from '../../../utils/connectDB'
import Wallat from '../../../models/walletModel'
import auth from '../../../middleware/auth'

connectDB();

export default async (req, res) => {
    switch(req.method){
        case "PUT":
            await updateWallet(req, res);
            break;
        case "DELETE":
            await deleteWallet(req, res);
            break;
    }
};

const updateWallet = async (req, res) => {
    try {
        const result = await auth(req, res);
        // Perform role-based authentication if needed
        
        const {id} = req.query;
        const {balance} = req.body;

        const newWallet = await Wallet.findOneAndUpdate({_id: id}, {balance});
        res.json({
            msg: "Success! Updated wallet balance",
            wallet: {
                ...newWallet._doc,
                balance
            }
        });
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
};

const deleteWallet = async (req, res) => {
    try {
        const result = await auth(req, res);
        // Perform role-based authentication if needed
        
        const {id} = req.query;

        await Wallet.findByIdAndDelete(id);
        
        res.json({msg: "Success! Deleted a wallet"});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
};
