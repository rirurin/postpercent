import { writable } from 'svelte/store';
export const page = writable(0)
export const cat = writable("total")
export const dropdownActive = writable(false)