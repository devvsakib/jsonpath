import React, { useEffect, useMemo, useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Input } from 'antd';

const JSONPathSelector = ({ json, onSelect, path = '' }) => {
    const [expandedPaths, setExpandedPaths] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggle = (currentPath) => {
        if (expandedPaths.includes(currentPath)) {
            setExpandedPaths(expandedPaths.filter(path => !path.startsWith(currentPath)));
        } else {
            setExpandedPaths([...expandedPaths.filter(path => !path.startsWith(currentPath)), currentPath]);
        }
    };

    const isExpanded = (currentPath) => {
        return expandedPaths.some(path => path === currentPath);
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const renderJSON = (data = {}, currentPath = '') => {
        return Object.entries(data).map(([key, value], indx) => {
            const newPath = currentPath === '' ? key : `${currentPath}.${key}`;

            if (value && typeof value === 'object') {
                const filteredChildren = renderJSON(value, newPath);
                if (filteredChildren.length === 0) return null;

                return (
                    <div key={indx} className='cursor-pointer p-2'>
                        <div
                            className='flex items-center'
                            onClick={() => handleToggle(newPath)}
                        >
                            <span
                                className='mr-2 text-gray-400'
                                style={{ cursor: 'pointer' }}
                            >
                                {isExpanded(newPath) ? <FaCaretUp /> : <FaCaretDown />}
                            </span>
                            <span onClick={() => handleToggle(newPath)} style={{ cursor: 'pointer' }}>
                                {Array.isArray(data) ? `Item ${(indx + 1)}` : key}
                            </span>
                        </div>
                        <div style={{ marginLeft: '15px' }}>
                            {isExpanded(newPath) && filteredChildren}
                        </div>
                    </div>
                );
            } else {
                let displayValue;
                if (value === null) {
                    displayValue = 'null';
                } else if (value === undefined) {
                    displayValue = 'undefined';
                } else {
                    displayValue = String(value);
                }

                if (key.includes(searchTerm) || displayValue.includes(searchTerm)) {
                    return (
                        <div key={newPath}
                            onClick={() => onSelect({ path: newPath, value })}
                            className='flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md gap-5'
                        >
                            <span>{key}</span>
                            <span className='text-gray-400 text-sm' style={{ cursor: 'pointer' }}>
                                {
                                    displayValue.length > 50 ? `${displayValue.slice(0, 30)}...` : displayValue
                                }
                            </span>
                        </div>
                    );
                } else {
                    return null;
                }
            }
        }).filter(item => item !== null);
    };

    useEffect(() => {

        if (searchTerm === '') {
            setExpandedPaths([]);
            return;
        }

        const expandNodes = (data = {}, currentPath = '') => {
            Object.entries(data).forEach(([key, value]) => {
                const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
                
                if (key.includes(searchTerm) || String(value).includes(searchTerm)) {
                    setExpandedPaths(expandedPaths => [...expandedPaths, newPath]);
                }
                if (value && typeof value === 'object') {
                    if (Object.keys(value).some(subKey => subKey.includes(searchTerm))) {
                        setExpandedPaths(expandedPaths => [...expandedPaths, newPath]);
                    }
                    expandNodes(value, newPath);
                }
            });
        };
        
        expandNodes(json);
    }, [searchTerm]);


    return (<div className='border border-gray-300  shadow rounded-md p-5 pr-0 py-2 text-gray-600'>
        <div className='mt-3 pr-5'>
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                allowClear
                className="border border-gray-400 p-1 px-3 rounded-md mb-3"
            />
        </div>
        {renderJSON(json, path)}
    </div>);
};

export default JSONPathSelector;
