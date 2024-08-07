import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import Rule from './Rule';
import RuleGroup from './RuleGroup';
import { Button, Select } from 'antd';
import { JSONTree } from 'react-json-tree';
import { Editor } from '@monaco-editor/react';
import JSONPathSelector from '../JSONPathSelector';
const supportedOperators = [
    { name: 'begins_with', label: 'begins with' },
    { name: 'not_begins_with', label: 'not begins with' },
    { name: 'between', label: 'between' },
    { name: 'not_between', label: 'not between' },
    { name: 'contains', label: 'contains' },
    { name: 'not_contains', label: 'not contains' },
    { name: 'ends_with', label: 'ends with' },
    { name: 'not_ends_with', label: 'not ends with' },
    { name: 'equal', label: 'equal' },
    { name: 'not_equal', label: 'not equal' },
    { name: 'greater', label: 'greater than' },
    { name: "greater_or_equal", label: "greater than or equal" },
    { name: 'in', label: 'in' },
    { name: 'not_in', label: 'not in' },
    { name: 'is_empty', label: 'is empty' },
    { name: 'is_not_empty', label: 'is not empty' },
    { name: 'is_null', label: 'is null' },
    { name: 'is_not_null', label: 'is not null' },
    { name: 'less', label: 'lesser than' },
    { name: "less_or_equal", label: "lesser than or equal" },
]
const { Option } = Select;

const QueryBuilder = () => {
    const [query, setQuery] = useState({
        type: 'group',
        id: uuidv4(),
        rules: [],
        condition: 'and',
    });

    // parent rule add function
    const addRule = () => {
        const updatedStructure = { ...query };
        updatedStructure.rules.push({
            type: 'rule',
            id: uuidv4(),
            field: '',
            operator: 'begins_with',
            value: '',
        });
        setQuery(updatedStructure);
    };

    // add rule to group function
    const addRuleToGroup = (groupId) => {
        const updatedStructure = { ...query };

        const newRule = {
            type: 'rule',
            id: uuidv4(),
            field: '',
            operator: 'begins_with',
            value: '',
        }

        if (groupId === undefined) {
            updatedStructure.rules.push(newRule);
            console.log(groupId);
            setQuery(updatedStructure);
            return;

        }
        const addRuleToGroup = (groups) => {
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].id === groupId) {
                    if (!groups[i].rules) {
                        groups[i].rules = [];
                    }
                    groups[i].rules.push(newRule);
                    break;
                } else if (groups[i].type === 'group' && groups[i].rules) {
                    addRuleToGroup(groups[i].rules);
                }
            }
        };

        addRuleToGroup(updatedStructure.rules);

        setQuery(updatedStructure);
    };

    // find group by id function
    const findGroupById = (groups, groupId) => {
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            if (group.id === groupId) {
                return group;
            }
            if (group.type === 'group' && group.rules) {
                const result = findGroupById(group.rules, groupId);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    };

    // group adding function
    const addGroup = (parentGorupId) => {
        const updatedStructure = { ...query };
        const newGroupId = uuidv4();
        const newGroup = {
            type: 'group',
            combinator: 'and',
            id: newGroupId,
            rules: [],
        };
        if (typeof parentGorupId === "string") {
            const group = findGroupById(updatedStructure.rules, parentGorupId);
            if (group) {
                if (!group.rules) {
                    group.rules = [];
                }
                group.rules.push(newGroup);
            }
        } else {
            updatedStructure.rules.push(newGroup);
        }
        setQuery(updatedStructure);

    };

    // update condition function and or
    const handleConditionChange = (value) => {
        const updatedStructure = { ...query };
        updatedStructure.condition = value;
        setQuery(updatedStructure);
    };

    // update rule function
    const handleRuleUpdate = (updatedRule) => {
        const updateStructureRecursively = (rules) => {
            return rules.map((rule) => {
                if (rule.id === updatedRule.id) {
                    return updatedRule;
                } else if (rule.type === 'group' && rule.rules) {
                    return { ...rule, rules: updateStructureRecursively(rule.rules) };
                }
                return rule;
            });
        };

        const updatedStructure = {
            ...query,
            rules: updateStructureRecursively(query.rules),
        };
        setQuery(updatedStructure);
    };

    // update group value function
    const handleGroupUpdate = (updatedGroup) => {
        const updatedStructure = { ...query };
        const groupIndex = updatedStructure.rules.findIndex((g) => g.id === updatedGroup.id);
        if (groupIndex !== -1) {
            updatedStructure.rules[groupIndex] = updatedGroup;
        }
        setQuery(updatedStructure);
    };

    // group remove function
    const onRemoveGroup = (groupId) => {
        const updatedStructure = { ...query };
        const removeGroupFromGroups = (groups) => {
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].id === groupId) {
                    groups.splice(i, 1);
                    break;
                } else if (groups[i].type === 'group' && groups[i].rules) {
                    removeGroupFromGroups(groups[i].rules);
                }
            }
        };
        removeGroupFromGroups(updatedStructure.rules);
        setQuery(updatedStructure);
    };

    // remove rule function
    const removeRule = (ruleId) => {
        const removeRuleFromGroups = (groups) => {
            for (let i = groups.length - 1; i >= 0; i--) {
                const item = groups[i];
                if (item.type === 'rule' && item.id === ruleId) {
                    groups.splice(i, 1); // Remove the rule
                } else if (item.type === 'group' && item.rules) {
                    // If it's a group, recursively remove the rule from its rules
                    removeRuleFromGroups(item.rules);
                }
            }
        };

        const updatedStructure = { ...query };
        removeRuleFromGroups(updatedStructure.rules);
        setQuery(updatedStructure);
    };

    // render query elements
    const renderQueryElements = () => {
        return query.rules.map((rule, index) => {
            if (rule.type === 'rule') {
                return (
                    <Rule
                        key={index}
                        rule={rule}
                        query={query}
                        supportedOperators={supportedOperators}
                        onUpdateRule={handleRuleUpdate}
                        removeRule={removeRule}
                    />
                );
            } else if (rule.type === 'group') {
                return (
                    <RuleGroup
                        key={index}
                        group={rule}
                        query={query}
                        supportedOperators={supportedOperators}
                        onUpdateGroup={handleGroupUpdate}
                        addRuleToGroup={addRuleToGroup}
                        handleRuleUpdate={handleRuleUpdate}
                        addGroup={addGroup}
                        onRemoveGroup={onRemoveGroup}
                        removeRule={removeRule}
                    />
                );
            }
            return null;
        });
    };

    return (
        <div className='grid grid-cols-2 gap-10'>
            <div className='grid gap-10'>
                <div>
                    <div>
                        <div className='flex gap-2 mb-2'>
                            <Select
                                value={query.condition}
                                defaultValue="and"
                                onChange={handleConditionChange}
                            >
                                <Option value="and">AND</Option>
                                <Option value="or">OR</Option>
                            </Select>
                            <Button className='btn' onClick={addRule}>Add Rule</Button>
                            <Button className='btn' onClick={addGroup}>Add Group</Button>
                        </div>
                        {
                            query.rules.length && <div className='grid gap-2 bg-gray-300/60 backdrop-blur-sm p-2 rounded'>
                                {renderQueryElements()}
                            </div>
                        }
                    </div>
                    <Button className='btn hover:text-white mt-3' onClick={() => console.log(query)}>Ok</Button>
                </div>

                {/* json viewer */}
                <div className='gap-10 px-4 mt-2 bg-[#f8f8f2] rounded fixed right-[0vw] z-50'>
                    <Editor
                        height="70vh"
                        defaultLanguage="json"
                        defaultValue={JSON.stringify(query, null, 2)}
                        value={JSON.stringify(query, null, 2)}
                        options={{
                            readOnly: true,
                            minimap: {
                                enabled: false
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default QueryBuilder;
