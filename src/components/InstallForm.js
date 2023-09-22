import { useReducer } from "react";

import classes from "./InstallForm.module.css";

const initialState = {
  lat: { value: "", touched: false },
  lng: { value: "", touched: false },

  editedLat: "",
  editedLng: "",
  latNaN: false,
  edit: false,
};

const reducer = (state, action) => {
  if (action.type === "EDIT_FORM") {
    return { ...state, edit: true };
  }

  if (action.type === "SAFE_FORM") {
    const { editedLat, editedLng } = action.payload;
    console.log(action.payload);
    return {
      ...state,
      edit: false,
      editedLat,
      editedLng,
    };
  }

  if (action.type === "INPUT_CHANGE") {
    const name = action.payload.name;
    const value = action.payload.value;

    return { ...state, [name]: { ...state[name], value: value } };
  }

  if (action.type === "IS_TOUCHED") {
    const name = action.payload;
    return { ...state, [name]: { ...state[name], touched: true } };
  }

  if (action.type === "ALL_IS_TOUCHED") {
    return {
      ...state,
      lat: { ...state.lat, touched: true },
      lng: { ...state.lng, touched: true },
    };
  }

  if (action.type === "NaN_VALUE") {
    return { ...state, latNaN: true };
  }

  if (action.type === "RESET_ALL_TOUCHED") {
    return {
      ...state,
      lat: { ...state.lat, touched: false },
      lng: { ...state.lng, touched: false },
      latNaN: false,
    };
  }

  return state;
};

const InstallForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { edit, lat, lng, editedLat, editedLng, latNaN } = state;

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    dispatch({
      type: "INPUT_CHANGE",
      payload: { name: inputName, value: inputValue },
    });
  };

  const onBlurHandler = (e) => {
    const inputName = e.target.name;

    dispatch({ type: "IS_TOUCHED", payload: inputName });
  };

  const latIsEmpty = lat.value === "";
  const invalidLat = (latIsEmpty && lat.touched) || latNaN;
  const latClasses = invalidLat ? `${classes.invalid}` : `${classes.input}`;

  const lngIsEmpty = lng.value === "";
  const invalidLng = lngIsEmpty && lng.touched;
  const lngClasses = invalidLng ? `${classes.invalid}` : `${classes.input}`;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({ type: "ALL_IS_TOUCHED" });

    const floatLat = +lat.value;
    const floatLng = +lng.value;

    if (isNaN(floatLat)) {
      dispatch({ type: "NaN_VALUE" });
      return;
    }

    if (latIsEmpty || lngIsEmpty) {
      return;
    }

    dispatch({
      type: "SAFE_FORM",
      payload: { editedLat: floatLat, editedLng: floatLng },
    });

    dispatch({ type: "RESET_ALL_TOUCHED" });
  };

  return (
    <div>
      {!edit && (
        <button
          onClick={() => {
            dispatch({ type: "EDIT_FORM" });
          }}
        >
          Edit
        </button>
      )}
      {!edit && (
        <div>
          <p>Lat: {editedLat}</p>
          <p>Lng: {editedLng}</p>
        </div>
      )}
      {edit && (
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label>Lat</label>
            <input
              className={latClasses}
              type="text"
              name="lat"
              value={lat.value}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>
          <div>
            <label>Lng</label>
            <input
              className={lngClasses}
              type="text"
              name="lng"
              value={lng.value}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default InstallForm;
