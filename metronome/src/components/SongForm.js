import React from 'react';
import Input from './Input';

const SongForm= ({handleChange, handleSubmit, errors, form, buttontext})=>{
    return(
        <form onSubmit ={(e)=>{handleSubmit(e)}}>
            <div class="form-group">
                <Input
                label="Song Title: "
                type="text"
                value={form.title}
                name="title"
                error={errors.title!=null?errors.title.message:""}
                handleChange={handleChange}
                />
            </div>
            <div class="form-group">
                <Input
                label="Song Artist: "
                type="text"
                value={form.artist}
                name="artist"
                error={errors.artist!=null?errors.artist.message:""}
                handleChange={handleChange}
                />
            </div>
            <div class="form-group">
                <Input
                label="Vocals: "
                type="text"
                value={form.songvocalist}
                name="songvocalist"
                error={""}
                handleChange={handleChange}
                />
            </div>

            <div class="form-group">
                <Input
                label="Comments: "
                type="text"
                value={form.comments}
                name="comments"
                error={""}
                handleChange={handleChange}
                />
            </div>

            <input className= "btn btn-success" type="submit" value={buttontext}/>



            </form>
    );

}
export default SongForm;
