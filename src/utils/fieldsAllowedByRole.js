function fieldsAllowedByRole(userRole) {
  let unselectedFields = ''; // default select all fields

  if (userRole !== 'admin') {
    unselectedFields = '-amountToOrder -orderPoint -providers -stock';
  }
  return unselectedFields;
}

module.exports = fieldsAllowedByRole;
