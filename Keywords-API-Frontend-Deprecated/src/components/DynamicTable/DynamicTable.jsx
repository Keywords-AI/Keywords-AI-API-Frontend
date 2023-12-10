import React, { useState } from 'react';
import './style.css';  // Make sure to create a CSS file
import { AddMessage, DeleteMessage } from 'src/assets/svgs';

function DynamicTable({ initialHeaders, initialData, tableName, setExternalData = () => { } }) {
    const [data, setData] = useState(initialData);
    const [editing, setEditing] = useState(null);

    const handleEdit = (id, field, value) => {
        setData(data.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
        ));
        setEditing(null);
    };

    const addRow = () => {
        const newRow = { id: Date.now(), ...generateEmptyRow() };
        setData([...data, newRow]);
    };

    const deleteRow = (id) => {
        setData(data.filter(row => row.id !== id));
    };

    React.useEffect(() => {
        if (data?.length > 0) {
            setExternalData({
                tableName: tableName,
                initialHeaders: initialHeaders,
                initialData: data,
                setExternalData: setExternalData
            });
        }
    }, [data]);

    const generateEmptyRow = () => {
        const emptyRow = {};
        initialHeaders.forEach(header => {
            emptyRow[header] = "";
        });
        return emptyRow;
    };

    return (
        <div className={'dynamic-table'}>
            <div className="flex-col items-start gap-sm self-stretch">
                <div className="display-xs">
                    {tableName}
                </div>
                <div className="flex-col items-start gap-sm self-stretch">
                    <div className="flex-col flex-1  "
                        style={{
                            border: "1px solid var(--gray3)",
                        }}
                    >
                        <div className="flex-row header-row"
                            style={{
                                flexGrow: "1",
                            }}
                        >
                            {initialHeaders?.map((header, index) => (
                                <div style={{
                                    display: "flex",
                                    flexGrow: "1",
                                    justifyContent: "left",
                                    borderRight: index === initialHeaders.length - 1 ? "none" : "1px solid var(--gray3)",
                                    borderBottom: data?.length === 0 ? "none" : "1px solid var(--gray3)",
                                }} className={'text-md t-medium table-cell'} key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</div>
                            ))}
                        </div>
                        {data?.map((row, rowIndex) => (
                            <div key={rowIndex}
                                className="flex-row data-row"
                                style={{
                                    position: "relative",
                                    borderBottom: rowIndex === data.length - 1 ? "none" : "1px solid var(--gray3)",
                                }}
                            >
                                {initialHeaders?.map((header, headerIndex) => (


                                    <input
                                        key={headerIndex}
                                        className='text-md'
                                        autoFocus
                                        type="text"
                                        style={{
                                            boxShadow: "none",
                                            width: "100px",
                                            outline: "none",
                                            border: "none",
                                            borderRight: headerIndex === initialHeaders?.length - 1 ? "none" : "1px solid var(--gray3)",
                                        }}
                                        defaultValue={row[header]}
                                        onBlur={(e) => handleEdit(row.id, header, e.target.value)}
                                    />

                                ))}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering cell editing
                                        deleteRow(row.id);
                                    }}
                                    style={{
                                        position: "absolute",
                                        left: "calc(100% + 12px)",
                                    }}

                                >
                                    <DeleteMessage />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='flex-row justify-center items-center gap-xs self-stretch button' onClick={addRow}>
                            <AddMessage />
                            <div className='text-md t-medium'>Add Row</div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default DynamicTable;
