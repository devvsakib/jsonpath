import { Button, Input, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import JSONPathSelector from '../JSONPathSelector';

const Rule = ({ query, rule, supportedOperators, onUpdateRule, jsonValue }) => {
    const [isTreeVisible, setIsTreeVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [fieldPath, setFieldPath] = useState('');
    const [selectedJSONPath, setSelectedJSONPath] = useState('');
    const [path, setPath] = useState('');
    const selectorRef = useRef(null);

    const typeChecker = (value) => {
        if (typeof value === 'boolean') {
            return "boolean";
        } else if (!isNaN(Number(value))) {
            const floatValue = parseFloat(value);
            if (!Number.isInteger(floatValue)) {
                return "float";
            } else {
                return "number";
            }
        } else if (typeof value === 'string') {
            if (value === 'true' || value === 'false') {
                return "boolean";
            }
            try {
                const parsedValue = JSON.parse(value);
                if (Array.isArray(parsedValue)) {
                    // Check for trailing comma in array
                    const isArrayWithTrailingComma = /\[(.*),\s*\]/;
                    if (isArrayWithTrailingComma.test(value)) {
                        return "string";
                    }
                    return "array";
                }
                if (isNaN(parsedValue)) {
                    return "NaN";
                }
            } catch (error) {
                return "string";
            }
        }
        return typeof value;
    };

    const updateRuleField = (fieldName, value) => {
        let valType = typeChecker(value);
        const updatedRule = { ...rule, [fieldName]: value, valueType: valType };
        if (fieldName === 'value') {
            setFieldPath(value);
        }
        onUpdateRule(updatedRule);
    };


    const removeRule = (ruleId) => {
        const removeRuleFromGroups = (groups) => {
            for (let i = groups.length - 1; i >= 0; i--) {
                const item = groups[i];
                if (item.type === 'rule' && item.id === ruleId) {
                    item.value = '';
                    groups.splice(i, 1);
                } else if (item.type === 'group' && item.rules) {
                    removeRuleFromGroups(item.rules);
                }
            }
        };

        const updatedStructure = { ...query };
        removeRuleFromGroups(updatedStructure.rules);
        onUpdateRule(updatedStructure);
    };

    useEffect(() => {
        const replaced = selectedJSONPath.replace(/\d/g, '*');
        console.log(typeof selectedValue);
        if (replaced || selectedValue) {
            const updatedRule = { ...rule, field: replaced, value: selectedValue, valueType: typeof selectedValue };
            setPath(replaced);
            onUpdateRule(updatedRule);
        }
    }, [selectedValue]);

    const handleSelectorToggle = () => {
        setTimeout(() => {
            setIsTreeVisible(true);
        }, 100);
        // setIsTreeVisible((prevState) => !prevState);
    };
    const handleClickOutside = (event) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setIsTreeVisible(false);
        }
    };
    useEffect(() => {
        if (isTreeVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isTreeVisible]);

    return (
        <div className='flex gap-2 justify-between mt-2'>
            <Input
                type="text"
                placeholder="field"
                value={rule.field || path}
                onChange={e => updateRuleField('field', e.target.value)}
                onFocus={handleSelectorToggle}
            />

            <Select
                value={rule.operator || supportedOperators[0].name}
                onChange={op => updateRuleField('operator', op)}
            >
                {supportedOperators.map((operator) => (
                    <Select.Option key={operator.name} value={operator.name}>
                        {operator.label}
                    </Select.Option>
                ))}
            </Select>

            {isTreeVisible && (
                <div ref={selectorRef} className='fixed -top-5 -right-[20vw] z-50'>
                    <JSONPathSelector
                        data={query}
                        setSelectedValue={setSelectedValue}
                        setSelectedJSONPath={setSelectedJSONPath}
                        setIsTreeVisible={setIsTreeVisible}
                        fieldPath={fieldPath}
                    />
                </div>
            )}

            <Input
                type="text"
                placeholder='value'
                value={rule.value}
                onChange={e => updateRuleField('value', e.target.value)}
            />

            <Button className='btn flex items-center' onClick={() => removeRule(rule.id)}><CloseOutlined /></Button>
        </div>
    );
};

export default Rule;
