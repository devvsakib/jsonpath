import { useState, useEffect } from 'react';
import { JSONTree } from 'react-json-tree';
import jsonpath from 'jsonpath';
import { Button, Input } from 'antd';
import { ArrowDownOutlined, CloseOutlined } from '@ant-design/icons';
import { dummyData as data } from '../large-data-set';

const JSONPathSelector = ({ setIsTreeVisible, setSelectedJSONPath, setSelectedValue, fieldPath }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPath, setSelectedPath] = useState(null);
    const [jsonValue, setJsonValue] = useState('');
    const [jsonTreeValue, setJsonTreeValue] = useState('');
    const [advanceSearch, setAdvanceSearch] = useState(false);
    const [advanceSearchPath, setAdvanceSearchPath] = useState('$');
    // $[?(@.name.charAt(0) == 'S')]
    const handleFieldSelect = (path) => {
        // setIsTreeVisible(false);
        setSelectedPath(path);
        setSelectedJSONPath(path);
    };

    const generateJSONPath = (data, targetValue) => {
        const traverse = (node, path) => {
            if (typeof node === 'object') {
                for (const key in node) {
                    const newPath = path ? `${path}.${key}` : key;
                    const value = node[key];
                    if (value === targetValue) {
                        return newPath; // Return the matching path
                    }
                    const result = traverse(value, newPath);
                    if (result) {
                        return path ? `${path}.${result}` : result;
                    }
                }
            } else if (Array.isArray(node)) {
                for (let i = 0; i < node.length; i++) {
                    const newPath = path ? `${path}[${i}]` : `[${i}]`;
                    const value = node[i];
                    if (value === targetValue) {
                        return newPath; // Return the matching path
                    }
                    const result = traverse(value, newPath);
                    if (result) {
                        return path ? `${path}.${result}` : result;
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

                if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                    handleFieldSelect(newPath);
                    setJsonValue(value);
                    return true;
                } else if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    handleFieldSelect(newPath);
                    setJsonValue(value);
                    return true;
                }

                if (searchNode(value, newPath)) return true;
            }
        } else if (Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                const newPath = path ? `${path}[${i}]` : i.toString();
                const value = node[i];

                if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    handleFieldSelect(newPath);
                    setJsonValue(value);
                    return true;
                }

                if (searchNode(value, newPath)) return true;
            }
        }
        setJsonValue('');
        return false;
    };


    const handleValueClick = (value, keyPath) => {
        if (!keyPath) {
            setSelectedJSONPath(value);
            setSelectedValue("test");
        }
        const path = keyPath.reverse().join('.');
        if (value == "true" || value == "false") {
            setJsonValue(value.toString());
            setSelectedValue(value.toString());
            return;
        }
        if (value === null) {
            setJsonValue("null");
            setSelectedValue("null");
        }

        if (path) {
            const result = jsonpath.value(advanceSearch ? jsonTreeValue : data, path);

            if (typeof result !== "object") {
                setJsonValue(result);
                setSelectedValue(result);
            } else {
                setJsonValue("");
                setSelectedValue("");
            }
            handleFieldSelect(path);
        }
    };

    const handleTreeValueClick = (value, keyPath) => {
        setJsonValue('');
        const revPath = keyPath.reverse();
        const result = jsonpath.value(jsonTreeValue, revPath.join('.'));
        console.log("result");
        setJsonValue(result);
        handleFieldSelect(revPath.join('.'));
    }

    const findValueWithPath = (p) => {
        if (!p) return;
        try {
            const result = jsonpath.value(data, p);
            if (result && result.length > 0) {
                setSelectedPath(p);
                setJsonValue(result);
            } else {
                setSelectedPath(p);
                setJsonValue("Value not found");
            }
        } catch (error) {
            console.error(error);
            setSelectedPath(p);
            setJsonValue("Invalid JSONPath");
        }
    };

    const handlePath = (p) => {
        const path = p.replace(/^\$/, '');
        setAdvanceSearchPath(`$${path}`);
        try {
            const result = jsonpath.query(data, p);
            setJsonTreeValue(result);
            if (result.length === 0) {
                setJsonValue("Value not found");
                return;
            }

        } catch (error) { }
    };

    const pathClick = (path) => {
        if (path) {
            const result = jsonpath.value(data, path);
            if (typeof result !== "object") {
                setJsonValue(result);
                setSelectedValue(result);
            } else {
                setJsonValue("");
                setSelectedValue("");
            }
        }
    };

    // useEffect(() => {
    //     findValueWithPath(selectedPath);
    // }, [selectedPath]);

    useEffect(() => {
        if (advanceSearchPath.trim() === '') {
            setJsonTreeValue('');
            return;
        }
        handlePath(advanceSearchPath);
    }, [advanceSearchPath]);

    useEffect(() => {
        handlePath(fieldPath);
    }, [fieldPath]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSelectedPath('');
            setJsonValue('');
            return;
        }
        setSelectedPath('');
        setJsonValue('');
        searchNode(data);
    }, [searchTerm, advanceSearch]);

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
        base0B: '#49483e',
        base0D: '#49483e',
        base0E: '#a6e22e',
        base0F: '#66d9ef',
    }
    useEffect(() => {
        if (typeof jsonTreeValue !== "object" && jsonTreeValue) {
            setSelectedValue(jsonTreeValue);
        }
    }, [jsonTreeValue]);

    const getVal = () => {
        const result = jsonpath.query(data, advanceSearchPath);
        setJsonTreeValue(result);
        if (result.length === 0) {
            setJsonValue("Value not found");
            setSelectedValue("Value not found");
            return;
        }
        //
        if (typeof result === 'string' || Array.isArray(result)) {
            setSelectedValue(result);
            return
        }
    }

    return (
        <div className='mt-2 mx-auto text-black bg-white'>
            {/*
             <div>
                <h2 className='font-bold'>Operator</h2>
                <p>[?(@.name.charAt(0) == 'S')]</p>
                <p>[?(@.is_global)]</p>
            </div>
            */}
            {/* <div className=''>
                <Button className='mb-2' onClick={e => setOpenTree(true)}>Open Tree</Button>
                <div className='grid gap-2'>
                    <Input
                        type='text'
                        placeholder='Path'
                        className='shadow outline-none px-2 rounded py-1'
                        onChange={(e) => findValueWithPath(e.target.value)}
                        value={selectedPath}
                    />
                    <Input
                        type='text'
                        placeholder='Value'
                        className='shadow outline-none px-2 rounded py-1'
                        value={jsonValue}
                    />
                </div>
                <div className='flex gap-2 items-center  mt-1'>
                    <h3 className='text-gray-500'>Selected Path:</h3>
                    <p className='text-black mb-0'>{selectedPath}</p>
                </div>
            </div> */}

            <div className='gap-10 p-4 mt-2 bg-[#f8f8f2] rounded absolute left-0 lg:left-[-75%] h-[96vh]  top-0 overflow-hidden w-[90vw] lg:w-[500px] z-40'>
                <div className='flex justify-between gap-2'>
                    <div className=''>
                        <Input
                            type='text'
                            placeholder='Search...'
                            value={searchTerm}
                            className='outline-none px-2 rounded py-1'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button className='my-1 py-1 px-2' onClick={() => setAdvanceSearch(!advanceSearch)}>
                            <span>Advance Search <ArrowDownOutlined /></span>
                        </Button>
                        {
                            advanceSearch &&
                            <div className='flex gap-2 items-center'>
                                <Input
                                    type='text'
                                    placeholder='Search for a path...'
                                    value={advanceSearchPath}
                                    className='outline-none px-2 rounded py-1'
                                    onChange={(e) => handlePath(e.target.value)}
                                />
                                <Button className='' onClick={getVal}>
                                    OK
                                </Button>
                            </div>
                        }
                        <div className='flex gap-2 items-center  mt-1'>
                            <h3 className='text-gray-500'>Selected Path:</h3>
                            <p className='text-black mb-0 cursor-pointer'
                                onClick={() => pathClick(selectedPath)}
                            >{selectedPath}</p>
                        </div>
                    </div>
                    <Button className='mb-2' onClick={e => setIsTreeVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
                <div className='h-full overflow-y-scroll pb-24'>
                    <p className='muted text-gray-500 -mb-2'>Click to expend</p>
                    <JSONTree
                        data={advanceSearch ? jsonTreeValue : data}
                        theme={{
                            extend: theme,
                            style: {
                                display: "flex",
                                justifyContent: "space-between"
                            }
                        }}
                        getItemString={(type, data, itemType, itemString, keyPath) => <span className='cursor-pointer'>{console.log(keyPath)}</span>}
                        labelRenderer={(keyPath, nodeType) => <strong
                            onClick={() => {
                                // handleValueClick(_, keyPath);
                                console.log("keyPath", keyPath, nodeType);
                            }}
                            className='cursor-pointer '>
                            {
                                nodeType == "Array" ? keyPath[0] : nodeType !== "Object" ? keyPath[0] : ("Item " + (keyPath[0] + 1)) 

                            }
                            {console.log("keyPath", keyPath, nodeType)}
                        </strong>}
                        valueRenderer={(raw, value, ...keyPath) => {
                            return (
                                <span
                                    className='cursor-pointer'
                                    onClick={() => { handleValueClick(value, keyPath); }}
                                >
                                    {raw}
                                </span>
                            );
                        }}
                        hideRoot
                    />
                </div>
            </div>

            <div className='gap-10 p-4 mt-2 bg-[#f8f8f2] rounded'>
                <p className='mt-2 font-semibold'>Value:</p>
                {/* <JSONTree
                    data={jsonTreeValue}
                    theme={{
                        extend: theme,
                        valueLabel: {}
                    }}
                    getItemString={(type, data, itemType, itemString, keyPath) => <span className='cursor-pointer'>{itemType}</span>}
                    labelRenderer={(keyPath, nodeType) => <strong onClick={() => handleTreeValueClick(_, keyPath)}
                    >{keyPath[0]}</strong>}
                    valueRenderer={(raw, value, ...keyPath) => {
                        return (
                            <span
                                className='cursor-pointer'
                                onClick={() => { handleTreeValueClick(value, keyPath); }}
                            >
                                {raw}
                            </span>
                        );
                    }}
                    hideRoot
                /> */}
            </div>
        </div>
    );
};

export default JSONPathSelector