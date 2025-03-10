import React from 'react';

// 1. Função Reducer
const initialState = { /* estado inicial */ }; // Define o estado inicial

function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE_1': // Tipo da ação 1
      return { ...state, /* novo estado */ }; // Atualiza o estado
    case 'ACTION_TYPE_2': // Tipo da ação 2
      return { ...state, /* novo estado */ }; // Atualiza o estado
    default:
      throw new Error('Unknown action'); // Trata ações desconhecidas
  }
}

// 2. Componente que usa o useReducer
function MyComponent() {
  // 3. useReducer: Retorna o estado atual e a função dispatch
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Exemplo de uso da função dispatch
  const handleAction1 = () => {
    dispatch({ type: 'ACTION_TYPE_1', payload: /* dados necessários */ });
  };

  const handleAction2 = () => {
    dispatch({ type: 'ACTION_TYPE_2', payload: /* dados necessários */ });
  };

  return (
    <div>
      {/* Renderização baseada no estado */}
      <p>Estado Atual: {JSON.stringify(state)}</p>

      {/* Botões para disparar ações */}
      <button onClick={handleAction1}>Disparar Ação 1</button>
      <button onClick={handleAction2}>Disparar Ação 2</button>
    </div>
  );
}

export default MyComponent;