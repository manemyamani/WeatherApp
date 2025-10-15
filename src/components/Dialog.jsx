import {useState} from 'react';
import { forwardRef } from 'react';
import './Dialog.css';
import {createPortal} from 'react-dom';
const Dialog=forwardRef(function Dialog({onclose,onsubmit},ref){
  const [zip,setZip]=useState("");
  const [errors,setErrors]=useState("");
  async function handle(e){
    e.preventDefault();
     if (!zip || !/^[1-9][0-9]{5}$/.test(zip)) {
      setErrors("please enter 6 digits zipcode");
      return;
    }
    setErrors("");
    const errorMessage=await onsubmit(zip, "IN");
    if(errorMessage){
      setErrors(errorMessage);
      return;
    }

    onclose(); 
    setErrors("");
    setZip("");
  }

  return(
   createPortal( <dialog ref={ref} >
    <form onSubmit={handle}>
      <label htmlFor="zip">Zip Code:</label>
        <input
          id="zip"
          name="zip"
          type="text"
          maxLength={6}
          placeholder="Enter 6 digits"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <label htmlFor="country">Country:</label>
        <input id="country" name="country" value="IN" disabled />
        <div className="button-group">
          <button type="button" onClick={onclose}>close</button>
      <button type="submit">Submit</button>
      
    </div>
    </form>
    </dialog>,document.getElementById('modal'))
  )
});
export default Dialog;
