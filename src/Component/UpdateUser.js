import react, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { editUser, getUsers } from '../Service/api';
import {useNavigate, useParams } from 'react-router-dom';


const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 5
        }
    }
})

const AddUser = () => {
    const [user, setUser] = useState();
    const [formError, setformError] = useState({});
    const classes = useStyles();
    const navigate = useNavigate();
    const { userId } = useParams();
    const [isSubmit, setisSubmit] = useState(false);

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        setformError(validate(user))
        setisSubmit(true)
            if(Object.keys(formError).length === 0 && isSubmit){
                await editUser(userId ,user);
            window.alert("User added Succesfully")
            navigate('/')
        }   
    }

  const getData = async()=>{
    const rslt = await getUsers(userId)
    setUser(rslt.data);
  }

    useEffect(() => {
         getData()
    }, [])
    

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.employee_name){
            errors.employee_name = "name required "
        }

        if(!values.employee_email){
            errors.employee_email = "Email required"
        }else if (!regex.test(values.employee_email)) {
            errors.employee_email = "This is not a valid email format!";
        }
        if(!values.employee_hobbies){
            errors.employee_hobbies = "hobbies required"
        }
        return errors;
    }

    return (
        <>
      <FormGroup className={classes.container}>
      <Typography variant="h4">Update User</Typography>
      
      <FormControl>
          <Input onChange={(e) => onValueChange(e)} name='employee_name' value={user && user.employee_name} id="my-input" />
          <p style={{color: 'red'}}>{formError.employee_name}</p>
      </FormControl>
      <FormControl>
          <Input onChange={(e) => onValueChange(e)} name='employee_phone' value={user && user.employee_phone} id="my-input"/>
          <p style={{color: 'red'}}>{formError.employee_phone}</p>
      </FormControl>
      <FormControl>
          <Input onChange={(e) => onValueChange(e)} name='employee_email' value={user && user.employee_email} id="my-input" />
          <p style={{color: 'red'}}>{formError.employee_email}</p>

      </FormControl>
      <FormControl>
          <Input onChange={(e) => onValueChange(e)} name='employee_hobbies' value={user && user.employee_hobbies} id="my-input" />
          <p style={{color: 'red'}}>{formError.employee_hobbies}</p>

      </FormControl>
      <FormControl>
          <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
      </FormControl>
  </FormGroup>
  </>
    )
}

export default AddUser;