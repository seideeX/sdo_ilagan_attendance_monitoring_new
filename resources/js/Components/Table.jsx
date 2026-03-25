import React from 'react';

const Table = ({ headers, children }) => {

    return (
        <div className="rounded shadow max-h-[600px] overflow-y-auto overflow-x-auto">
            <table className="min-w-full table-auto border text-sm text-center">
                <thead className="bg-gray-200 text-xs uppercase">
                    <tr>
                        {headers.map((header, idx) => (
                            <th key={idx} className="px-4 py-2 border font-semibold">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );

}

export default Table;