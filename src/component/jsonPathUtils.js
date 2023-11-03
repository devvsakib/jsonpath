import jsonpath from 'jsonpath';

export const handlePath = (data, p, setAdvanceSearchPath, setJsonTreeValue) => {
    if (p) {
        const path = p.replace(/^\$/, '');
        setAdvanceSearchPath(`$${path}`);
        try {
            const result = jsonpath.query(data, p);
            setJsonTreeValue(result);
        } catch (error) {
            // Handle errors here if needed
        }
    }
};
