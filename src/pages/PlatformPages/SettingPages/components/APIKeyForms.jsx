import React, { useEffect } from "react";
import usePost from "src/hooks/usePost";
import { SelectInput, TextInput, CopyInput } from "src/components/Inputs";
import { retrieveContext, retrievePlanName } from "src/utilities/stringProcessing";
import { Button } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  setNewKeyName,
  setKeyList,
  addKey,
  deleteKey
} from "src/store/actions";

const mapStateToProps = (state) => ({
  user: state.user,
  apiKey: state.apiKey,
});

const mapDispatchToProps = {
  setNewKeyName
};

const CreateFormNotConnected = React.forwardRef(({
  newKey,
  setShowForm = () => { },
  setNewKeyName,
  addKey,
  user }, ref) => {
  const { loading, error, data, postData } = usePost(`api/create-key/`, "localhost:8000");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    if (!data.name) {
      data.name = "New Key";
    }
    setNewKeyName(data.name);
    postData(data);
  };
  useEffect(() => {
    if (data) {
      addKey(data);
    }
  }, [data])

  return (
    <form ref={ref}
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!newKey ? (
        <TextInput
          title={"Name (optional)"}
          width={"w-full"}
          onChange={(e) => {
            setNewKeyName(e.target.value);
          }}
          {...register("name")}
          // onKeyDown={handleEnter}
          placeholder={"Key-1"}
        />
      ) : (
        <CopyInput title={newKeyName} value={newKey?.api_key} />
      )}
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button variant="r4-gray-2" text="Cancel"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowForm(false);
            }} />
          {!newKey && (
            <Button variant="r4-primary" text="Create" />
          )}
        </div>
      </div>
    </form>
  );
});
export const CreateForm = connect(mapStateToProps, mapDispatchToProps)(CreateFormNotConnected);

// export const DeleteForm = React.forwardRef((props, ref) => {
//   const { postData, setKeyList, deleteList, keyList, setShowForm } = props;
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const form = event.target;
//     const keyName = form.keyName;
//     postData({
//       name: keyName.value || "New Key",
//     });
//   };
//   return (
//     <form
//       ref={ref}
//       method="POST"
//       onSubmit={handleSubmit}
//       className="modal-card bg-white"
//     >
//       <div className="flex-col items-start gap-sm self-stretch t-l">
//         <div className="display-xs">{"Revoke API Key"}</div>
//         <div className="text-md">
//           This API key will be immediately revoked and disabled. API requests
//           made made using this key will be rejected. Once revoked, you will no
//           longer be able to view or modify this API key.
//         </div>
//       </div>
//       <div className="flex-col start gap-xs self-stretch">
//         <div className="text-sm text-gray4">{keyList[0]?.name}</div>
//         <input
//           className="text-md"
//           style={{
//             color: "var(--black)",
//           }}
//           readOnly
//           value={keyList[0]?.prefix + "*".repeat(15)}
//           id="keyName"
//           name="keyName"
//           type="text"
//           placeholder="Key-1"
//         />
//       </div>
//       <div className="flex-row self-stretch justify-end">
//         <div className="flex-row gap-xs items-start">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setShowForm(false);
//               console.log("cancel");
//             }}
//             className="button-tertiary-white"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={"button-primary bg-error"}
//             onClick={(e) => {
//               e.preventDefault();
//               setKeyList(keyList.filter((key) => !deleteList.includes(key.id)));
//               postData({
//                 keys: deleteList,
//               });
//               setShowForm(false);
//             }}
//           >
//             Revoke Key
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// });

// export const EditForm = React.forwardRef((props, ref) => {
//   // updates the name of the key
//   const { setKeyList, keyList, setShowForm, editKey: key } = props;
//   const {
//     loading: editLoading,
//     error: editKeyError,
//     data: editKey,
//     postData,
//   } = usePost(`api/update-key/${key.id}/`, "PATCH");
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const form = event.target;
//     const keyName = form.keyName.value || "New Key";
//     console.log(key);
//     postData({
//       name: keyName,
//     });
//     setShowForm(false);
//     setKeyList((prevKeyList) =>
//       prevKeyList.map((prevKey) => {
//         if (prevKey.id === key.id) {
//           return { ...prevKey, name: keyName }; // return new object with updated keyName
//         } else {
//           return prevKey; // return the original object if no modification is needed
//         }
//       })
//     );
//   };
//   return (
//     <form
//       ref={ref}
//       method="POST"
//       onSubmit={handleSubmit}
//       className="modal-card bg-white"
//     >
//       <div className="display-xs">{"Rename API Key"}</div>
//       <div className="flex-col gap-xxs self-stretch">
//         <label className="text-sm text-gray4" htmlFor="keyName">
//           {"Name (optional)"}
//         </label>
//         <input
//           className="text-md"
//           style={{
//             color: "var(--black)",
//           }}
//           id="keyName"
//           name="keyName"
//           type="text"
//           placeholder="Key-1"
//         />
//       </div>

//       <div className="flex-row justify-end self-stretch">
//         <div className="flex-row gap-xs items-center">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setShowForm(false);
//             }}
//             className="button-tertiary-white"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="button-primary">
//             Rename
//           </button>
//         </div>
//       </div>
//       {editKeyError && (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div className="error">{editKeyError}</div>
//         </div>
//       )}
//     </form>
//   );
// });
