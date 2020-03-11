import React from 'react';
import Input from './Input';

const MusicianForm= ({handleChange, handleSubmit, errors, form, buttontext})=>{
return(
    <form onSubmit ={(e)=>{handleSubmit(e)}}>
        <div class="form-group">
            <Input
            label="First Name: "
            type="text"
            value={form.firstName}
            name="firstName"
            error={errors.firstName!=null?errors.firstName.message:""}
            handleChange={handleChange}
            
            />

        </div>
        <div class="form-group">
            <Input
            label="Last Name: "
            type="text"
            value={form.lastName}
            name="lastName"
            error={errors.lastName!=null?errors.lastName.message:""}
            handleChange={handleChange}
            
            />

        </div>

        <div class="form-group">
            <Input
             label="Instrument: "
             type="text"
             value={form.instrument1}
             name="instrument1"
             error={errors.instrument1!=null?errors.instrument1.message:""}
             handleChange={handleChange}
            
            />

        </div>

        <div class="form-group">
            <Input
              label="Second Instrument: "
              type="text"
              value={form.instrument2}
              name="instrument2"
              error={errors.instrument2!=null?errors.instrument2.message:""}
              handleChange={handleChange}
            
            />

        </div>

        <div class="form-group">
            <Input
              label="Third Instrument: "
              type="text"
              value={form.instrument3}
              name="instrument3"
              error={errors.instrument3!=null?errors.instrument3.message:""}
              handleChange={handleChange}
            
            />

        </div>

        <input className= "btn btn-success" type="submit" value={buttontext}/>



    </form>

);
}

export default MusicianForm;
