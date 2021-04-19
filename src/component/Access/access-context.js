import React from 'react';

const AccessContext = React.createContext()

const AccessProvider = ({store, children}) => {
  const hasAccess = (permission, project) => {
    const permissions = store.getState().user.get('permissions');
    

    const result = permissions.some(p => {
      if(p.permission === 'ADMIN') {
        return true
      }
      if(p.permission === permission && p.project === project) {
        return true;
      }
      return false;
    });

    console.log(permission, project, result);
    return result;
    
  };

  const context = { hasAccess };

  return <AccessContext.Provider value={context}>{children}</AccessContext.Provider>
}

export { AccessProvider };
export default AccessContext;
