const Pricing = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Precios</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gestiona tus impuestos sin costo
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            La contabilidad de tu negocio no debería ser un gasto extra. Por eso ofrecemos las funciones esenciales completamente gratis.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Plan Gratuito</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Accede a todas las funciones contables sin costo, respaldado por anuncios no intrusivos que nos permiten mantener el servicio gratuito.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">Incluye</h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              <li className="flex gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-5 flex-none text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cálculo de IVA
              </li>
              <li className="flex gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-5 flex-none text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reportes contables
              </li>
              <li className="flex gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-5 flex-none text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Control de gastos
              </li>
              <li className="flex gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-5 flex-none text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Respaldo en la nube
              </li>
              <li className="flex gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-5 flex-none text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Alertas y recordatorios
              </li>
              <li className="flex gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-5 flex-none text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Soporte comunitario
              </li>
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Facturación Electrónica</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">₡5.000</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/mes</span>
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Módulo adicional para facturación electrónica según requisitos de Hacienda
                </p>
                <a
                  href="/download"
                  className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Empezar Gratis
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Facturación disponible próximamente
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Information */}
        <div className="mx-auto mt-16 max-w-2xl text-center lg:max-w-none">
          <div className="rounded-2xl bg-blue-50 p-8">
            <div className="flex items-center justify-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <h4 className="text-lg font-semibold text-blue-900">Sobre los Anuncios</h4>
            </div>
            <p className="mt-4 text-sm text-blue-700">
              Mantenemos TributoCR gratis mostrando anuncios relevantes y no intrusivos. 
              Los anuncios son cuidadosamente seleccionados para no interferir con tu trabajo 
              y están relacionados con servicios empresariales que podrían interesarte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
