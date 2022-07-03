//DO NOT REMOVE
// A patch needed for ts ignoring the Could not find a declaration file for module 'stylis'. '/path/to/module-name.js' implicitly has an 'any' type
// solution found at https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam comment #580 (other solution did'nt work)
declare module 'stylis';