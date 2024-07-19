const handleClick = (key, value, currentPath) => {
    let newPath;
    if (Array.isArray(json)) {
        newPath = `${currentPath}[${key}]`;
    } else {
        newPath = currentPath === '' ? key : `${currentPath}.${key}`;
    }

    if (expandedPaths.includes(newPath)) {
        setExpandedPaths(expandedPaths.filter(path => path !== newPath));
    } else {
        setExpandedPaths([...expandedPaths, newPath]);
    }

    onSelect({ path: newPath, value });
};

// working json tree:
const renderJSON = (data = {}, currentPath = '') => {
    return Object.entries(data).map(([key, value], indx) => {
        const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
        if (value && typeof value === 'object') {
            const matchedChildren = renderJSON(value, newPath);
            if (matchedChildren.length > 0) {
                return (
                    data.length > 0 && !seeMore && indx > 2 ? null :
                        <div key={newPath} className='cursor-pointer p-2'>
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
                                    {
                                        Array.isArray(data) ? `Item ${(indx + 1)}` : key
                                    }
                                    {
                                        console.log(data.length)
                                    }
                                </span>
                            </div>
                            <div style={{ marginLeft: '15px' }}>
                                {isExpanded(newPath) && renderJSON(value, newPath)}
                            </div>
                            {
                                data.length > 3 && !seeMore && indx === 2 ? <span onClick={() => setSeeMore(true)} className='text-gray-400 cursor-pointer'>...see more</span> :
                                    data.length > 3 && seeMore && indx === data.length - 1 ? <span onClick={() => setSeeMore(false)} className='text-gray-400 cursor-pointer'>...see less</span> : null
                            }
                        </div>
                );
            } else {
                return null;
            }
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
                        className='flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md'
                    >
                        <span>{key}</span>
                        <span className='text-gray-400' style={{ cursor: 'pointer' }}>
                            {displayValue}
                        </span>
                    </div>
                );
            } else {
                return null;
            }
        }
    });
};