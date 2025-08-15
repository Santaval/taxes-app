interface HeroProps {
  className?: string;
}

const Hero = ({ className = '' }: HeroProps) => {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`} id="hero-section">
      {/* Decorative elements */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-full">
          {/* Placeholder for app screenshot */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-l-3xl">
            <span className="text-gray-400">Imagen de la aplicación</span>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-200 rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-yellow-200 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-pink-200 rounded-full" />
        </div>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6">
                  <span className="block">Simplifica tus</span>
                  <span className="block text-blue-600">Impuestos y Contabilidad</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Gestiona el IVA y la contabilidad de tu negocio de manera fácil y eficiente. 
                  La solución perfecta para pequeñas empresas y profesionales independientes en Costa Rica.
                </p>
                <div className="mt-10 sm:mt-12">
                  <div className="sm:flex sm:flex-col sm:items-center lg:items-start space-y-4">
                    <div className="rounded-md shadow">
                      <a
                        href="/register-beta"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Acceso Beta Exclusivo
                        <svg
                          className="ml-2 -mr-1 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                      </svg>
                      <span>Beta cerrada - Cupos limitados</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      🎉 Los beta testers recibirán <span className="font-semibold text-blue-600">50% de descuento</span> en el módulo de facturación electrónica
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
