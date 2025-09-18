import React, { useEffect, useState } from "react";
import {
  getItemsFetch,
  createItemFetch,
  updateItemFetch,
  deleteItemFetch,
  getItemsAxios,
  createItemAxios,
  updateItemAxios,
  deleteItemAxios,
} from "./api";

export default function App() {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [newName, setNewName] = useState("");

  // Carregar itens com Fetch ao abrir
  useEffect(() => {
    getItemsFetch()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erro Fetch:", err));
  }, []);

  /* --------- Funções Fetch --------- */
  const addItemFetch = async () => {
    if (!newName) return;
    const newItem = { name: newName };
    try {
      const created = await createItemFetch(newItem);
      setItems((prev) => [...prev, created]);
      setNewName("");
    } catch (err) {
      console.error("Erro adicionar Fetch:", err);
    }
  };

  const updateItemFetchHandler = async (index) => {
    const item = items[index];
    try {
      const updated = await updateItemFetch(item.id, { name: editingName });
      const updatedItems = [...items];
      updatedItems[index] = updated;
      setItems(updatedItems);
      setEditingIndex(null);
      setEditingName("");
    } catch (err) {
      console.error("Erro atualizar Fetch:", err);
    }
  };

  const deleteItemFetchHandler = async (index) => {
    const item = items[index];
    try {
      await deleteItemFetch(item.id);
      setItems(items.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Erro deletar Fetch:", err);
    }
  };

  /* --------- Funções Axios --------- */
  const loadWithAxios = async () => {
    try {
      const data = await getItemsAxios();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro carregar Axios:", err);
    }
  };

  const addItemAxios = async () => {
    if (!newName) return;
    const newItem = { name: newName };
    try {
      const created = await createItemAxios(newItem);
      setItems((prev) => [...prev, created]);
      setNewName("");
    } catch (err) {
      console.error("Erro adicionar Axios:", err);
    }
  };

  const updateItemAxiosHandler = async (index) => {
    const item = items[index];
    try {
      const updated = await updateItemAxios(item.id, { name: editingName });
      const updatedItems = [...items];
      updatedItems[index] = updated;
      setItems(updatedItems);
      setEditingIndex(null);
      setEditingName("");
    } catch (err) {
      console.error("Erro atualizar Axios:", err);
    }
  };

  const deleteItemAxiosHandler = async (index) => {
    const item = items[index];
    try {
      await deleteItemAxios(item.id);
      setItems(items.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Erro deletar Axios:", err);
    }
  };

  /* --------- Funções de edição local --------- */
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingName(items[index].name);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Exemplo React + Beeceptor</h1>

      <input
        type="text"
        placeholder="Digite um nome"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <h2>Usando Fetch</h2>
      <button onClick={addItemFetch}>Adicionar (Fetch)</button>

      <h2>Usando Axios</h2>
      <button onClick={loadWithAxios}>Carregar (Axios)</button>
      <button onClick={addItemAxios}>Adicionar (Axios)</button>

      <h2>Lista de Itens</h2>
      <ul>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) =>
            editingIndex === index ? (
              <li key={item.id || index}>
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button onClick={() => updateItemFetchHandler(index)}>
                  Salvar (PUT - Fetch)
                </button>
                <button onClick={() => updateItemAxiosHandler(index)}>
                  Salvar (PUT - Axios)
                </button>
                <button onClick={cancelEdit}>Cancelar</button>
              </li>
            ) : (
              <li key={item.id || index}>
                {item.name}{" "}
                <button onClick={() => startEdit(index)}>Editar</button>
                <button onClick={() => deleteItemFetchHandler(index)}>
                  Deletar (DELETE - Fetch)
                </button>
                <button onClick={() => deleteItemAxiosHandler(index)}>
                  Deletar (DELETE - Axios)
                </button>
              </li>
            )
          )
        ) : (
          <li>Nenhum item disponível</li>
        )}
      </ul>
    </div>
  );
}
