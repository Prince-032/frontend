// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './App.css';

// // function Table() {

// //     const [data , setData] = useState([]);
// //     const [name , setName] = useState('');
// //     const [email , setEmail] = useState('');
// //     const [uname , usetName] = useState('');
// //     const [uemail , usetEmail] = useState('');
// //     const [editId , setEditid] = useState(-1);


// //     useEffect(()=>{
// //         axios.get("http://localhost:3000/users")
// //         .then(res=>setData(res.data))
// //         .catch(err=>console.log(err))
// //     },[]);

// //     const handleSubmit = (event)=>{
// //         event.preventDefault();
// //         const id = data.length + 1
// //         axios.post("http://localhost:3000/users" , {id : id , name : name , email : email})
// //         .then(res => {
// //             location.reload();
// //         })
// //         .catch(err => console.log(err));
// //     }

// //     const handleEdit = (id)=>{
// //         axios.get("http://localhost:3000/users"+id)
// //         .then(res=>{
// //             console.log(res.data);
// //             usetName(res.data.name);
// //             usetEmail(res.data.email);
// //         })
// //         .catch(err=>console.log(err))
// //         setEditid(id)
// //     }

// //     const handleUpdate = ()=>{
// //         axios.put("http://localhost:3000/users"+editId ,{id : editId , name : uname , email : uemail})
// //         .then(res => {
// //             console.log(res);
// //             location.reload();
// //             setEditid(-1);
// //         }).catch(err=>console.log(err));
// //     };

// //     const handleDelete = (id)=>{
// //         axios.delete("http://localhost:3000/users"+id)
// //         .then(res=>{
// //             console.log(res.data);
// //             location.reload(); 
// //         })
// //         .catch(err=>console.log(err))
// //     }

// //   return (
// //     <div className='container'>  
// //         <div className='form-div'>
// //             <form onSubmit={handleSubmit}>
// //                 <input type="text" placeholder='enter name'  onChange={e => setName(e.target.value)}/>
// //                 <input type="text" placeholder='enter email' onChange={e => setEmail(e.target.value)}/>
// //                 <button>Add</button>
// //             </form>
// //         </div>
// //         <table>
// //             <thead>
// //                 <tr>

// //                     <th>Id</th>
// //                     <th>Name</th>
// //                     <th>Email</th>
// //                     <th>Action</th>

// //                 </tr>
// //             </thead>
// //             <tbody style={{}}>
// //                 {

// //                     data.map((user , index) =>{
// //                         return(
// //                             user.id === editId ? 
// //                             <tr>
// //                                 <td>{user.id}</td>
// //                                 <td><input type="text" value={uname} onChange={e => usetName(e.target.value)}/></td>
// //                                 <td><input type="text" value={uemail} onChange={e => usetEmail(e.target.value)}/></td>
// //                                 <td><button onClick={handleUpdate}>update</button></td>
// //                             </tr>
// //                             :
// //                             <tr key={index}>
// //                             <td>{user.id}</td>
// //                             <td>{user.name}</td>
// //                             <td>{user.email}</td>
// //                             <td>
// //                                 <button onClick={()=>handleEdit(user.id)}>edit</button>
// //                                 <button onClick={()=>handleDelete(user.id)}>delete</button>

// //                             </td>
// //                         </tr> 
// //                         )

// //                     })
// //                 }
// //             </tbody>
// //         </table>
// //     </div>
// //   )
// // }

// // export default Table



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function Table() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [uemail, setUemail] = useState('');
    const [number, setNumber] = useState('');
    const [unumber, setUnumber] = useState('');
    const [address, setAddress] = useState('');;
    const [uaddress, setUaddress] = useState('');
    const [editId, setEditid] = useState(-1);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:3000/users")
            .then(res => {
                console.log("Fetched Data:", res.data); // Debugging step
                setData(res.data);
            })
            .catch(err => console.log(err));
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if the name or email already exists
        const isDuplicate = data.some(user => user.name === name || user.email === email);

        if (isDuplicate) {
            alert("User with this Name or Email already exists!");
            return;
        }

        axios.post("http://localhost:3000/users", { name, email , number,address }) // No need to manually set `id`
            .then(() => {
                fetchUsers(); // Refresh the table
                setName('');
                setEmail('');
                setNumber('');
                setAddress('');
            })
            .catch(err => console.log(err));
    };



    const handleEdit = (id) => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(res => {
                setUname(res.data.name);
                setUemail(res.data.email);
                setUnumber(res.data.number);
                setUaddress(res.data.address);
                setEditid(id);
            })
            .catch(err => console.log(err));
    };

    const handleUpdate = () => {
        const isDuplicate = data.some(user =>
            user.id !== editId && (user.name === uname || user.email === uemail)
        );

        if (isDuplicate) {
            alert("Another user with this Name or Email already exists!");
            return;
        }

        axios.put(`http://localhost:3000/users/${editId}`, { id: editId, name: uname, email: uemail , number : unumber , address: uaddress})
            .then(() => {
                fetchUsers(); // Refresh list without reload
                setEditid(-1);
            })
            .catch(err => console.log(err));
    };


    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(() => {
                fetchUsers(); // Instead of location.reload()
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} required />
                    <input type="email" placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="number" placeholder='Enter number' value={number} onChange={e => setNumber(e.target.value)} required />
                    <input type="address" placeholder='Enter address' value={address} onChange={e => setAddress(e.target.value)} required />

                    <button type="submit">Add</button>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        user.id === editId ? (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><input type="text" value={uname} onChange={e => setUname(e.target.value)} /></td>
                                <td><input type="text" value={uemail} onChange={e => setUemail(e.target.value)} /></td>
                                <td><input type="text" value={unumber} onChange={e => setUnumber(e.target.value)} /></td>
                                <td><input type="text" value={uaddress} onChange={e => setUaddress(e.target.value)} /></td>

                                <td>
                                    <button onClick={handleUpdate}>Update</button>
                                    <button onClick={() => setEditid(-1)}>Cancel</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
