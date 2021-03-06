import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const elements = [
    {
        id: '2',
        type: 'special',
        position: { x: 100, y: 100 },
        style: { border: 'black' },
        data: { text: 'user.countryCode == null ? \"en-US\" : (String.stringContains(user.countryCode, \"_\") ? String.substringBefore(user.countryCode, \"_\") + \"-\" + String.substringAfter(user.countryCode, \"_\") : user.countryCode)' },
    },
];

const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFG',
    padding: 10,
    width: '100px',
    height: '150px',
    border: 'black',
    overflow: 'hidden',
};

const CustomNodeComponent = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type="target" position="left" style={{ borderRadius: 0 }} />
            <div>{data.text}</div>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ top: '50%', borderRadius: 0 }}
            />
        </div>
    );
};

const nodeTypes = {
    special: CustomNodeComponent,
};

const CustomNodeExample = () => {
    return (
        <div style={{ height: 300 }}>
            <ReactFlow elements={elements} nodeTypes={nodeTypes} />
        </div>
    );
};

export default CustomNodeExample;