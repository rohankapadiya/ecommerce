import classes from './Center.module.css';

export default function Center({children}){
    return <div className={classes.center}>
        {children}
    </div>
}