import classes from './Button.module.css';

export default function Button({children,size,primary,white,outline,blue,onClick,block,secondary}){
    let styles = {};
    if (size){
        if (size === 'l'){
            styles = {'font-size': '1.2rem', 'padding': '10px 20px'};
        }
    }
    if(block){
        styles['display'] = 'block';
        styles['width'] = '100%';
    }
    if(primary){
        styles['background-color'] = '#5542F6'
        styles['color'] = '#fff'
    }
    if(white && outline){
        styles['background-color'] = 'transparent';
        styles['color'] = 'white';
        styles['border'] = '1px solid #fff';
    }
    if(blue && outline){
        styles['background-color'] = 'transparent'
        styles['color'] = '#5542F6'
        styles['border'] = '1px solid #5542F6';
    }
    if(secondary){
        styles['background-color'] = '#f0f0f0'
        styles['color'] = '#000'
    }
    return <button style={styles} onClick={onClick} className={classes.btn}>{children}</button>
}