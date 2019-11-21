import React from 'react';

export default props => {
    const { type, configs, style, className,onClick } = props;
    const outputConfigs = configs=>{
        if(typeof configs === 'string'){
            return configs;
        }
        if(Array.isArray(configs)){
            return configs.join(' ');
        }
    }
    return (
        <i className={`fa fa-${type} ${outputConfigs(configs)} ${className}`} style={style} onClick={onClick}></i>
    );
}