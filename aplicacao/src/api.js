// src/api.js
import axios from "axios";

const API_URL = "https://atividade.free.beeceptor.com/items";

/* -------------------- FETCH -------------------- */

// GET
export const getItemsFetch = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// POST
export const createItemFetch = async (item) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return response.json();
};

// PUT
export const updateItemFetch = async (id, item) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return response.json();
};

// PATCH
export const patchItemFetch = async (id, item) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return response.json();
};

// DELETE
export const deleteItemFetch = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return response.ok;
};

/* -------------------- AXIOS -------------------- */

// GET
export const getItemsAxios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST
export const createItemAxios = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

// PUT
export const updateItemAxios = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

// PATCH
export const patchItemAxios = async (id, item) => {
  const response = await axios.patch(`${API_URL}/${id}`, item);
  return response.data;
};

// DELETE
export const deleteItemAxios = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.status === 200;
};
