import User from "../model/userModel.js";

export const create=async(req,res)=>{
    try {
        const userData=new User(req.body);
        if(!userData){
            return res.status(400).json({mes:"User not found"})
        }
        const saveData=await userData.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(500).json({error:error})
    }
}


export const getAll = async (req, res) => {
    try {
        const userData = await User.find();   
        if (userData.length === 0) {  
            return res.status(400).json({ mes: "No users found" });
        }
        res.status(200).json(userData);  
    } catch (error) {
        res.status(500).json({ msg: "Server error" });  
    }
}


export const getOne = async (req, res) => {
    try {
        const customId = req.params.id;  // assuming `id` here refers to your custom numeric ID
        const userExist = await User.findOne({ id: customId }); // find by custom `id` field
        if (!userExist) {  
            return res.status(400).json({ mes: "User Not found" });
        }
        res.status(200).json(userExist);  
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
}



export const update=async (req, res) => {
    try {
        const id = req.params.id;
        const userExist=await User.findById(id);
        // console.log(userExist);
        if (!userExist) {  
            return res.status(400).json({ mes: "User Not found" });
        }
        const updateData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updateData);  
    } catch (error) {
        res.status(500).json({ error: error });  
    }
}
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ id });  // Find by custom `id`
        
        if (!userExist) {  
            return res.status(400).json({ msg: "User Not found" });
        }

        await User.deleteOne({ id });  // Delete by custom `id`
        res.status(200).json({ msg: "User deleted successfully" });  
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

// In your controller (userController.js)

export const search = async (req, res) => {
    try {
        const { query, field } = req.query;  // Get the search query and field from the request

        if (!query || !field) {
            return res.status(400).json({ message: "Search query and field are required" });
        }

        // Use dynamic field search based on the `field` parameter
        const searchCriteria = {
            [field]: { $regex: query, $options: 'i' } // Case-insensitive regex search on specified field
        };

        const users = await User.find(searchCriteria).limit(20);

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);  // Return the search results
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



  


