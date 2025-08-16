import { useState } from 'react';
import { useClients } from '@/contexts/ClientsContext';
import ClientSelect from '@/components/ui/ClientSelect';

const YourComponent = () => {
  const [isClientSelectVisible, setIsClientSelectVisible] = useState(false);
  const { clients } = useClients();

  return (
    <div>
      {/* Your other component code */}
      <button onClick={() => setIsClientSelectVisible(true)}>Select Client</button>
      <ClientSelect
        isVisible={isClientSelectVisible}
        onClose={() => setIsClientSelectVisible(false)}
        onSelect={(client) => {
          // Do something with the selected client
          console.log('Selected client:', client);
          setIsClientSelectVisible(false);
        }}
        clients={clients}
        title="Seleccionar Cliente" // Optional, defaults to "Seleccionar Cliente"
      />
    </div>
  );
};

export default YourComponent;