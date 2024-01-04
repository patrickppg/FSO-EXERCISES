'use strict'

import axios from "axios"

const baseURL = "http://localhost:3001/persons"

function get() {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

function create(newObject) {
  const request = axios.post(baseURL, newObject)
  return request.then((response) => response.data)
}

function remove(id) {
  axios.delete(`http://localhost:3001/persons/${id}`)
}

function update(personFound, changedPerson) {
  const request = axios.put(`http://localhost:3001/persons/${personFound.id}`, changedPerson)
  return request.then(response => response.data) 
}

export default {create, get, remove, update}