const Order = require("../model/order")


exports.getAllOrder = async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).send({message : "Orders Fetched" , data : orders});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}

exports.getOrderByUserId = async (req,res)=>{
    const { id } = req.params;
    try {
        const orders = await Order.find({userId : id});
        res.status(200).send({message : "Orders Fetched" , data : orders});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}



exports.deleteOrder = async (req,res)=>{
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).send({message : "Order deleted",data : order});
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "error"})
    }
    
}




//protected Routes
//  "/" -- anyone
//  "/login" -- anyone but not loggedin user/admin
//  "/signup" -- anyone but not loggedin user/admin
//  "/profile" -- only admin and user
//  "/admin" -- admin
//  "/myOrder" -- user
//  "/order" -- user