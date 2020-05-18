import React from 'react';
import Input from './Input';

const GigForm = ({ handleChange, handleSubmit, errors, form, buttontext }) => {
    return (


        <form onSubmit={(e) => { handleSubmit(e) }}>
            <div class="form-group">
                <Input
                    label="Gig Event "
                    type="text"
                    value={form.event}
                    name="event"
                    error={errors.event != null ? errors.event.message : ""}
                    handleChange={handleChange}
                />
            </div>
            <div class="form-group">
                <Input
                    label="Date: "
                    type="Date"
                    value={form.date}
                    name="date"
                    error={errors.date != null ? errors.date.message : ""}
                    handleChange={handleChange}
                />
            </div>
            <div class="form-group">
                <Input
                    label="Time: "
                    type="text"
                    value={form.time}
                    name="time"
                    error={errors.time != null ? errors.time.message : ""}
                    handleChange={handleChange}
                />
            </div>


            <input className="btn btn-success" type="submit" value={buttontext} />



        </form>
    );

}
export default GigForm;
