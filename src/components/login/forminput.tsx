import React from 'react';

type IProps=Readonly<{
    type:string;
    name:string;
    value:string;
    labelName:string;
    required:boolean;
    onChange:(e:any)=>void;
}>;

const FormInput = ({labelName,...otherProps}:IProps) => {
 
    return (
        <div className='group'>
             {
                labelName? 
                (<label 
                   style={{width:"180px",height:"40px"}}
                    >{labelName}</label>)
                :null
            }
            <input style={ { margin:"8px"}} {...otherProps}/>
           
           
        </div>
    )
}
export default FormInput;