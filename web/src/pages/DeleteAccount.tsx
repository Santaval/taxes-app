import Layout from '../components/Layout';

const DeleteAccount = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col py-24 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Eliminar Cuenta
              </h1>
            </div>
            
            <div className="prose prose-blue mx-auto">
              <div className="text-gray-600">
                <p className="mb-4">
                  Para eliminar tu cuenta de TributoCR, por favor:
                </p>
                
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Envía un correo electrónico a <a href="mailto:contact@savaldev.com" className="text-blue-600 hover:text-blue-500">contact@savaldev.com</a></li>
                  <li>El correo debe ser enviado desde la dirección de email registrada en tu cuenta</li>
                  <li>Incluye en el asunto: "Solicitud de eliminación de cuenta"</li>
                </ol>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        El proceso de eliminación puede tomar hasta una semana en completarse.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mt-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Información Importante</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Una vez eliminada la cuenta, todos los datos serán borrados permanentemente</li>
                    <li>Este proceso no puede ser revertido</li>
                    <li>Las facturas emitidas se mantendrán en el sistema por requisitos legales</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeleteAccount;
