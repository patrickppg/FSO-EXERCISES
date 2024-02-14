'use strict'

import axios from "axios"

const baseURL = "/api/persons"

function get() {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

function create(newObject) {
  const request = axios.post(baseURL, newObject)
  return request.then((response) => response.data)
}

function remove(person) {
  axios.delete(`${baseURL}/${person.id}`)
}

function update(personFound, changedPerson) {
  return axios.put(`${baseURL}/${personFound.id}`, changedPerson)
}

export default {create, get, remove, update}