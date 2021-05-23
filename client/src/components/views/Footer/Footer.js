import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            width: "100vw", height: '70px', display: 'flex',
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem', backgroundColor:"black", color:"white"
        }}>
           <p> Foto Archiv </p>
           <Icon type="copyright" style={{position:"absolute", position:"relative", top:"-7px", right:"-5px"}}/>
        </div>
    )
}

export default Footer
