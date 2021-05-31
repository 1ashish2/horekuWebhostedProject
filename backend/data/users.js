import bcrypt from "bcryptjs"
const users = [
    {
        name: "Admin user",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin:true
    },
     {
        name: "Ashish",
        email: "ashish@gmail.com",
        password:bcrypt.hashSync('123456',10),
      
    },
     {
        name: "Aman",
        email: "aman@gmail.com",
        password:bcrypt.hashSync('123456',10),
        
    },

]

export default users;