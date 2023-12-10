import React from 'react'
import "./style.css"

export default function ListDisplay({ rows, headers, rowIterator, rowLayout, ActionsComponents = (a, b) => { } }) {
  // row: { header: value }
  // headers: [header]
  // rowIterator: [list of keys for each row object]
  // actions: react functional component (buttons) of actions to take on each row
  const [rowIter, setRowIter] = React.useState(rowIterator || rows?.length > 0 && Object.keys(rows[0]) || []);

  return (
    <div className="flex-col flex-1   list-display self-stretch">
      <div className="text-md text-gray4 self-stretch"
        style={{
          display: "grid",
          gridTemplateColumns: rowLayout ? rowLayout : `repeat(${headers?.length}, 1fr) 56px`,
        }}
      >
        {headers?.length > 0 && headers.map((header, idx) => (
          <div className="grid-col" key={idx}>{header}</div>
        ))}
        <div className="grid-col">
        
        </div>
      </div>
      {rows?.length > 0 && rows.map((row, idx) => (
        <div className="text-md text-black self-stretch" key={idx}
          style={{
            display: "grid",
            gridTemplateColumns: rowLayout ? rowLayout : `repeat(${headers?.length}, 1fr) 56px`,
          }}
        >
          {rowIter?.length > 0 && rowIter.map((header, idx) => (
            <div className="grid-col" key={idx}>{row[header]}</div>
          ))}
          <div className="grid-col" key={headers[idx]}>
            {ActionsComponents(row, idx)}
          </div>
        </div>
      ))}
    </div>
  )
}
