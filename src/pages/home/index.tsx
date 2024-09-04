export function Home() {
  return (
    <>
      <h1>BizEase Home</h1>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-md p-8">
          <h2 className="text-xl font-bold">Título</h2>
          <p>Description</p>
          <p>
            <span className="text-green-500 font-bold">5 %</span> a mais que
            semana passada
          </p>
        </div>
        <div className="border rounded-md p-8">
          <h2 className="text-xl font-bold">Título</h2>
          <p>Description</p>
          <p>
            <span className="text-red-500 font-bold">-5 %</span> menos que
            semana passada
          </p>
        </div>
        <div className="border rounded-md p-8">
          <h2 className="text-xl font-bold">Título</h2>
          <p>Description</p>
          <p>
            <span className="text-green-500 font-bold">5 %</span> a mais que mês
            passado
          </p>
        </div>
        <div className="border rounded-md p-8">
          <h2 className="text-xl font-bold">Título</h2>
          <p>Description</p>
          <p>
            <span className="text-red-500 font-bold">-5 %</span> menos que mês
            passado
          </p>
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-4 h-96">
        <div className="flex flex-col gap-4 border rounded-md p-8 w-full md:w-3/4 overflow-hidden">
          <h2 className="text-xl font-bold">Título</h2>
          <p>Gráfico</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptatibus voluptate ullam veniam omnis quibusdam totam alias
            cupiditate, magni amet autem reprehenderit laudantium quaerat labore
            quis deserunt nulla reiciendis fugit impedit itaque maxime quidem.
            Odit ducimus possimus nam, cum non facilis laudantium dolorum quod
            harum deserunt, atque ad explicabo vero aliquid? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Voluptatibus voluptate ullam
            veniam omnis quibusdam totam alias cupiditate, magni amet autem
            reprehenderit laudantium quaerat labore quis deserunt nulla
            reiciendis fugit impedit itaque maxime quidem. Odit ducimus possimus
            nam, cum non facilis laudantium dolorum quod harum deserunt, atque
            ad explicabo vero aliquid? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Voluptatibus voluptate ullam veniam omnis
            quibusdam totam alias cupiditate, magni amet autem reprehenderit
            laudantium quaerat labore quis deserunt nulla reiciendis fugit
            impedit itaque maxime quidem. Odit ducimus possimus nam, cum non
            facilis laudantium dolorum quod harum deserunt, atque ad explicabo
            vero aliquid?
          </p>
        </div>
        <div className="flex flex-col gap-4 border rounded-md p-8 w-full md:w-1/4 overflow-hidden">
          <h2 className="text-xl font-bold">Produtos mais vendidos</h2>
          <p>Gráfico</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptatibus voluptate ullam veniam omnis quibusdam totam alias
            cupiditate, magni amet autem reprehenderit laudantium quaerat labore
            quis deserunt nulla reiciendis fugit impedit itaque maxime quidem.
            Odit ducimus possimus nam, cum non facilis laudantium dolorum quod
            harum deserunt, atque ad explicabo vero aliquid?
          </p>
        </div>
      </section>
    </>
  );
}
