import React, { useState, useEffect, useRef } from 'react';
import { JSONTree } from 'react-json-tree';
import jsonpath from 'jsonpath';
import { dummyData } from './large-data-set';
import './App.css';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPath, setSelectedPath] = useState(null);
    const [path, setPath] = useState('');
    const [jsonTreeData, setJsonTreeData] = useState("");


    const handleFieldSelect = (path) => {
        setSelectedPath(path);
    };


    const generateJSONPath = (data, targetValue) => {
        const traverse = (node, path) => {
            if (typeof node === 'object') {
                for (const key in node) {
                    const newPath = path ? `${path}.${key}` : key;
                    const value = node[key];
                    if (value === targetValue) {
                        return newPath;
                    }
                    const result = traverse(value, newPath);
                    if (result) {
                        return result;
                    }
                }
            } else if (Array.isArray(node)) {
                for (let i = 0; i < node.length; i++) {
                    const newPath = path ? `${path}[${i}]` : `[${i}]`;
                    const value = node[i];
                    if (value === targetValue) {
                        return newPath;
                    }
                    const result = traverse(value, newPath);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        };

        return traverse(data, '');
    };


    const searchNode = (node, path = '') => {
        if (typeof node === 'object') {
            for (let key in node) {
                const newPath = path ? `${path}.${key}` : key;
                const value = node[key];

                // Check if key or value contains the search term
                if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                    handleFieldSelect(newPath);
                    return true;
                } else if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    handleFieldSelect(newPath);
                    return true;
                }

                if (searchNode(value, newPath)) return true;
            }
        } else if (Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                const newPath = path ? `${path}[${i}]` : i.toString();
                const value = node[i];

                // Check if value in array contains the search term
                if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    handleFieldSelect(newPath);
                    return true;
                }

                if (searchNode(value, newPath)) return true;
            }
        }
        return false;
    };


    const handleValueClick = (value) => {
        const path = generateJSONPath(dummyData, value);
        handleFieldSelect(path);
      };
    
      const handleExpandPath = () => {
        setJsonTreeData(jsonpath.value(dummyData, path));
      };

    useEffect(() => {
        if (searchTerm.trim() === '') {
          setSelectedPath(null);
          return;
        }
        setSelectedPath(null);
        searchNode(dummyData);
      }, [searchTerm]);



    const theme = {
        scheme: 'monokai',
        base00: '#f8f8f2',
        base05: '#383830',
        base01: '#272822',
        base02: '#49483e',
        base03: '#75715e',
        base04: '#a59f85',
        base06: '#f5f4f1',
        base07: '#f9f8f5',
        base08: '#f92672',
        base09: '#fd971f',
        base0A: '#f4bf75',
        base0C: '#a1efe4',
        base0B: '#cc6633',
        base0D: '#ae81ff',
        base0E: '#a6e22e',
        base0F: '#66d9ef',
    }
    return (
        <div className='max-w-[1240px] mx-auto text-black'>
            <div className='flex gap-10'>
                <div>
                    <input
                        type='text'
                        placeholder='Search for a path...'
                        value={searchTerm}
                        className='border border-black outline-none px-2 rounded py-1'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Selected Path:</h3>
                    <p className='text-black'>{selectedPath}</p>
                </div>
                <div className='flex gap-10'>
                    <div>
                        <input
                            type='text'
                            placeholder='Enter JSON path...'
                            value={path}
                            className='border border-black outline-none px-2 rounded py-1'
                            onChange={(e) => setPath(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className='border border-black px-2 rounded py-1' onClick={handleExpandPath}>
                            Value
                        </button>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-10'>
                <JSONTree
                    data={dummyData}
                    theme={{
                        extend: theme,
                        valueLabel: {}
                    }}
                    getItemString={(type, data, itemType, itemString, keyPath) => <span></span>}
                    labelRenderer={([key, parentKey]) => <strong>{key} : </strong>}
                    valueRenderer={(raw, value) => {
                        return (
                            <span
                                className='cursor-pointer'
                                onClick={() => handleValueClick(value)}
                            >
                                {raw}
                            </span>
                        );
                    }}
                    shouldExpandNode={(keyName, data, level) => level < 2}
                    hideRoot
                />
                <div>
                    <ul className='text-black'>
                        {jsonTreeData && (
                            <JSONTree
                                data={jsonTreeData}
                                theme={{
                                    extend: theme,
                                    valueLabel: {}
                                }}
                                getItemString={(type, data, itemType, itemString) => <span>{itemString}</span>}
                                labelRenderer={([key]) => key && <strong>{key} :</strong>}
                                valueRenderer={(raw, data, value) => {
                                    return (
                                        <span
                                            className='cursor-pointer'
                                        >
                                            {data}
                                        </span>
                                    );
                                }}
                                hideRoot
                                // iw ant to expend by default
                                shouldExpandNode={(keyName, data, level) => level < 2}
                            />

                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
