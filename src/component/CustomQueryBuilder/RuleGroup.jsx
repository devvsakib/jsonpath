import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
import Rule from './Rule';
import { CloseCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

const RuleGroup = ({ query, group, onUpdateGroup, handleRuleUpdate, addRuleToGroup, addGroup, onRemoveGroup, removeRule, supportedOperators }) => {
    if (group.type === 'group') {
        const { combinator, id, rules } = group;

        const handleCombinatorChange = (value) => {
            onUpdateGroup({ ...group, combinator: value });
        };

        return (
            <div className='border border-black/30 p-2 rounded mt-2'>
                <div className='flex gap-2 mb-2'>
                    <Select defaultValue={combinator} onChange={handleCombinatorChange}>
                        <Option value="and">AND</Option>
                        <Option value="or">OR</Option>
                    </Select>

                    <Button className='btn' onClick={() => addRuleToGroup(id)}>Add Rule</Button>
                    <Button className='btn' onClick={() => addGroup(id)}>Add Group</Button>
                    <Button className='btn flex items-center' onClick={() => onRemoveGroup(id)}><CloseCircleOutlined /></Button>
                </div>

                {rules.map((rule, index) => (
                    <RuleGroup
                        key={rule.id}
                        query={query}
                        group={rule}
                        onUpdateGroup={onUpdateGroup}
                        addRuleToGroup={addRuleToGroup}
                        addGroup={addGroup}
                        onRemoveGroup={onRemoveGroup}
                        handleRuleUpdate={handleRuleUpdate}
                        supportedOperators={supportedOperators}
                        removeRule={removeRule}
                    />
                ))
                }
            </div>
        );
    } else if (group.type === 'rule') {
        return (
            <Rule
                rule={group}
                query={query}
                supportedOperators={supportedOperators}
                onUpdateRule={handleRuleUpdate}
                removeRule={removeRule}
            />
        );
    } else {
        return null;
    }
};

export default RuleGroup;
