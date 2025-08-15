const steps = [
  {
    id: '01',
    name: 'Registra tus Facturas',
    description: 'Ingresa fácilmente tus facturas de compra y venta. El sistema calculará automáticamente el IVA correspondiente.',
    image: '/placeholder-dashboard.png', // You can replace this with your actual screenshot
  },
  {
    id: '02',
    name: 'Organiza tus Gastos',
    description: 'Categoriza tus gastos deducibles y no deducibles. TributoCR te ayuda a mantener todo organizado.',
    image: '/placeholder-expenses.png', // You can replace this with your actual screenshot
  },
  {
    id: '03',
    name: 'Genera Reportes',
    description: 'Obtén reportes mensuales y anuales listos para presentar al Ministerio de Hacienda.',
    image: '/placeholder-reports.png', // You can replace this with your actual screenshot
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-white py-24 sm:py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Proceso Simple</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ¿Cómo Funciona TributoCR?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gestionar tus impuestos nunca fue tan fácil. Sigue estos simples pasos y mantén tu negocio al día.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          {steps.map((step, stepIdx) => (
            <div
              key={step.id}
              className={`flex flex-col gap-8 lg:flex-row ${
                stepIdx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } items-center my-16 first:mt-0 last:mb-0`}
            >
              {/* Text content */}
              <div className="flex-1">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-semibold">
                    {step.id}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                    {step.name}
                  </h3>
                </div>
                <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
                  {step.description}
                </p>
              </div>

              {/* Image/screenshot */}
              <div className="flex-1">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-50" />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 shadow-lg">
                    {/* Replace this div with your actual images */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Imagen de la aplicación
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 flex items-center justify-center gap-x-6">
          <a
            href="/download"
            className="rounded-md bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Empieza Ahora - Es Gratis
          </a>
          <a href="/features" className="text-lg font-semibold leading-6 text-gray-900">
            Ver más funciones <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
