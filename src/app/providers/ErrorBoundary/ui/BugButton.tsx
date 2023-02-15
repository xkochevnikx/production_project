import { useEffect, useState } from 'react';
import { Button } from 'shared/UI/Button/ui/Button';

//! это учебный компонент для тестирования ErrorBoundary
export function BugButton() {
   const [error, setError] = useState(false);

   function toThrow() {
      setError(true);
   }

   useEffect(() => {
      if (error) {
         throw new Error();
      }
   }, [error]);
   return <Button onClick={toThrow}>throw error</Button>;
}
