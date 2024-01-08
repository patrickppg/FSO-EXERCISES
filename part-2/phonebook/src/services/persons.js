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

function remove(person) {
  axios.delete(`http://localhost:3001/persons/${person.id}`)
}

function update(personFound, changedPerson) {
  return axios.put(`http://localhost:3001/persons/${personFound.id}`, changedPerson)
}

export default {create, get, remove, update}