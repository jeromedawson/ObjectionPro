import { debounce } from 'lodash';

export const searchObjections = debounce((objections, searchTerm, callback) => {
  const filteredObjections = objections.filter((objection) =>
    objection.objectionType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  callback(filteredObjections);
}, 300);

export const searchScripts = debounce((scripts, searchTerm, callback) => {
  const filteredScripts = scripts.filter((script) =>
    script.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  callback(filteredScripts);
}, 300);
