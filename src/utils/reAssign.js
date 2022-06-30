/* eslint-disable no-param-reassign */

function reAssign(target, source, { tree }) {
  const sourceKeys = Object.keys(source);
  const modelKeys = Object.keys(tree);
  const exceptions = ['_id', 'id', '__v'];

  modelKeys.forEach((mKey) => {
    if (!sourceKeys.includes(mKey) && !exceptions.includes(mKey)) {
      target[mKey] = undefined;
    }
    if (sourceKeys.includes(mKey) && !exceptions.includes(mKey)) {
      target[mKey] = source[mKey];
    }
  });
  return target;
}

module.exports = reAssign;
