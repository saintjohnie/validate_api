function verifyRequired(rule) {
  const ruleKeys = Object.keys(rule);
  const requiredField = ["field", "condition", "condition_value"];
 
  let notFound = requiredField.filter((rf) => !ruleKeys.includes(rf));
notFound= notFound[0]
  
  return notFound
  ;
}

module.exports = verifyRequired;
