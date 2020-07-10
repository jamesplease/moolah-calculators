import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useCurrentRef } from 'core-hooks';
import constate from 'constate';

type ReverseAction = () => void;

function useUndo({ maxUndoCount = 50 } = {}) {
  const [reverseActions, setReverseActions] = useState<ReverseAction[]>([]);
  const reverseActionsRef = useCurrentRef(reverseActions);

  function hasUndos() {
    return (
      Array.isArray(reverseActionsRef.current) &&
      reverseActionsRef.current.length
    );
  }

  function undo() {
    if (!hasUndos()) {
      return;
    }

    const nextAction = _.first(reverseActionsRef.current);

    if (typeof nextAction === 'function') {
      nextAction();
    }

    setReverseActions(v => {
      return _.slice(v, 1);
    });
  }

  function addReverseAction(reverseAction: ReverseAction) {
    if (typeof reverseAction === 'function') {
      setReverseActions(v => {
        return [reverseAction, ...v].slice(0, maxUndoCount);
      });
    }
  }

  useEffect(() => {
    function handleUndoKey(e: KeyboardEvent) {
      if (e.metaKey && e.key === 'z') {
        undo();
      }
    }

    window.addEventListener('keydown', handleUndoKey, true);

    return () => window.removeEventListener('keydown', handleUndoKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    addReverseAction,
    undo,
    hasUndos,
  };
}

const [UndoProvider, useUndoContext] = constate(useUndo);

export default useUndoContext;
export { UndoProvider };
