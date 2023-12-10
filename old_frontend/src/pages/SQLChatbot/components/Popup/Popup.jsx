import React, { useEffect } from 'react'
import "./style.css"
import { CheckBox, AddMessage, Cancel } from 'src/assets/svgs'
import { updateUserSQLPrompt } from 'src/store/actions/userAction'
import { connect } from "react-redux";
import { loadingFileUpload } from 'src/store/actions/userAction'
import DynamicTable from 'src/components/DynamicTable/DynamicTable';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  loadingFileUpload,
  updateUserSQLPrompt
};

/*
tables: [
  {
    tableIndex: 0,
    tableName: "table1",
    initialHeaders: ["Name", "Type"],
    initialData: [
      {id: 1, Name: "data1", Type: "data2"},
    ]
  }
]
*/

function Popup({ closePopup, updateUserSQLPrompt, user, loadingFileUpload }) {
  const [tables, setTables] = React.useState([]);
  const tablesRef = React.useRef(null);

  const editTables = (newTable) => {
    const newTables = tablesRef.current?.map((table) => {
      if (table.tableName === newTable.tableName) {
        return newTable;
      } else {
        return table;
      }
    });
    setTables(newTables);
  }

  const createEmptyTable = (tableName) => {
    if (tables?.length && tables.find((table) => table.tableName === tableName)) {
      alert("Table name already exists");
      return;
    }
    const oldTables = tablesRef.current || [];
    console.log(oldTables);
    setTables([...oldTables, {
      tableIndex: tables.length,
      tableName: tableName,
      initialHeaders: ["Name", "Type"],
      initialData: [
      ],
      setExternalData: editTables
    }]);
  }

  React.useEffect(() => {
    console.log("tables", tables);
    tablesRef.current = tables;
  }, [tables]);

  const cardRef = React.useRef(null)
  const handleClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!cardRef.current?.contains(e.target)) {
      if (!lastClicked)
        closePopup();
      setLastClicked(false);
    }
  }
  const [sysPromptSubmit, setSysPromptSubmit] = React.useState({
    role: "system",
    content: "place_holder"
  })
  const [checked, setChecked] = React.useState(false);
  const textAreaRef = React.useRef(null);
  const [lastClicked, setLastClicked] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    loadingFileUpload();
    if (formRef.current) {
      const formData = new FormData();
      formData.append("sql_prompt_active", checked);
      formData.append("sql_schema", JSON.stringify(tables));
      formData.append("system_prompt", JSON.stringify(sysPromptSubmit));
      updateUserSQLPrompt(formData);
    }
    closePopup();
  }

  useEffect(() => {
    if (user) {
      const { sql_prompt_active, sql_schema, system_prompt } = user;
      setSysPromptSubmit(system_prompt);
      if (sql_schema && Object.keys(sql_schema).length > 0) {
        setTables(sql_schema);
      } else {
        setTables([]);
      }
      setChecked(sql_prompt_active);
      if (textAreaRef.current) {
        textAreaRef.current.value = system_prompt?.content;
      }
    }
  }, [user]);

  const formRef = React.useRef(null);
  const [creatingTable, setCreatingTable] = React.useState(false);
  const tableNameRef = React.useRef(null);

  return (
    <div className="backdrop"
      onMouseUp={handleClose}
    >
      <form
        ref={formRef}
      >
        <div className="modal-card bg-white"
          style={{
            width: "600px",
            maxHeight: "600px",
            overflowY: "auto",
          }}
          ref={cardRef}
          onMouseDown={() => { setLastClicked(true) }}
        >
          <div className="display-sm">
            Schema Prompt
          </div>
          <div className="flex-col justify-start items-start self-stretch gap-xxs">

            <div className="flex-row justify-start items-start gap-xxl self-stretch"
              style={{
                flexWrap: "wrap",
              }}
            >
              {tables?.length > 0 && tables.map((table, index) => (
                <div key={index}
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                    onClick={() => {
                      setTables(tables.filter((t) => t.tableName !== table.tableName));
                    }}
                  >
                    <Cancel />
                  </div>
                  <DynamicTable {...table} />
                </div>
              ))
              }

            </div>
            {!creatingTable && <div className="flex-row justify-start items-center gap-xs self-stretch"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setCreatingTable(true)}>
              <AddMessage />
              <div className="text-md text-gray4">
                {"Add a Table Schema Prompt"}
              </div>
            </div>}
            {creatingTable &&
              <div className="flex-col items-start gap-sm self-stretch">
                <div className="flex-row justify-start items-center gap-xs self-stretch">
                  <div className="text-md text-gray4" style={{ whiteSpace: "nowrap" }}>
                    {"Table Name"}
                  </div>
                  <input
                    ref={tableNameRef}
                    type="text"
                    className="text-input text-md"
                  />
                </div>
                <div className="flex-row justify-end items-center gap-xs ">
                  <button className="button-tertiary-primary"
                    onClick={() => { setCreatingTable(false) }}
                  >
                    {"Cancel"}
                  </button>
                  <button className="button-primary"
                    onClick={() => {
                      setCreatingTable(false);
                      if (tableNameRef.current?.value) {
                        createEmptyTable(
                          tableNameRef.current.value
                        );
                      } else {
                        alert("Please enter a table name");
                      }
                    }}
                  >
                    {"Add Table"}
                  </button>
                </div>
              </div>
            }
            <textarea
              ref={textAreaRef}
              onChange={(e) => {
                setSysPromptSubmit({
                  role: "system",
                  content: e.target.value
                });
              }}
              name="system_prompt" className="text-sm" id=""
            >
            </textarea>
          </div>
          <div className="flex-row self-stretch flex-1   space-between items-center">
            <div className="flex-row justify-center items-center gap-xs self-stretch">
              <CheckBox onChecked={(option) => {
                setChecked(option)
              }}
                checked={checked}
              />
              <div className="text-md">
                {"Enable for new chats"}
              </div>
            </div>
            <div className="flex-row justify-center items-center gap-xs self-stretch buttons-container">
              <button className="button-tertiary-white"
                onClick={() => { closePopup() }}
              >
                Cancel
              </button>
              <button className="button-primary"
                type="submit"
                onClick={handleSubmit}

              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form >
    </div >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);  