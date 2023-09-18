export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'Division' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Text], []),
    'Multiplicacion' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'Resta' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'Suma' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
