import React, { useEffect, useState } from 'react'
import QueryBuilder from './component/CustomQueryBuilder/QueryBuilder'
import JSONPathSelector from './JSONPath'
import { dummyData as data, dummyData } from './large-data-set';
import { FaRecycle } from 'react-icons/fa';
import { Input } from 'antd';

const jsonData = {
    "name": "John",
    "age": 30,
    "cars": {
        "car1": "Ford",
        "car2": "BMW",
        "car3": "Fiat",
        "cars2": {
            "car1": "Ford",
            "car2": "BMW",
            "car3": "Fiat",
            "cars2": {
                "car1": "Ford",
                "car2": "BMW",
                "car3": "Fiat"
            }
        }
    },
    "cars2": {
        "car1": "Ford",
        "car2": "BMW",
        "car3": "Fiat"
    }
};
const App = () => {
    const [selectedInfo, setSelectedInfo] = useState({ path: '', value: null });
    const [inputValue, setInputValue] = useState('');

    const handleSelect = ({ path, value }) => {
        setSelectedInfo({ path, value });
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // update the inputValue when selectedInfo if changed, replace $$ from inputValue and replace with selected path
    useEffect(() => {
        if (selectedInfo?.path) {
            setInputValue(inputValue.replace('$$', `{$.${selectedInfo.path}}`));
        }
    }, [selectedInfo]);

    return (
        <div className='max-w-[1280px] mx-auto mt-10'>
            <div className='grid gap-5'>
                {/* <div className='mt-3 pr-5 max-w-xl'>
                    <Input
                        type="text"
                        placeholder="val"
                        value={inputValue}
                        onChange={handleInputChange}
                        allowClear
                        className="border border-gray-400 p-1 px-3 rounded-md mb-3"
                    />
                </div> */}
                <div className='grid grid-cols-2 gap-5'>
                    {/* {inputValue.includes('$$') && <JSONPathSelector json={dummyData} onSelect={handleSelect} />} */}
                    <JSONPathSelector json={dummyData} onSelect={handleSelect} />
                    <div className='fixed top-10 right-10 w-[30vw]'>
                        <div>
                            <h3>Path:</h3>
                            <pre>$.{selectedInfo?.path}</pre>
                        </div>
                        <div>
                            <h3>Value:</h3>
                            <pre className='!break-words flex flex-wrap'>
                                {/* check if undefined, show undefined too */}
                                {JSON.stringify(selectedInfo?.value, null, 2)}
                                {
                                    selectedInfo?.value === undefined && <span>Select a value</span>
                                }
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
            {/* <QueryBuilder />
             */}
            <p className='text-center my-10 text-black'>
                Repo: <a className='text-orange-500 alink hover:text-green-500' href="https://github.com/devvsakib/jsonpath">Check</a>
            </p>
        </div>
    )
}

export default App