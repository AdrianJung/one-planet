import { treesRef, cansRef, planetRef } from "../database/firebase";
import oceanVectors from "../database/oceanVectors.json";
import { FETCH_TREES, FETCH_CANS, FETCH_PLANET } from "./types";

export const addTree = newTree => async dispatch => {
  treesRef.push().set(newTree);
  planetRef.once("value", snapshot => {
    // Currently adds 24h to planet_end
    planetRef.set(snapshot.val() + 1000 * 60 * 60 * 24);
  });
};

export const fetchTrees = () => async dispatch => {
  treesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TREES,
      payload: snapshot.val()
    });
  });
};

export const destroyCan = id => async dispatch => {
  cansRef.child(id).remove();
};

export const fetchCans = () => async dispatch => {
  cansRef.on("value", snapshot => {
    Object.keys(snapshot.val()).map(canId => {
      if (!snapshot.val()[canId].id) {
        const color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)})`;
        const pos =
          oceanVectors[Math.floor(Math.random() * oceanVectors.length)];
        cansRef.child(`${canId}`).set({ id: canId, pos: pos, color: color });
      }
    });
    dispatch({
      type: FETCH_CANS,
      payload: snapshot.val()
    });
  });
};

export const fetchPlanetEnd = () => async dispatch => {
  planetRef.on("value", snapshot => {
    dispatch({
      type: FETCH_PLANET,
      payload: snapshot.val()
    });
  });
};
