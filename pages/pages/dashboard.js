import Layout from "@/layout/layout"
import { Carousel } from 'primereact/carousel';
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const informacion = [
      { nombre: "temporada1", description: "t1" },
      { nombre: "temporada2", description: "t2" },
      { nombre: "temporada3", description: "t3" },
      { nombre: "temporada4", description: "t4" },
    ]
    setDatos(informacion)
  }, [])

  const responsiveOptions = [
    { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 }
  ];

  const productTemplate = (datos) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          {/* <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2" /> */}
        </div>
        <div>
          <h4 className="mb-1">{datos.nombre}</h4>
          <h6 className="mt-0 mb-3">${datos.temporada}</h6>
          {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
          {/* <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div> */}
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Inicio"
      description="Pagina principal de jardin del eden"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Pagina principal</h5>
            <Carousel
              value={datos} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
              className="custom-carousel" circular autoplayInterval={3000} itemTemplate={productTemplate} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
