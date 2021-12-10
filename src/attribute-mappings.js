import React, { useState } from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const userAttributeMappings = {
    "properties": {
        "name": {
            "expression": "user.displayName",
            "pushStatus": "PUSH"
        },
        "nickname": {
            "expression": "user.nickName",
            "pushStatus": "PUSH"
        },
        "given_name": {
            "expression": "user.firstName + user.lastName",
            "pushStatus": "PUSH"
        },
        "middle_name": {
            "expression": "user.middleName",
            "pushStatus": "PUSH"
        },
        "family_name": {
            "expression": "user.lastName",
            "pushStatus": "PUSH"
        },
        "email": {
            "expression": "user.email",
            "pushStatus": "PUSH"
        },
        "profile": {
            "expression": "user.profileUrl",
            "pushStatus": "PUSH"
        },
        "zoneinfo": {
            "expression": "user.timezone == null ? \"America/Los_Angeles\" : user.timezone",
            "pushStatus": "PUSH"
        },
        "locale": {
            "expression": "user.countryCode == null ? \"en-US\" : (String.stringContains(user.countryCode, \"_\") ? String.substringBefore(user.countryCode, \"_\") + \"-\" + String.substringAfter(user.countryCode, \"_\") : user.countryCode)",
            "pushStatus": "PUSH"
        },
        "phone_number": {
            "expression": "user.primaryPhone",
            "pushStatus": "PUSH"
        },
        "street_address": {
            "expression": "user.streetAddress",
            "pushStatus": "PUSH"
        },
        "locality": {
            "expression": "user.city",
            "pushStatus": "PUSH"
        },
        "region": {
            "expression": "user.state",
            "pushStatus": "PUSH"
        },
        "postal_code": {
            "expression": "user.zipCode",
            "pushStatus": "PUSH"
        },
        "country": {
            "expression": "user.countryCode",
            "pushStatus": "PUSH"
        },
        "displayTitle": {
            "expression": "user.firstName",
            "pushStatus": "PUSH"
        }
    }
}

const customNodeStyles = {
    overflow: 'hidden',
    width: '10000px',
    height: '1500px',
};

// const XCoordinateOfElement = 0;
var YCoordinateOfElement = 0;
var previousElementTextLength = 0;

const getLengthOfElementText = (element) => {
    if (element == 0) {
        return previousElementTextLength;
    }
    else {
        let previousElement = element - 1;
        previousElementTextLength = Object.values(userAttributeMappings.properties)[previousElement].expression.length;
        var currentElementTextLength = (previousElementTextLength) / 1.5;
        return currentElementTextLength;
    }
}

const initialElements = [
    {
        id: 'title',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'input',
        data: { label: 'Profile Mappings' },
        position: { x: 0, y: 80 },
    },
    {
        id: 'upstream',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'default',
        data: { label: 'Application to Okta user' },
        position: { x: 250, y: 80 },
    },
    {
        id: 'downstream',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'default',
        data: { label: 'Okta user to application' },
        position: { x: 250, y: 150 },
        overflow: 'hidden'
    },
    { id: 'e1-5', source: 'title', target: `upstream`, animated: true },
    { id: 'e1-5', source: 'title', target: `downstream`, animated: true }
];

for (let element = 0; element < Object.keys(userAttributeMappings.properties).length; element++) {
    initialElements.push({
        id: `appAttr-${element + 1}`,
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'default',
        data: { label: Object.keys(userAttributeMappings.properties)[element] },
        position: { x: 600, y: YCoordinateOfElement += 50 },
    },
        { id: 'e1-2', source: 'downstream', target: `appAttr-${element + 1}`, animated: true },
        {
            id: `userAttr-${element + 1}`,
            targetPosition: 'left',
            type: 'output',
            data: { label: <div style={{ flexWrap: 'wrap', overflowWrap: 'break-word' }}>{Object.values(userAttributeMappings.properties)[element].expression}</div> },
            position: { x: 900, y: YCoordinateOfElement += getLengthOfElementText(element) },
        },
        { id: 'e1-3', arrowHeadType: 'arrowclosed', source: `appAttr-${element + 1}`, target: `userAttr-${element + 1}`, animated: false }
    );
}

const UserProfileMappings = () => {
    return (
        <div style={{ height: 1000 }} style={customNodeStyles}>
            <ReactFlow elements={initialElements} />
        </div>
    );
}

export default UserProfileMappings;