import React, { useState, useEffect, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);
  const [tagToEdit, setTagToEdit] = useState();

  const GetAllTags = () => {
    getToken().then((token) =>
      fetch("/api/tag", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setTags)
    );
  };

  const GetTagById = (id) => {
    getToken().then((token) =>
      fetch(`/api/tag/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(setTagToEdit)
    );
  };

  const UpdateTag = (tag) => {
    getToken().then((token) => 
    fetch(`/api/tag/${tag.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Unauthorized");
    });
  }

  const DeleteTag = (id) => {
    getToken().then((token) =>
    fetch(`api/tag/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
  }

  return (
    <TagContext.Provider
      value={{ tags, tagToEdit, setTagToEdit, GetAllTags, GetTagById, UpdateTag, DeleteTag }}
    >
      {props.children}
    </TagContext.Provider>
  );
};