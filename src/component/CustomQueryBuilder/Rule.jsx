import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import JSONPathSelector from '../JSONPathSelector';

const Rule = ({ query, rule, supportedOperators, onUpdateRule, jsonValue }) => {
    const [isTreeVisible, setIsTreeVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedJSONPath, setSelectedJSONPath] = useState('');
    const [path, setPath] = useState('');

    const handleFieldChange = (e) => {
        const updatedRule = { ...rule, field: e.target.value };
        onUpdateRule(updatedRule);
    };

    const handleOperatorChange = (value) => {
        const updatedRule = { ...rule, operator: value };
        onUpdateRule(updatedRule);
    };

    const handleValueChange = (e) => {
        const updatedRule = { ...rule, value: e.target.value };
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
        if (replaced) {
            const updatedRule = { ...rule, field: replaced, value: selectedValue };
            setPath(replaced);
            onUpdateRule(updatedRule);
        }
    }, [selectedValue]);

    return (
        <div className='flex gap-2 justify-between mt-2'>
            <Input
                type="text"
                placeholder="field"
                value={path}
                onChange={handleFieldChange}
                onFocus={() => setIsTreeVisible(true)}

            />

            <Select
                value={rule.operator || supportedOperators[0].name}
                onChange={handleOperatorChange}
            >
                {supportedOperators.map((operator) => (
                    <Select.Option key={operator.name} value={operator.name}>
                        {operator.label}
                    </Select.Option>
                ))}
            </Select>
            {
                isTreeVisible && (
                    <div className='absolute right-36 -top-5'>
                        <JSONPathSelector
                            data={query}
                            setSelectedValue={setSelectedValue}
                            setSelectedJSONPath={setSelectedJSONPath}
                            setIsTreeVisible={setIsTreeVisible}
                        />
                    </div>
                )}
            <Input type="text" placeholder='value' value={"" || rule.value} onChange={handleValueChange} />

            <Button className='btn flex items-center' onClick={() => removeRule(rule.id)}><CloseOutlined /></Button>
        </div>
    );
};

export default Rule;
