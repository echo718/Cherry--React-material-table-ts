import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    div:{
        marginTop:'20px',
        display: 'flex',
    },
    button: {
        lineHeight:'20px', 
        fontSize:'12px',
        marginLeft:'10px',
        backgroundColor:'#8f1739',
        color:'white',
    },
    link:{
        textDecoration: 'none',
    },
    root: {
        height:'31px',
        marginLeft:'20px',
        marginBottom:'20px',
        fontSize:'12px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
  }),
);


export interface SearchBox {
    value?:any,
    onChange?:any,
    onShow?:any,
    showSearch?:any
}
const SearchBox: React.SFC<SearchBox> = ({
    value, 
    onChange,
    onShow,
    showSearch
}) => {
    const classes = useStyles()
    return ( 
        <div className={classes.div}>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search order reference or user name"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange = {e => onChange(e.currentTarget.value)}
                />
                <IconButton 
                    type="submit" 
                    className={classes.iconButton} 
                    aria-label="search"
                    // onClick={e => onChange(e.currentTarget.value)}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Link to="/Bella/OrderManagement" className={classes.link}>
            <Button
                variant="contained"
                // color="primary"
                onClick={onShow}
                className={classes.button}
                endIcon={showSearch? <ArrowDropUpIcon />:<ArrowDropDownIcon />}
            >
                Other Options
            </Button>
            </Link>
              
        </div>
     );
}
 
export default SearchBox;