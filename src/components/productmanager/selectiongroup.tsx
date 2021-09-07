import React,{useState} from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
//import { Button } from 'antd';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      fontSize:'12px',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems:'fix-end',
        fontSize:'12px',
    },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    btns:{
        marginTop:'15px',
        borderRadius:'4px',

    },
  }),
);

export interface SelectionGroup { 
    onItemSelect?:any,
    onTimeSelect?:any,
}

const SelectionGroup: React.SFC<SelectionGroup> = ({ 
    onItemSelect,
    onTimeSelect,

 }) => {
    const classes = useStyles();

    const [queryData, setQueryData ] = useState<any>({ subStartDate:'yyyy-MM-ddThh:mm', subEndDate:'yyyy-MM-ddThh:mm',})
    const [resetData, setResetData ] = useState<any>({ startTime:'', endTime:'',})
   
    const changeQueries = (event:any) =>{
        queryData[event.target.name] = event.target.value
        setQueryData(queryData)
        console.log(queryData)
        if(queryData.subStartDate && queryData.subEndDate ){
        onTimeSelect(queryData.subStartDate,queryData.subEndDate)
    }  
    }
    const timeReset =()=>{
        queryData['subStartDate']='yyyy-MM-ddThh:mm'
        queryData['subEndDate']='yyyy-MM-ddThh:mm'
        setQueryData(queryData)
        console.log(queryData)
        onTimeSelect(resetData.startTime,resetData.endTime)
    }


    return ( 
        <div className='selectionGroup'>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor='age-native-simple'>Product Name</InputLabel>
                <Select native
                        onChange={(event)=>onItemSelect(event.target.value)} >
                    <option aria-label='None' value=''/>     
                    <option value='1'>Cherry Delight 悦享礼盒 28-30mm 1kg</option>
                    <option value='6'>Cherry Delight 悦享礼盒 30-32mm 1kg</option>
                    <option value='28'>Cherry Delight 悦享礼盒 28-30mm 2kg</option>
                    <option value='30'>Cherry Delight 悦享礼盒 32-34mm 2kg</option>
                    <option value='31'>Kiwi Delight 维尊礼盒 34mm+ 48颗</option>
                    <option value='32'>Red Sensation 红色诱惑 28-30mm 2kg</option>
                    <option value='33'>Red Sensation 红色诱惑 32-34mm 2kg</option>
                    <option value='34'>Red Sensation 红色诱惑 30-32mm 2kg</option>
                    <option value='35'>Cherry Delight 悦享礼盒 30-32mm 2kg</option>
                    <option value='36'>Cherry Delight 悦享礼盒 32-34mm 1kg</option>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor='age-native-simple'>Order Status</InputLabel>
                <Select native
                        onChange={(event)=>onItemSelect(event.target.value)} >
                    <option aria-label='None' value=''/>                    
                    <option value={1}>None</option>
                    <option value={2}>New Order (新订单)</option>
                    <option value={3}>Dispatching (发货中)</option>
                    <option value={4}>Dispatched (已发货)</option>          
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
            <form className={classes.container} noValidate>
                <TextField
                    name="subStartDate"
                    // onChange={(event)=>{onChange('subDateStart',event.target.value)}}
                    onChange={changeQueries}
                    id='Submit Date Start'
                    label='Submit Date Start'
                    type='datetime-local'
                    value={queryData.subStartDate}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField 
                    name="subEndDate"
                    // onChange={(event)=>{onChange('subDateEnd',event.target.value)}}
                    onChange={changeQueries}
                    id='Submit Date End'
                    label='Submit Date End'
                    type='datetime-local'
                    value={queryData.subEndDate}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                {/* <Button className={classes.btns} onClick={timeReset}>TIME RESET</Button> */}
            </form> 
            </FormControl> 
        </div>
    );
}


export default SelectionGroup;