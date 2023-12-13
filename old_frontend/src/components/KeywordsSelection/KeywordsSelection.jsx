import React, { useEffect } from "react";
import "./style.css";
import { ExpandArrow } from "src/assets/svgs";

const MyComponent = React.forwardRef((props, ref) => {
  const {
    choices, // Choices, list of objects or strings, as long as you define the way to retrieve the text
    retrieveText, // Function to retrieve the text from the choice object
    handleSelected, // Function to handle the selected choice in the parent component
    placeholder, // This is the option to display. It is an actual option
    setDefault, // Whether to set the first option as default
    defaultOptionMark = " (default)", // The mark to display for the default option
    readOnly,
  } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(placeholder);
  const selectRef = React.useRef(null);
  const [empty, setEmpty] = React.useState(true);
  const options = choices?.filter(choice => retrieveText(choice) !== placeholder) || [{ text: "no options" }];
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setExpanded(false);
    }
  };


  useEffect(() => {
    if (options?.length > 0 && setDefault) {
      setSelected(retrieveText(options[0]));
      handleSelected(options[0]);
      setEmpty(false);
    } else {
      setSelected(placeholder);
      setEmpty(true);
    }
  }, [choices]);


  const handleChange = (choice) => {
    setSelected(retrieveText(choice));
    handleSelected(choice);
    setExpanded(false);
    setEmpty(false);
  };

  const handleDefaultChange = () => {
    setSelected(placeholder);
    handleSelected({});
    setExpanded(false);
    setEmpty(true);
  };

  return (
    <div
      className="flex-col self-stretch"
      style={{
        position: "relative",
      }}
      ref={selectRef}
    >
      <div className="flex-col"
        style={{
          position: "relative",
        }}
      >
        <input 
          type="text"
          onClick={() => {
            if (!readOnly) {
              setExpanded(!expanded)
            }
          }} className={`expandable-option text-sm ${expanded ? "expanded" : ""}` + " clamped-text " + (empty ? "text-gray4" : "")}
          value={selected}
          readOnly
        />
        {!readOnly && <div className="flex-col"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ExpandArrow />
        </div>}
      </div>

      {expanded &&
        <div className="expandable-wrapper">
          <div className="flex-col justify-start items-start self-stretch gap-xxs expanded-options bg-white">
            <li className="selection-item text-sm" key={-1}
              onClick={() => handleDefaultChange()}
            >{placeholder + defaultOptionMark}</li>
            {options.map((choice, index) => {
              return (
                <li className="selection-item text-sm" key={index}
                  onClick={() => handleChange(choice)}
                >{retrieveText(choice)}</li>
              )

            })}

          </div>
        </div>}
    </div>
  )
})

MyComponent.defaultProps = {
  retrieveText: choice => choice.text,
  handleSelected: selected => console.log(selected),
  placeholder: "Please select",
  setDefault: false,
};

const KeywordsSelection = React.memo(MyComponent);
export default KeywordsSelection;
