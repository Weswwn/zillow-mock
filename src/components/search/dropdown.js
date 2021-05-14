/* eslint-disable react/prop-types */
import React from 'react';

const Dropdown = ({items}) => {
    console.log('dropdown:', items)
    return (
        <div style={{position: 'absolute', border: '1px solid gray', maxHeight: '400px', marginTop: '0.5rem', borderRadius:'8px', width:'100%', overflow: 'scroll'}}>
            <ul style={{padding: '0px', margin: '0px'}}>
                {items?.map(item => (
                    <li style={{borderBottom: '1px solid gray', cursor: 'pointer', display:'flex', alignItems:'center', listStyleType: 'none', height: '40px', paddingLeft: '2rem', paddingRight: '2rem', paddingTop:'0.5rem', paddingBottom:'0.5rem'}} key={item.address}>
                        <span>{`${item.address} ${item.city} ${item.zip} ${item.state}`}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Dropdown;